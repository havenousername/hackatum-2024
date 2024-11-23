import requests
from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID
from schemas import *

BASE_URL = "http://localhost:8080"



######   GET METHODS   ######

# Get customer by ID
def get_customer(customer_id):
    url = f"{BASE_URL}/customers/{customer_id}"
    response = requests.get(url)
    if response.status_code == 200:
        return Customer.model_validate(response.json())  # Parse JSON into Customer model
    else:
        raise Exception(f"Error: {response.status_code}, {response.json()}")

# Get all customers in a scenario
def get_customers_in_scenario(scenario_id):
    url = f"{BASE_URL}/scenarios/{scenario_id}/customers"
    response = requests.get(url)
    if response.status_code == 200:
        return [Customer.model_validate(customer) for customer in response.json()]  # Parse into list of Customer models
    else:
        raise Exception(f"Error: {response.status_code}, {response.json()}")

# Get metadata for a scenario
def get_scenario_metadata(scenario_id):
    url = f"{BASE_URL}/scenario/{scenario_id}/metadata"
    response = requests.get(url)
    if response.status_code == 200:
        return ScenarioMetadataDTO.model_validate(response.json())  # Parse into ScenarioMetadataDTO model
    else:
        raise Exception(f"Error: {response.status_code}, {response.json()}")


# Get all scenarios
def get_all_scenarios():
    url = f"{BASE_URL}/scenarios"
    response = requests.get(url)
    if response.status_code == 200:
        return [ScenarioMetadataDTO.model_validate(scenario) for scenario in response.json()]  # Parse into list of ScenarioMetadataDTO models
    else:
        raise Exception(f"Error: {response.status_code}, {response.json()}")

# Get a scenario by ID
def get_scenarios(scenario_id):
    url = f"{BASE_URL}/scenarios/{scenario_id}"
    response = requests.get(url)
    if response.status_code == 200:
        return Scenario.model_validate(response.json())  # Parse into Scenario model
    else:
        raise Exception(f"Error: {response.status_code}, {response.json()}")

# Get all vehicles in a scenario
def get_vehicles_in_scenario(scenario_id):
    url = f"{BASE_URL}/scenarios/{scenario_id}/vehicles"
    response = requests.get(url)
    if response.status_code == 200:
        return [Vehicle.model_validate(vehicle) for vehicle in response.json()]  # Parse into list of Vehicle models
    else:
        raise Exception(f"Error: {response.status_code}, {response.json()}")

# Get a vehicle by ID
def get_vehicle(vehicle_id):
    url = f"{BASE_URL}/vehicles/{vehicle_id}"
    response = requests.get(url)
    if response.status_code == 200:
        return Vehicle.model_validate(response.json())  # Parse into Vehicle model
    else:
        raise Exception(f"Error: {response.status_code}, {response.json()}")


######   DELETE AND PUT METHODS   ######

# Example function to delete a scenario by ID
def delete_scenario(scenario_id):
    url = f"{BASE_URL}/scenarios/{scenario_id}"
    response = requests.delete(url)
    if response.status_code == 200:
        print("Scenario deleted:", response.json())
    else:
        print("Error:", response.json())


def create_scenario(number_of_vehicles: int, number_of_customers: int) -> Scenario:
    """
    Create a new random scenario with the specified number of vehicles and customers.

    :param number_of_vehicles: Number of vehicles in the scenario.
    :param number_of_customers: Number of customers in the scenario.
    :return: Parsed response as a Scenario object.
    """
    url = f"{BASE_URL}/scenario/create?numberOfVehicles={number_of_vehicles}&numberOfCustomers={number_of_customers}"
    response = requests.post(url)
    if response.status_code == 200:
        return Scenario.model_validate(response.json())  # Parse JSON into Scenario model
    else:
        raise Exception(f"Error {response.status_code}: {response.json()}")



#######################################################################################################################################################


#########################               SCENARIO_RUNNER          ######################################################################################


#######################################################################################################################################################



SCENARIO_URL = "http://localhost:8090"  # Your FastAPI server URL


def get_scenario(scenario_id: str) -> Scenario:
    """
    Get scenario by ID and parse into Scenario model.
    """
    url = f"{SCENARIO_URL}/Scenarios/get_scenario/{scenario_id}"  # Fixed endpoint
    response = requests.get(url)
    print(f"Response Status: {response.status_code}")  # Debugging
    print(f"Response Content: {response.text}")  # Debugging
    if response.status_code == 200:
        return Scenario.model_validate(response.json())  # Parse JSON into Scenario model
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")

# Function to initialize a new scenario
def initialize_scenario(payload: Scenario, db_scenario_id: Optional[str] = None):
    """
    Initialize a new scenario with the provided payload and optional database scenario ID.
    
    :param payload: Scenario object containing the initialization details.
    :param db_scenario_id: Optional ID of the scenario in the database.
    :return: Parsed response as a dictionary or raises an exception on error.
    """
    # Prepare query parameters if db_scenario_id is provided
    params = {"db_scenario_id": db_scenario_id} if db_scenario_id else {}
    
    # Convert the Scenario object to a dictionary for the JSON body
    payload_dict = payload.dict()
    
    # Send the POST request
    response = requests.post(f"{SCENARIO_URL}/Scenarios/initialize_scenario", json=payload_dict, params=params)
    
    if response.status_code == 200:
        return response.json()  # Return parsed JSON response on success
    else:
        raise Exception(f"Error: {response.status_code}, {response.json()}")  # Raise exception on error


def update_scenario(scenario_id: str, vehicles: List[VehicleUpdate]):
    """
    Update a scenario with the provided vehicle updates.
    
    :param scenario_id: ID of the scenario to update.
    :param vehicles: List of VehicleUpdate objects representing updated vehicle assignments.
    :return: Parsed response as a dictionary or raises an exception on error.
    """
    # Create the payload using the UpdateScenario model
    payload = UpdateScenario(vehicles=vehicles).dict()  # Convert to dictionary for the JSON body
    
    # Send the PUT request
    response = requests.put(f"{SCENARIO_URL}/Scenarios/update_scenario/{scenario_id}", json=payload)
    
    if response.status_code == 200:
        
        return response.json()  # Return parsed JSON response on success
    else:
        raise Exception(f"Error: {response.status_code}, {response.json()}")  # Raise exception on error

# Function to launch a scenario with a specific speed
def launch_scenario(scenario_id, speed=0.2):
    params = {"speed": speed}
    response = requests.post(f"{SCENARIO_URL}/Runner/launch_scenario/{scenario_id}", params=params)
    if response.status_code == 200:
        return response.json()  # Return JSON response on success
    else:
        return f"Error: {response.status_code}"

