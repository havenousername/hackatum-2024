import requests

BASE_URL = "http://localhost:8090"

# Example function to get customer by ID
def get_customer(customer_id):
    url = f"{BASE_URL}/customers/{customer_id}"
    response = requests.get(url)
    if response.status_code == 200:
        print("Customer data:", response.json())
    else:
        print("Error:", response.json())

# Example function to get all customers in a scenario
def get_customers_in_scenario(scenario_id):
    url = f"{BASE_URL}/scenarios/{scenario_id}/customers"
    response = requests.get(url)
    if response.status_code == 200:
        print("Customers in Scenario:", response.json())
    else:
        print("Error:", response.json())

# Example function to get metadata for a scenario
def get_scenario_metadata(scenario_id):
    url = f"{BASE_URL}/scenario/{scenario_id}/metadata"
    response = requests.get(url)
    if response.status_code == 200:
        print("Scenario Metadata:", response.json())
    else:
        print("Error:", response.json())

# Example function to create a scenario
def create_scenario(number_of_vehicles, number_of_customers):
    url = f"{BASE_URL}/scenario/create?numberOfVehicles={number_of_vehicles}&numberOfCustomers={number_of_customers}"
    response = requests.post(url)
    if response.status_code == 200:
        print("Scenario created:", response.json())
    else:
        print("Error:", response.json())

# Example function to get all scenarios
def get_all_scenarios():
    url = f"{BASE_URL}/scenarios"
    response = requests.get(url)
    if response.status_code == 200:
        print("All Scenarios:", response.json())
    else:
        print("Error:", response.json())

# Example function to delete a scenario by ID
def delete_scenario(scenario_id):
    url = f"{BASE_URL}/scenarios/{scenario_id}"
    response = requests.delete(url)
    if response.status_code == 200:
        print("Scenario deleted:", response.json())
    else:
        print("Error:", response.json())

# Example function to get a scenario by ID
def get_scenario(scenario_id):
    url = f"{BASE_URL}/scenarios/{scenario_id}"
    response = requests.get(url)
    if response.status_code == 200:
        print("Scenario data:", response.json())
    else:
        print("Error:", response.json())

# Example function to get all vehicles in a scenario
def get_vehicles_in_scenario(scenario_id):
    url = f"{BASE_URL}/scenarios/{scenario_id}/vehicles"
    response = requests.get(url)
    if response.status_code == 200:
        print("Vehicles in Scenario:", response.json())
    else:
        print("Error:", response.json())

# Example function to get a vehicle by ID
def get_vehicle(vehicle_id):
    url = f"{BASE_URL}/vehicles/{vehicle_id}"
    response = requests.get(url)
    if response.status_code == 200:
        print("Vehicle data:", response.json())
    else:
        print("Error:", response.json())

# Example usage
if __name__ == "__main__":
    # Replace with actual IDs for testing
    customer_id = "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    scenario_id = "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    vehicle_id = "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    
    # Get customer data
    get_customer(customer_id)
    
    # Get all customers in a scenario
    get_customers_in_scenario(scenario_id)
    
    # Get scenario metadata
    get_scenario_metadata(scenario_id)
    
    # Create a new scenario
    create_scenario(5, 10)  # Create a scenario with 5 vehicles and 10 customers
    
    # Get all scenarios
    get_all_scenarios()
    
    # Delete a scenario
    delete_scenario(scenario_id)
    
    # Get a specific scenario
    get_scenario(scenario_id)
    
    # Get all vehicles in a scenario
    get_vehicles_in_scenario(scenario_id)
    
    # Get vehicle data
    get_vehicle(vehicle_id)
