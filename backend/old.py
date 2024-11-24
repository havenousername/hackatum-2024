from greedy import greedy_vehicle_assignment
from mip import mip_complete_route_assignment
from backend_api import create_scenario, initialize_scenario, launch_scenario
import threading
from monitoring import *
import time


NUMBER_OF_VEHICLES = 2

NUMBER_OF_CUSTOMERS = 5



    
if __name__ == '__main__':
    # Start the threads
    def start_scenario_threads(scenario_id: str):
        """
        Start threads for monitoring the scenario and assigning vehicles to customers.
        """
    #    monitor_thread = threading.Thread(target=monitor_scenario, args=(scenario_id,), daemon=True)
        #assignment_thread = threading.Thread(target=greedy_vehicle_assignment, args=(scenario_id,), daemon=True)
        assignment_thread = threading.Thread(target=mip_complete_route_assignment, args=(scenario_id,), daemon=True)

    #    monitor_thread.start()
        assignment_thread.start()

        # Keep the main thread alive
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\nStopping threads...")

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
        start_scenario_threads(scenario_id=str(scenario.id))
    except Exception as e:
        print(f"Error running the threads: {e}")
        exit(1)
    customers = get_scenario(scenario_id).customers
    vehicles 