from schemas import *
from backend_api import *
import time


def monitor_scenario(scenario_id: str):
    """
    Continuously monitor vehicles and customers in the scenario.
    Fetch and display metadata such as vehicle and customer locations, turns, and speed.
    """
    while True:
        try:
            scenario = get_scenario(scenario_id)
            vehicles = scenario.vehicles
            customers = scenario.customers

            print("\n--- Scenario Monitor ---")
            print(f"Vehicles in Scenario (ID: {scenario_id}):")
            for vehicle in vehicles:
                print(f"  Vehicle ID: {vehicle.id}, Location: ({vehicle.coordX}, {vehicle.coordY}), "
                      f"Speed: {vehicle.vehicleSpeed}, Trips: {vehicle.numberOfTrips}, "
                      f"Available: {vehicle.isAvailable}, Distance Travelled: {vehicle.distanceTravelled}")

            print("\nCustomers in Scenario:")
            for customer in customers:
                print(f"  Customer ID: {customer.id}, Location: ({customer.coordX}, {customer.coordY}), "
                      f"Destination: ({customer.destinationX}, {customer.destinationY}), "
                      f"Awaiting Service: {customer.awaitingService}")

        except Exception as e:
            print(f"Error in monitoring scenario: {e}")

        # Sleep for a few seconds before fetching data again
        time.sleep(3)