#!/bin/bash


# ORS needs these dirs and config
mkdir -p ors-docker/config ors-docker/elevation_cache ors-docker/graphs ors-docker/files ors-docker/logs
cp ors-config.yml ors-docker/config

# This is our map dataset, all of Oberbayern
wget -O ors-docker/files/oberbayern-latest.osm.pbf https://download.geofabrik.de/europe/germany/bayern/oberbayern-latest.osm.pbf
