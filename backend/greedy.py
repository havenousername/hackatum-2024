import math
from backend_api import get_vehicles_in_scenario, get_customers_in_scenario, update_scenario
from schemas import VehicleUpdate
import time

def calculate_distance(x1, y1, x2, y2):
    """
    Calculate Euclidean distance between two points.
    """
    return math.hypot(x1 - x2, y1 - y2)

def greedy_vehicle_assignment(scenario_id: str):
    """
    Continuously assign vehicles to customers using a greedy algorithm.
    After a vehicle completes its trip, it becomes available again.
    """
    while True:
        try:
            vehicles = get_vehicles_in_scenario(scenario_id)
            customers = get_customers_in_scenario(scenario_id)

            # Filter available vehicles and customers awaiting service
            available_vehicles = [v for v in vehicles if v.isAvailable]
            customers_needing_service = [c for c in customers if c.awaitingService]

            assignments = []  # To store vehicle-to-customer assignments

            # Loop until there are no available vehicles or customers needing service
            while available_vehicles and customers_needing_service:
                for vehicle in available_vehicles[:]:  # Use a copy of the list
                    # Find the nearest customer to this vehicle
                    nearest_customer = min(
                        customers_needing_service,
                        key=lambda customer: calculate_distance(
                            vehicle.coordX, vehicle.coordY, customer.coordX, customer.coordY
                        ),
                    )

                    # Assign the vehicle to the nearest customer
                    assignments.append(VehicleUpdate(id=vehicle.id, customerId=nearest_customer.id))

                    # Simulate vehicle movement to customer
                    print(f"Assigning Vehicle {vehicle.id} to Customer {nearest_customer.id}.")

                    # Remove assigned customer and vehicle from available lists
                    customers_needing_service.remove(nearest_customer)
                    available_vehicles.remove(vehicle)

                    # Update the scenario with the assignments
                    if assignments:
                        update_scenario(scenario_id, assignments)
                        print("Assignments successfully updated.")

        except Exception as e:
            print(f"Error in greedy assignment: {e}")

        # Sleep for a short time to allow vehicles to complete their trips
        time.sleep(1)