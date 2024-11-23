import math
from backend_api import get_vehicles_in_scenario, get_customers_in_scenario, update_scenario
from schemas import VehicleUpdate

def calculate_distance(x1, y1, x2, y2):
    """
    Calculate Euclidean distance between two points.
    """
    return math.hypot(x1 - x2, y1 - y2)

def greedy_vehicle_assignment(scenario_id):
    """
    Greedy algorithm to assign vehicles to their nearest customers needing a taxi.
    
    :param scenario_id: ID of the scenario to process.
    """
    # Fetch vehicles and customers from the scenario
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

            # Update the lists to reflect the assignment
            customers_needing_service.remove(nearest_customer)  # Customer is no longer awaiting service
            available_vehicles.remove(vehicle)  # Vehicle is no longer available

            # Break the loop if no more customers need service
            if not customers_needing_service:
                break

    # Update the scenario with the assignments
    if assignments:
        try:
            update_scenario(scenario_id, assignments)
            print("Assignments successfully updated.")
        except Exception as e:
            print("Error updating scenario:", e)
    else:
        print("No assignments needed or possible.")