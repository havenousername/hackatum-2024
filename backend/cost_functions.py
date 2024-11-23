import math
import time


# One degree of latitude in kilometers
EARTH_MEAN_RADIUS = 6371e3
EARTH_LAT_DEGREE_LENGTH = 110.25
MAP_CENTER = (48.137334263121744,11.575138710691016)
MUNICH_LONG_DEGREE_SCALE = math.cos(MAP_CENTER[0])

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

def _fast_geographic_L2(coord0, coord1, more_accurate=False):
    lat0, lng0 = coord0
    lat1, lng1 = coord1
    if more_accurate:
        long_degree_scale = math.cos(math.radians(lat1))
    else:
        long_degree_scale = MUNICH_LONG_DEGREE_SCALE
    x = (lat0 - lat1) * 1000
    y = (lng0 - lng1) * long_degree_scale * 1000
    return EARTH_LAT_DEGREE_LENGTH * math.sqrt(x**2 + y**2)

def _haversine_L2(coord0, coord1):
    lat0, lng0 = coord0
    lat1, lng1 = coord1
    phi_1 = lat0 * math.pi/180
    phi_2 = lat1 * math.pi/180
    delta_phi = (lat1-lat0) * math.pi/180
    delta_lambda = (lng1-lng0) * math.pi/180

    a = math.sin(delta_phi/2)**2 + math.cos(phi_1) * math.cos(phi_2) * \
        math.sin(delta_lambda/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

    return EARTH_MEAN_RADIUS * c


if __name__ == '__main__':
    # Result: Fast method is about double speed
    coord0 = (48.153095, 11.514132)
    coord1 = (48.122337, 11.567343)

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
