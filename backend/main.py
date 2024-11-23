from greedy import greedy_vehicle_assignment
from backend_api import create_scenario, initialize_scenario, launch_scenario

# Step 1: Create a scenario with 2 vehicles and 2 customers
try:
    scenario = create_scenario(number_of_vehicles=2, number_of_customers=2)
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
    greedy_vehicle_assignment(scenario_id=str(scenario.id))
except Exception as e:
    print(f"Error running the greedy assignment: {e}")
    exit(1)