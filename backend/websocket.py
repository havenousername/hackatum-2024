import asyncio
import asyncio
import websockets
from websockets.asyncio.server import serve
import json

from main import create_scenario_with_api_call, calculate_mapping, Simulation

PORT = 9876
UPDATE_INTERVAL = 0.1


class WebSimulationServer:
    def __init__(self):
        self.simulation_step = 0
        self.simulations = []
        self.current_simulation = None
        self.pipeline = {
            'update_similation_step': self.update_simulation_step
        }

    def create_scenario(self, number_of_vehicles=5, number_of_customers=10):
        scenario_id = create_scenario_with_api_call(number_of_vehicles, number_of_customers)
        vehicles, customers, mapping = calculate_mapping(scenario_id)
        simulation = Simulation(vehicles, customers, mapping)

        self.simulations.append(simulation)
        self.current_simulation = simulation

        print('simulation', simulation)
        self.simulation_step = 0

    def stop_scenario(self):
        self.current_simulation = None
        self.simulation_step = 0

    def update_simulation_step(self):
        self.simulation_step += 1
        return self.simulation_step

    def get_customers_position(self):
        if not self.current_simulation:
            return None
        return self.current_simulation.customer_pos_to_des(self.simulation_step)

    def get_cars_position(self):
        if not self.current_simulation:
            return None
        return self.current_simulation.taxi_pos_to_des(self.simulation_step)

    def subscribe_to_customer_position(self):
        self.pipeline['customerPosition'] = self.get_customers_position

    def unsubscribe_from_customer_position(self):
        self.pipeline.pop('customerPosition', None)

    def subscribe_to_cars_position(self):
        self.pipeline['carsPosition'] = self.get_cars_position

    def unsubscribe_from_cars_position(self):
        self.pipeline.pop('carsPosition', None)

    async def periodic_update(self, websocket):
        while True:
            await asyncio.sleep(UPDATE_INTERVAL)
            try:
                results_dict = {key: func() for key, func in self.pipeline.items()}
                print("Sending update:", results_dict)
                await websocket.send(json.dumps(results_dict))
            except websockets.ConnectionClosed:
                print("Connection closed.")
                break

    async def handle_message(self, websocket, message):
        try:
            json_message = json.loads(message)

            if json_message.get('scenario') == 'create':
                self.create_scenario(
                    number_of_vehicles=json_message.get('numberOfVehicles', 5),
                    number_of_customers=json_message.get('numberOfCustomers', 10)
                )
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

        except Exception as e:
            print(f"Error handling message: {e}")

    async def echo(self, websocket):
        asyncio.create_task(self.periodic_update(websocket))

        async for message in websocket:
            await self.handle_message(websocket, message)
            print(f"New message: {message}")
            await websocket.send(f"Echo: {message}")


async def main():
    server = WebSimulationServer()
    async with serve(server.echo, 'localhost', PORT):
        await asyncio.Future()


if __name__ == '__main__':
    asyncio.run(main())