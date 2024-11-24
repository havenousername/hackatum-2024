from simulation import Simulation
from greedy import greedy_vehicle_assignment
from mip import mip_complete_route_assignment
from backend_api import create_scenario, initialize_scenario, launch_scenario, get_scenario
from monitoring import *


NUMBER_OF_VEHICLES = 5
NUMBER_OF_CUSTOMERS = 20


def create_scenario_with_api_call(num_vehicles, num_customers):
    try:
        scenario = create_scenario(number_of_vehicles=num_vehicles, number_of_customers=num_customers)
        print(f"Scenario created with ID: {scenario.id}")
        ret_id = scenario.id
        initialize_scenario(payload=scenario, db_scenario_id=str(scenario.id))
    except Exception as e:
        print(f"Error creating scenario: {e}")
        exit(1)
    return ret_id

def calculate_mapping(scenario_id):
    try:
        mapping = mip_complete_route_assignment(scenario_id=scenario_id)
    except Exception as e:
        print(f"Error running the threads: {e}")
        exit(1)
    scenario = get_scenario(scenario_id)
    customers = scenario.customers
    vehicles = scenario.vehicles
    return vehicles, customers, mapping


if __name__ == '__main__':
    scenario_id = create_scenario_with_api_call(NUMBER_OF_VEHICLES, NUMBER_OF_CUSTOMERS)
    vehicles, customers, mapping = calculate_mapping(scenario_id)

    simulation = Simulation(vehicles, customers, mapping)
    print(simulation.state(4500))
    print(simulation.state(5000))
    print(simulation.state(5500))
    print(simulation.state(6000))
    for taxi in vehicles:
        print(simulation._taxi_finish_time(taxi))
    print(f'Average wait time: {simulation.average_wait_time()}')
    print(f'Average trip duration: {simulation.average_trip_duration()}')
    print(f'Average total customer time: {simulation.average_total_customer_time()}')
    t = 300
    print(f'Graph data until {t}: {simulation.taxi_distance_traveled_graph_data_until_t(vehicles[0], t)}')
    print(f'Remaining waypoints at {t} for some taxi: {simulation.remaining_current_waypoints_taxi(vehicles[0], t)}')
    # print(f'Remaining waypoints at {t} for some taxi: {simulation.remaining_current_waypoints_taxis(t)}')
