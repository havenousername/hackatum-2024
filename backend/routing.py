import requests
from cost_functions import L2_distance
import math
import os
from dotenv import load_dotenv
import logging

load_dotenv(dotenv_path='.env')
ORS_URL = os.getenv('ORS_URL')

logging.basicConfig(
    level=logging.INFO,  # Use DEBUG for more detail
    format="%(levelname)s:     %(message)s"
)

logger = logging.getLogger(__name__)


class Route:

    def __init__(self, origin, destination, do_preprocessing=True) -> None:
        lat0, lon0 = origin
        lat1, lon1 = destination
        self.origin = origin
        self.destination = destination
        url = f'{ORS_URL}/ors/v2/directions/driving-car?start={lon0},{lat0}&end={lon1},{lat1}'
        response = requests.get(url)
        logger.debug("The url of the ors is " + url)

        if response.status_code == 200:
            self.route = response.json()
        else:
            raise Exception(f'Please fix/start the Openrouteservice. Error: {response.status_code}, {response.json()}')

        # ? Do we even need this cast?
        self.duration = int(self.route['features'][0]['properties']['summary']['duration'])
        self.distance = float(self.route['features'][0]['properties']['summary']['distance'])
        self.waypoints = [(lat, lon) for lon, lat in self.route['features'][0]['geometry']['coordinates']]
        self.waypoint_lookup_table = dict()
        if do_preprocessing:
            self.waypoint_lookup_table = self._generate_waypoint_lookup_table()

    def _intermediate_step_waypoint_lookup(self, min_waypoint, max_waypoint, t_min, t_max, t):
        # Essentially just rounded normalization lol
        return math.floor(((t - t_min) / (t_max - t_min)) * (max_waypoint - min_waypoint) + min_waypoint)

    def _generate_waypoint_lookup_table(self):
        waypoint_lookup_table = dict()
        t = 0
        for step in self.route['features'][0]['properties']['segments'][0]['steps']:
            t_min = t
            t_max = int(step['duration']) + t
            while t <= t_max:
                if t_min != t_max:
                    waypoint_lookup_table[t] = self._intermediate_step_waypoint_lookup(
                        step['way_points'][0], step['way_points'][1], t_min, t_max, t)
                else:
                    waypoint_lookup_table[t] = step['way_points'][0]
                t += 1
        return waypoint_lookup_table

    def _time_to_waypoint_id(self, t):
        if t <= 0:
            return 0
        elif t not in self.waypoint_lookup_table.keys():
            return len(self.waypoints)-1
        return self.waypoint_lookup_table[t]

    def _waypoint_id_to_coords(self, waypoint_id):
        return self.waypoints[waypoint_id]

    def time_left(self, t):
        if t >= self.duration:
            return 0
        return self.duration - t

    def _distance_between(self, waypoint_id_from, waypoint_id_to):
        return L2_distance(self._waypoint_id_to_coords(waypoint_id_from),
                self._waypoint_id_to_coords(waypoint_id_to))

    def _distance_sum_until_waypoint(self, waypoint_id):
        distance = 0
        for i in range(waypoint_id+1):
            distance += self._distance_between(i, i+1)
        return distance

    def remaining_waypoints(self, t):
        current_waypoint = self._time_to_waypoint_id(t)
        return self.waypoints[current_waypoint:]

    def distance_traveled(self, t):
        return self._distance_sum_until_waypoint(self._time_to_waypoint_id(t))

    def position(self, t):
        if t < 0:
            return self.origin
        if t >= self.duration:
            return self.destination
        waypoint_id = self._time_to_waypoint_id(t)
        return self._waypoint_id_to_coords(waypoint_id)


if __name__ == '__main__':
    origin = (48.153095, 11.514132)
    destination = (48.122337, 11.567343)
    route = Route(origin, destination)
    print(f'Duration: {route.duration}')
    for t in [-1, 0, 1, 16, 123, 1000, 1235]:
        print(f'Position at time {t}: {route.position(t)}')
