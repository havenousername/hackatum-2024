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

    def _indexed_taxi_route(self, taxi, t):
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
        return i-1, correct_route, elapsed

    def _taxi_route(self, taxi, t):
        _, correct_route, elapsed = self._indexed_taxi_route(taxi, t)
        return correct_route, elapsed

    def _indexed_taxi_of_customer(self, customer):
        for taxi_id, customer_list in self.taxi_mapping.items():
            for i, customer_id in enumerate(customer_list):
                if customer.id == customer_id:
                    return i, taxi_id

    def _customer_departure(self, customer):
        i, taxi_id = self._indexed_taxi_of_customer(customer)
        this_taxi_routes = self.taxi_routes[taxi_id]
        i = 2 * i + 1
        for departure in sorted(this_taxi_routes.keys()):
            if i <= 0:
                return departure
            i -= 1
        return 0

    def _customer_waiting(self, customer, t):
        return t < self._customer_departure(customer)

    def customer_pos_to_des(self, t):
        ret_list = []
        for customer in self.customers:
            if not self._customer_waiting(customer, t):
                continue
            ret_list.append({
                'id': customer.id,
                'position': self.customer_routes[customer.id].origin,
                'destination': self.customer_routes[customer.id].destination,
                'type': 'CUSTOMER_WAITING',
            })
        return ret_list

    def _indexed_last_taxi_route(self, taxi):
        this_taxi_routes = self.taxi_routes[taxi.id]
        max_key = max(this_taxi_routes.keys())
        return max_key, this_taxi_routes[max_key]

    def _last_taxi_route(self, taxi):
        _, route = self._indexed_last_taxi_route(taxi)
        return route

    def taxi_pos_to_des(self, t):
        ret_list = []
        for taxi in self.taxis:
            if self._taxi_finished(taxi, t):
                ret_list.append({
                    'id': taxi.id,
                    'position': self._last_taxi_route(taxi).destination,
                    'destination': (0,0),
                    'type': 'TAXI_WAITING',
                })
                continue
            route, elapsed = self._taxi_route(taxi, t)
            ret_list.append({
                'id': taxi.id,
                'position': route.position(elapsed),
                'destination': route.destination,
                'type': 'TAXI_DRIVING_WITH_CUSTOMER' if self._taxi_in_use(taxi, t)
                    else 'TAXI_DRIVING_ALONE',
            })
        return ret_list

    def _taxi_in_use(self, taxi, t):
        current_route, _ = self._taxi_route(taxi, t)
        return current_route in self.customer_routes.values()

    def _used_taxis(self, t):
        used = []
        for taxi in self.taxis:
            if self._taxi_in_use(taxi, t):
                used.append(taxi.id)
        return used

    def _taxi_finish_time(self, taxi):
        t, route = self._indexed_last_taxi_route(taxi)
        return t + route.duration

    def _taxi_finished(self, taxi, t):
        return t >= self._taxi_finish_time(taxi)

    def average_wait_time(self):
        wait_time = 0
        for customer in self.customers:
            wait_time += self._customer_departure(customer)
        avg_wait_time = wait_time / len(self.customers)
        return avg_wait_time

    def average_trip_duration(self):
        trip_duration = 0
        for customer_route in self.customer_routes.values():
            trip_duration += customer_route.duration
        avg_trip_duration = trip_duration / len(self.customers)
        return avg_trip_duration

    def average_total_customer_time(self):
        return self.average_trip_duration() + self.average_wait_time()

    def taxi_distance_traveled_until_t(self, taxi, t):
        i, current_route, elapsed = self._indexed_taxi_route(taxi, t)
        distance = current_route.distance_traveled(elapsed)
        for route in [v for _, v in sorted(self.taxi_routes[taxi.id].items())][:i]:
            distance += route.distance
        return distance

    def taxi_distance_traveled_graph_data_until_t(self, taxi, t):
        ret_list = []
        for t_step in range(max(0, t-1800), t):
            ret_list.append(int(self.taxi_distance_traveled_until_t(taxi, t_step)))
        return ret_list

    def state(self, t):
        # This method should return the current position of every taxi and
        # customer (and additional info maybe later on). As a JSON!

        # A customer will be in this return dictionary as long as they are not
        # yet in a taxi. As soon as they have entered a taxi, the taxi will be
        # marked as used and the customer will be "deleted"
        ret_list = self.customer_pos_to_des(t) + self.taxi_pos_to_des(t)
        return json.dumps(ret_list)


if __name__ == '__main__':
    # This is probably not working.
    # TODO: Testing
    pass
