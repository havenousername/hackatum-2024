import requests

BASE_URL = "http://localhost:8090"  # Your FastAPI server URL

# Function to get a scenario by its ID
def get_scenario(scenario_id):
    response = requests.get(f"{BASE_URL}/Scenarios/get_scenario/{scenario_id}")
    if response.status_code == 200:
        return response.json()  # Return JSON response on success
    else:
        return f"Error: {response.status_code}"

# Function to initialize a new scenario
def initialize_scenario(payload, db_scenario_id=None):
    params = {"db_scenario_id": db_scenario_id} if db_scenario_id else {}
    response = requests.post(f"{BASE_URL}/Scenarios/initialize_scenario", json=payload, params=params)
    if response.status_code == 200:
        return response.json()  # Return JSON response on success
    else:
        return f"Error: {response.status_code}"

# Function to update a scenario
def update_scenario(scenario_id, payload):
    response = requests.put(f"{BASE_URL}/Scenarios/update_scenario/{scenario_id}", json=payload)
    if response.status_code == 200:
        return response.json()  # Return JSON response on success
    else:
        return f"Error: {response.status_code}"

# Function to launch a scenario with a specific speed
def launch_scenario(scenario_id, speed=0.2):
    params = {"speed": speed}
    response = requests.post(f"{BASE_URL}/Runner/launch_scenario/{scenario_id}", params=params)
    if response.status_code == 200:
        return response.json()  # Return JSON response on success
    else:
        return f"Error: {response.status_code}"

# Example Usage
if __name__ == "__main__":
    # 1. Fetch scenario
    scenario_id = "123e4567-e89b-12d3-a456-426614174000"  # Example scenario ID
    print("Fetching Scenario...")
    scenario = get_scenario(scenario_id)
    print(scenario)

    # 2. Initialize new scenario
    new_scenario_payload = {
        "id": "123e4567-e89b-12d3-a456-426614174001",
        "startTime": "2024-11-23T14:30:00",
        "endTime": "2024-11-23T16:30:00",
        "status": "active",
        "vehicles": [
            {
                "id": "vehicle1",
                "coordX": 10,
                "coordY": 20,
                "isAvailable": True,
                "vehicleSpeed": 50,
                "customerId": "customer1",
                "remainingTravelTime": 100,
                "distanceTravelled": 0,
                "activeTime": 0,
                "numberOfTrips": 0
            }
        ],
        "customers": [
            {
                "id": "customer1",
                "coordX": 5,
                "coordY": 15,
                "destinationX": 15,
                "destinationY": 25,
                "awaitingService": True
            }
        ]
    }
    print("Initializing Scenario...")
    result = initialize_scenario(new_scenario_payload)
    print(result)

    # 3. Update scenario with vehicle assignments
    update_payload = {
        "vehicles": [
            {
                "id": "vehicle1",
                "customerId": "customer1"
            }
        ]
    }
    print("Updating Scenario...")
    update_result = update_scenario(scenario_id, update_payload)
    print(update_result)

    # 4. Launch the scenario
    print("Launching Scenario...")
    launch_result = launch_scenario(scenario_id, speed=0.5)  # Setting execution speed to 0.5 (faster execution)
    print(launch_result)
