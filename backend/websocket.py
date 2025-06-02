import asyncio
import websockets
import json
from jsondata_adapter import JsonDataAdapter
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import traceback
import logging
import os
from dotenv import load_dotenv

from main import create_scenario_with_api_call, calculate_mapping, Simulation

# === Logging Setup ===
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s:     %(message)s"
)
logger = logging.getLogger(__name__)

# === Load environment variables ===
load_dotenv(dotenv_path='.env')

PORT = int(os.getenv("PORT", 8888))
UPDATE_INTERVAL = float(os.getenv('UPDATE_INTERVAL', 5))
BASE_URL = os.getenv('BASE_URL')


class WebSimulationServer:
    def __init__(self):
        self.parameters = JsonDataAdapter('./parameters.json')
        self.simulation_step = 0
        self.simulations = []
        self.current_simulation = None
        self.pipeline = {
            'update_similation_step': self.update_simulation_step
        }
        self.simulation_speed = 1
        self.task_holder = None

    def create_scenario(self, number_of_vehicles=5, number_of_customers=10, simulation_speed=1):
        logger.debug("Creating simulation with %d vehicles and %d customers", number_of_vehicles, number_of_customers)
        scenario_id = create_scenario_with_api_call(number_of_vehicles, number_of_customers)
        vehicles, customers, mapping = calculate_mapping(scenario_id)

        simulation = Simulation(vehicles, customers, mapping)

        self.simulation_speed = simulation_speed
        self.simulations.append(simulation)
        self.current_simulation = simulation
        self.simulation_step = 0

        logger.debug("Simulation created: %s", simulation)

    def stop_scenario(self):
        logger.debug("Stopping simulation.")
        self.current_simulation = None
        self.simulation_step = 0
        if self.task_holder:
            self.task_holder.cancel()
            self.task_holder = None

    def update_simulation_step(self):
        self.simulation_step += self.simulation_speed
        return self.simulation_step

    def get_customers_position(self):
        return None if not self.current_simulation else self.current_simulation.customer_pos_to_des(self.simulation_step)

    def get_customer_route(self):
        return None if not self.current_simulation else self.current_simulation.remaining_current_waypoints_customers(self.simulation_step)

    def get_cars_route(self):
        return None if not self.current_simulation else self.current_simulation.remaining_current_waypoints_taxis(self.simulation_step)

    def get_cars_position(self):
        return None if not self.current_simulation else self.current_simulation.taxi_pos_to_des(self.simulation_step)

    def subscribe_to_customer_position(self):
        logger.debug("Subscribed to customer position.")
        self.pipeline['customerPosition'] = self.get_customers_position
        self.pipeline['customerRoute'] = self.get_customer_route

    def unsubscribe_from_customer_position(self):
        logger.debug("Unsubscribed from customer position.")
        self.pipeline.pop('customerPosition', None)
        self.pipeline.pop('customerRoute', None)

    def subscribe_to_cars_position(self):
        logger.debug("Subscribed to cars position.")
        self.pipeline['carsPosition'] = self.get_cars_position
        self.pipeline['carsRoute'] = self.get_cars_route

    def unsubscribe_from_cars_position(self):
        logger.debug("Unsubscribed from cars position.")
        self.pipeline.pop('carsPosition', None)
        self.pipeline.pop('carsRoute', None)

    def subscribe_initial_data(self):
        logger.debug("Subscribed to parameters.")
        self.pipeline['parameters'] = self.parameters.get_all

    def update_parameters(self, params):
        logger.debug("Updating parameters: %s", params)
        for key, value in params.items():
            self.parameters.set(key, value)

    async def periodic_update(self, websocket):
        try:
            logger.debug("🟢 Started periodic update loop.")
            while True:
                await asyncio.sleep(UPDATE_INTERVAL)
                results_dict = {key: func() for key, func in self.pipeline.items()}
                await websocket.send_text(json.dumps(results_dict))
        except WebSocketDisconnect:
            logger.warning("🔌 WebSocket disconnected in periodic_update.")
        except Exception as e:
            logger.error("‼️ Error in periodic_update: %s", str(e), exc_info=True)

    async def handle_message(self, websocket, message):
        try:
            json_message = json.loads(message)
            logger.debug("📨 Received message: %s", json_message)

            if json_message.get('scenario') == 'create':
                self.create_scenario(
                    number_of_vehicles=json_message.get('numberOfVehicles', 5),
                    number_of_customers=json_message.get('numberOfCustomers', 10),
                    simulation_speed=10
                )
                if self.task_holder is None:
                    self.task_holder = asyncio.create_task(self.periodic_update(websocket))
                    logger.debug("✅ Periodic update task started.")

            elif json_message.get('scenario') == 'stop':
                self.stop_scenario()

            elif json_message.get('subscribeTo') == 'customerPosition':
                self.subscribe_to_customer_position()

            elif json_message.get('subscribeTo') == 'carPosition':
                self.subscribe_to_cars_position()

            elif json_message.get('unsubscribeFrom') == 'customerPosition':
                self.unsubscribe_from_customer_position()

            elif json_message.get('unsubscribeFrom') == 'carPosition':
                self.unsubscribe_from_cars_position()

            elif json_message.get('subscribeTo') == 'parameters':
                self.subscribe_initial_data()

            elif json_message.get('update') == 'parameters':
                params = json_message.get('parameters', {})
                self.update_parameters(params)

        except Exception as e:
            logger.error("‼️ Error handling message: %s", str(e), exc_info=True)

    async def echo(self, websocket):
        try:
            while True:
                message = await websocket.receive_text()
                logger.debug("📥 Message received: %s", message)
                await self.handle_message(websocket, message)
                await websocket.send_text(f"Echo: {message}")
        except WebSocketDisconnect:
            logger.warning("🛑 Client disconnected.")
        except Exception as e:
            logger.error("‼️ Error in echo loop: %s", str(e), exc_info=True)
        finally:
            if self.task_holder:
                self.task_holder.cancel()
                logger.debug("🧹 Cancelled periodic task in cleanup.")


# === FastAPI app ===
app = FastAPI()
simulation_server = WebSimulationServer()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.debug("🔗 WebSocket connection accepted.")
    try:
        await simulation_server.echo(websocket)
    except websockets.ConnectionClosed:
        logger.warning("🔌 WebSocket closed unexpectedly.")
    finally:
        logger.debug("🧼 WebSocket cleanup complete.")
