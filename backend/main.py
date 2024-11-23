from greedy import greedy_vehicle_assignment
from mip import mip_complete_route_assignment
from backend_api import create_scenario, initialize_scenario, launch_scenario, get_scenario
from monitoring import *
from simulation import Simulation


NUMBER_OF_VEHICLES = 2
NUMBER_OF_CUSTOMERS = 5


if __name__ == '__main__':
    # Step 1: Create a scenario with 2 vehicles and 2 customers
    try:
        scenario = create_scenario(number_of_vehicles=NUMBER_OF_VEHICLES, number_of_customers=NUMBER_OF_CUSTOMERS)
        print(f"Scenario created with ID: {scenario.id}")
    except Exception as e:
        print(f"Error creating scenario: {e}")
        exit(1)

    # Step 2: Initialize the scenario using the scenario ID
    try:
        response = initialize_scenario(payload=scenario, db_scenario_id=str(scenario.id))
        print("Scenario initialized.")
    except Exception as e:
        print(f"Error initializing scenario: {e}")
        exit(1)

    # Step 3: Launch the scenario with a specific speed
    try:
        launch_response = launch_scenario(scenario_id=str(scenario.id), speed=0.2)
        print("Scenario launched.")
    except Exception as e:
        print(f"Error launching scenario: {e}")
        exit(1)

    # Step 4: Use the greedy algorithm to assign vehicles to customers

    try:
        mapping = mip_complete_route_assignment(scenario_id=scenario.id)
    except Exception as e:
        print(f"Error running the threads: {e}")
        exit(1)
    scenario = get_scenario(scenario.id)
    customers = scenario.customers
    vehicles = scenario.vehicles

    simulation = Simulation(vehicles, customers, mapping)
    print(simulation.state(10000))
    for taxi in vehicles:
        print(simulation.taxi_finish_time(taxi))
