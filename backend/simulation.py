import json

from routing import Route


class Simulation():

    def __init__(self, taxis, customers, taxi_mapping) -> None:
        # Taxi mapping is of form:
        # {
        #     'taxi_id': [customer_id_0, ..., customer_id_n]
        # }
        self.taxis = taxis
        self.customers = customers
        self.taxi_mapping = taxi_mapping
        self.customer_routes = self._precalculate_customer_routes()
        self.taxi_routes = self._precalculate_taxi_routes()

    def _precalculate_taxi_routes(self):
        # ? Is the following implemented correctly: Include customer routes here!
        taxi_routes = dict()
        for taxi in self.taxis:
            t = 0
            origin = (taxi.coordX, taxi.coordY)
            this_taxi_routes = dict()
            for customer_id in self.taxi_mapping[taxi.id]:
                customer_route = self.customer_routes[customer_id]
                destination = customer_route.origin
                inter_route = Route(origin, destination)
                this_taxi_routes[t] = inter_route
                t += inter_route.duration
                this_taxi_routes[t] = customer_route
                t += customer_route.duration
                origin = customer_route.destination
            taxi_routes[taxi.id] = this_taxi_routes
        return taxi_routes

    def _precalculate_customer_routes(self):
        customer_routes = dict()
        for customer in self.customers:
            customer_routes[customer.id] = Route((customer.coordX, customer.coordY),
                (customer.destinationX, customer.destinationY))
        return customer_routes

    def indexed_taxi_route(self, taxi, t):
        this_taxi_routes = self.taxi_routes[taxi.id]
        if this_taxi_routes == None or len(this_taxi_routes) == 0:
            return
        correct_route = None
        correct_t = 0
        for i, (start_time, route) in enumerate(this_taxi_routes.items()):
            if start_time > t:
                break
            correct_route = route
            correct_t = start_time
        elapsed = t - correct_t
        return i, correct_route, elapsed

    def taxi_route(self, taxi, t):
        _, correct_route, elapsed = self.indexed_taxi_route(taxi, t)
        return correct_route, elapsed

    def indexed_taxi_of_customer(self, customer):
        for taxi_id, customer_list in self.taxi_mapping.items():
            for i, customer_id in enumerate(customer_list):
                if customer.id == customer_id:
                    return i, taxi_id

    def customer_departure(self, customer):
        i, taxi_id = self.indexed_taxi_of_customer(customer)
        this_taxi_routes = self.taxi_routes[taxi_id]
        i = 2 * i + 1
        for departure in sorted(this_taxi_routes.keys()):
            if i <= 0:
                return departure
            i -= 1
        return 0

    def customer_waiting(self, customer, t):
        return t < self.customer_departure(customer)

    def customer_pos_to_des(self, t):
        ret_dict = dict()
        for customer in self.customers:
            if not self.customer_waiting(customer, t):
                continue
            ret_dict[customer.id] = {
                'position': self.customer_routes[customer.id].origin,
                'destination': self.customer_routes[customer.id].destination,
            }
        return ret_dict

    def indexed_last_taxi_route(self, taxi):
        this_taxi_routes = self.taxi_routes[taxi.id]
        max_key = max(this_taxi_routes.keys())
        return max_key, this_taxi_routes[max_key]

    def last_taxi_route(self, taxi):
        _, route = self.indexed_last_taxi_route(taxi)
        return route

    def taxi_pos_to_des(self, t):
        ret_dict = dict()
        for taxi in self.taxis:
            if self.taxi_finished(taxi, t):
                ret_dict[taxi.id] = {
                    'position': self.last_taxi_route(taxi).destination,
                    'available': True
                }
                continue
            route, elapsed = self.taxi_route(taxi, t)
            ret_dict[taxi.id] = {
                'position': route.position(elapsed),
                'destination': route.destination,
                'available': False
            }
        return ret_dict

    def used_taxis(self, t):
        used = []
        for taxi in self.taxis:
            i, _, _ = self.indexed_taxi_route(taxi, t)
            if i % 2 == 1:
                used.append(taxi.id)
        return used

    def taxi_finish_time(self, taxi):
        t, route = self.last_taxi_route(taxi)
        return t + route.duration

    def taxi_finished(self, taxi, t):
        return t >= self.taxi_finish_time(taxi)

    def state(self, t):
        # This method should return the current position of every taxi and
        # customer (and additional info maybe later on). As a JSON!

        # A customer will be in this return dictionary as long as they are not
        # yet in a taxi. As soon as they have entered a taxi, the taxi will be
        # marked as used and the customer will be "deleted"
        ret_dict = {
            'customer_pos_to_des': self.customer_pos_to_des(t),
            'taxi_pos_to_des': self.taxi_pos_to_des(t),
            'used_taxis': self.used_taxis(t),
        }
        return json.dumps(ret_dict)


if __name__ == '__main__':
    # This is probably not working.
    # TODO: Testing
    pass
