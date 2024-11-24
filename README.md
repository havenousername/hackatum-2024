# OptiFleet

## How to run

### Start the Containers

First of all, you need to start both of the backend containers:

#### T-Systems Container

Run `docker-compose up` in the repositories root directory.

#### Openroutesystem Container

Run `./setup.sh` in the [`openroutesystem/`](./openroutesystem/) directory.
This will download the Oberbayern map dataset.

Then run `docker-compose up` in the [`openroutesystem/`](./openroutesystem/)
directory and **wait a few minutes, until the routing graph has fully compiled**
(it is compiling as long as there is a file called `openroutesystem/ors-docker/graph/car/gh.lock`).
