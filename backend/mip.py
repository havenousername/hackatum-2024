from pulp import LpProblem, LpVariable, lpSum, LpMinimize, PULP_CBC_CMD
from backend_api import get_scenario
import math
from jsondata_adapter import JsonDataAdapter
from cost_functions import Weights, weighted_cost_function

def mip_complete_route_assignment(scenario_id: str, weights=None,
        constant_fee=None, fee_per_km=None, fee_per_min=None):
    if weights == None:
        adapter = JsonDataAdapter('parameters.json')
        weights = adapter.get('weights')
        weights = Weights(weights['distance'], weights['duration'],
                weights['revenue'], weights['energyConsumption'])
        financial_constraints = adapter.get('financialConstraints')
        constant_fee = financial_constraints['startPrice']
        fee_per_km = financial_constraints['pricePerKm']
        fee_per_min = financial_constraints['pricePerMin']
    try:
        # Fetch scenario data
        scenario = get_scenario(scenario_id)
        vehicles = scenario.vehicles
        customers = scenario.customers

        available_vehicles = [v for v in vehicles if v.isAvailable]
        customers_needing_service = [c for c in customers if c.awaitingService]

        if not available_vehicles or not customers_needing_service:
            print("No available vehicles or customers needing service.")
            return

        prob = LpProblem("Taxi_Route_Assignment", LpMinimize)

        # Decision variables
        x = {
            (v.id, c.id): LpVariable(f"x_{v.id}_{c.id}", cat="Binary")
            for v in available_vehicles
            for c in customers_needing_service
        }
        y = {
            (v.id, c1.id, c2.id): LpVariable(f"y_{v.id}_{c1.id}_{c2.id}", cat="Binary")
            for v in available_vehicles
            for c1 in customers_needing_service
            for c2 in customers_needing_service
            if c1.id != c2.id
        }

        # Cost matrix
        cost = {
#            (v.id, c.id): cost_function(v.coordX, v.coordY, c.destinationX, c.destinationY)
            (v.id, c.id): weighted_cost_function((v.coordX,v.coordY), (c.coordX,c.coordY),
                    (c.destinationX,c.destinationY), weights, constant_fee,
                    fee_per_km, fee_per_min)
            for v in available_vehicles
            for c in customers_needing_service
        }

        # Objective function
        prob += lpSum(x[v.id, c.id] * cost[v.id, c.id] for v in available_vehicles for c in customers_needing_service)

        # Constraints
        for c in customers_needing_service:
            prob += lpSum(x[v.id, c.id] for v in available_vehicles) == 1  # Each customer served by 1 vehicle

        for v in available_vehicles:
            prob += lpSum(x[v.id, c.id] for c in customers_needing_service) >= 1  # Vehicles serve at least 1 customer

        # Routing constraints
        for v in available_vehicles:
            for c1 in customers_needing_service:
                prob += (
                    lpSum(y[v.id, c1.id, c2.id] for c2 in customers_needing_service if c1.id != c2.id)
                    <= x[v.id, c1.id]
                )
                prob += (
                    lpSum(y[v.id, c2.id, c1.id] for c2 in customers_needing_service if c1.id != c2.id)
                    <= x[v.id, c1.id]
                )

        # Solve the problem
        solver = PULP_CBC_CMD(msg=True)
        prob.solve(solver)

        if prob.status != 1:
            print("No optimal solution found.")
            return

        assignments = dict()
        for v in available_vehicles:
            assignments[v.id] = []
            for c in customers_needing_service:
                
                if x[v.id, c.id].varValue == 1:
                    print(f"Assigning Vehicle {v.id} to Customer {c.id}.")
                    assignments[v.id].append(c.id)
                    v.coordX, v.coordY = c.destinationX, c.destinationY
            
        return assignments

    except Exception as e:
        print(f"Error in MIP assignment: {e}")
