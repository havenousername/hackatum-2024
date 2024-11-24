# OptiFleet

## How to run

### Start the Containers

First of all, you need to start both of the backend containers:

#### T-Systems Container

Run `docker-compose up -d` in the repositories root directory.

#### Openroutesystem Container

Run `./setup.sh` in the [`openroutesystem/` directory](./openroutesystem/).
This will download the Oberbayern map dataset.

Then run `docker-compose up -d` in the [`openroutesystem/` directory](./openroutesystem/)
and **wait a few minutes, until the routing graph has fully compiled**
(it is compiling as long as there is a file called
`openroutesystem/ors-docker/graph/car/gh.lock`).

### Start the Backend

Now, you need to setup your python environment.
Required packages are listed in the [`backend/requirements.txt` file](./backend/requirements.txt),
you can use e.g. a virtual environment.
Then run `python websocket.py &` in the [`backend/` directory](./backend/).
(We might have made it easier, but we prioritized differently due to time constraints...)

### Start the Frontend

**??? (TODO)**
