# OptiFleet

## How to run

### Start the Containers

First of all, you need to start both of the backend containers:

#### T-Systems Container

Run `docker-compose up -d` in the repositories root directory.

#### Openroutesystem Container

Run `./setup.sh` in the [`openroutesystem/` directory](./openroutesystem/).
This will download the Oberbayern map dataset.

_If you are using a non-unix OS, you might have to follow the steps in the_
_[`setup.sh`](./openrouteservice/setup.sh) on your own, i.e. make directories,_
_copy the config and download the dataset at the provided link._

**If you are using Windows, try to use the Windows-Subsystem for Linux to run the setup script!**

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

Go to the main directory which is ~/frontend

Install the node_modules using `npm install`

npm version >= 18

Run the frontend using `npm run dev`
