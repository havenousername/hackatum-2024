import math
import requests
import time


DO_L2_TIME_MEASUREMENTS = False
DO_API_TIME_MEASUREMENTS = False

# One degree of latitude in kilometers
EARTH_MEAN_RADIUS = 6371e3
EARTH_LAT_DEGREE_LENGTH = 110.25
MAP_CENTER = (48.137334263121744,11.575138710691016)
MUNICH_LONG_DEGREE_SCALE = math.cos(MAP_CENTER[0])

# The port for the openrouteservice API
ORS_PORT = 12345

# Default values used for normalization, just some guesses from edge to edge of the map
MIN_DISTANCE = 0
MAX_DISTANCE = 17000
MIN_DURATION = 0
MAX_DURATION = 2000

def normalize(x, lower, upper):
    return (x - lower) / (upper - lower)

class Weights:

    def __init__(self, distance, duration, revenue, energy_consumption) -> None:
        self.distance = distance
        self.duration = duration
        self.revenue = revenue
        self.energy_consumption = energy_consumption


def _fast_geographic_L2(coord0, coord1, more_accurate=False):
    lat0, lon0 = coord0
    lat1, lon1 = coord1
    if more_accurate:
        long_degree_scale = math.cos(math.radians(lat1))
    else:
        long_degree_scale = MUNICH_LONG_DEGREE_SCALE
    x = (lat0 - lat1) * 1000
    y = (lon0 - lon1) * long_degree_scale * 1000
    return EARTH_LAT_DEGREE_LENGTH * math.sqrt(x**2 + y**2)

def _haversine_L2(coord0, coord1):
    lat0, lon0 = coord0
    lat1, lon1 = coord1
    phi_1 = lat0 * math.pi/180
    phi_2 = lat1 * math.pi/180
    delta_phi = (lat1-lat0) * math.pi/180
    delta_lambda = (lon1-lon0) * math.pi/180

    a = math.sin(delta_phi/2)**2 + math.cos(phi_1) * math.cos(phi_2) * \
        math.sin(delta_lambda/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

    return EARTH_MEAN_RADIUS * c

def L2_distance(coord0, coord1, fast=True):
    """Returns the L2 distance (euclidean) between two coordinates in meters

    Args:
        coord0 (float, float): First coordinate
        coord1 (float, float): Second coordinate
        fast (bool): Whether not to use the more complicated haversine formula.
            This works for far away distances (assumes spherical earth), but
            for shorter distances, we will use a faster approximation

    Returns:
        float: The L2 distance in meters
    """
    if fast:
        return _fast_geographic_L2(coord0, coord1, more_accurate=True)

    return _haversine_L2(coord0, coord1)

def realistic_duration_and_distance(coord0, coord1):
    lat0, lon0 = coord0
    lat1, lon1 = coord1
    url = f'http://localhost:{ORS_PORT}/ors/v2/directions/driving-car?start={lon0},{lat0}&end={lon1},{lat1}'
    response = requests.get(url)
    if response.status_code == 200:
        # ? Is this always the correct access? Hopefully, this won't break...
        distance = response.json()['features'][0]['properties']['segments'][0]['distance']
        duration = response.json()['features'][0]['properties']['segments'][0]['duration']
        return {'distance': distance, 'duration': duration}
    else:
        raise Exception(f'Please fix/start the Openrouteservice. Error: {response.status_code}, {response.json()}')

def revenue_cost(constant_fee, fee_per_km, fee_per_min, customer_coord=None,
        destination_coord=None, duration_and_distance=None):
    if duration_and_distance == None:
        duration_and_distance = realistic_duration_and_distance(customer_coord, destination_coord)
    revenue_duration = fee_per_min * duration_and_distance['duration'] / 60
    revenue_distance = fee_per_km * duration_and_distance['distance']
    return revenue_duration + revenue_distance + constant_fee

def weighted_cost_function(taxi_coord, customer_coord, destination_coord,
        weights, constant_fee, fee_per_km, fee_per_min):
    duration_and_distance = realistic_duration_and_distance(taxi_coord, customer_coord)

    distance = normalize(duration_and_distance['distance'], MIN_DISTANCE, MAX_DISTANCE)
    duration = normalize(duration_and_distance['duration'], MIN_DURATION, MAX_DURATION)
    revenue = revenue_cost(constant_fee, fee_per_km, fee_per_min,
            customer_coord=customer_coord, destination_coord=destination_coord)
    MAX_REVENUE = revenue_cost(constant_fee, fee_per_km, fee_per_min,
            duration_and_distance={'duration': MAX_DURATION, 'distance': MAX_DISTANCE})
    if MAX_REVENUE == 0:
        MAX_REVENUE = 1
    revenue = normalize(revenue, constant_fee, MAX_REVENUE)
    # TODO: Implement energy consumption cost
    energy_consumption = 0

    total_cost = distance * weights.distance + duration * weights.duration - \
        revenue * weights.revenue + energy_consumption * weights.energy_consumption

    return total_cost


if __name__ == '__main__':
    munich_min = (48.113000, 11.503302)
    munich_max = (48.165312, 11.646708)
    coord0 = (48.153095, 11.514132)
    coord1 = (48.122337, 11.567343)


    munich_min_to_max = realistic_duration_and_distance(munich_min, munich_max)
    duration = munich_min_to_max['duration']
    distance = munich_min_to_max['distance']
    print(f'Munich min to max duration: {duration}s, suggested MAX: {MAX_DURATION}s')
    print(f'Munich min to max distance: {distance}m, suggested MAX: {MAX_DISTANCE}m')

    weights = Weights(1, 1, 1, 0)
    example_initial_fee = 10
    example_min_fee = .5
    example_km_fee = .5
    print('Example cost for a taxi stationed somewhere in Munich to take a customer ' +\
        'going from Munich min to Munich max with equal weights to duration, distance and cost' +\
        f'with initial fee of {example_initial_fee} and additional fees of {example_km_fee} ' +\
        f'per km and {example_min_fee} per min:')
    print(weighted_cost_function(coord0, munich_min, munich_max, weights, example_initial_fee,
        example_km_fee, example_min_fee))
    if DO_API_TIME_MEASUREMENTS:
        print('Timing of the API access:')
        start = time.time()
        tries = 10_000
        for i in range(tries):
            realistic_duration_and_distance(coord0, coord1)
        end = time.time()
        timing = end-start
        print(f'Average access time: {timing/tries:.5f}s')
        print(f'Accesses per second: {tries/timing:.2f}')

    if not DO_L2_TIME_MEASUREMENTS:
        exit()

    # Result: Fast method is about double speed
    print('Example:')
    print(f'Fast calculation {L2_distance(coord0, coord1, fast=True):.2f}m')
    print(f'Slow calculation {L2_distance(coord0, coord1, fast=False):.2f}m')

    print('Timing comparison:')
    start = time.time()
    for i in range(10_000_000):
        L2_distance((coord0[0], coord0[1]), (coord1[0], coord1[1]), fast=True)
    end = time.time()
    fast_timing = end-start
    print(f'Fast timing: {fast_timing:.3f}s')

    start = time.time()
    for i in range(10_000_000):
        L2_distance((coord0[0], coord0[1]), (coord1[0], coord1[1]), fast=False)
    end = time.time()
    slow_timing = end-start
    print(f'Slow timing: {slow_timing:.3f}s')

    print(f'Performance improvement: {(100*slow_timing/fast_timing):.2f}')
