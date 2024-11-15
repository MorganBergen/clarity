#  docker configuration

1.  `./docker-compose.yaml` 
2.  `./backend/pocketbase/Dockerfile` - `DP` 
3.  `./client/Dockerfile` - `DC`
4.  `./server/Dockerfile` - `DS`
5.  `./server/services/aiy/Dockerfile` - `DA`


####  containerizing the application using `docker`

`docker run -d -p 8080:80 docker/welcome-to-docker`

❯ docker run -d -p 8080:80 docker/welcome-to-docker
8ed021bd842b6c2ee9d45de2b0b0ab3aeb2695c66558ac38b554eaafc097634b

❯ docker ps
CONTAINER ID   IMAGE                      COMMAND                  CREATED         STATUS         PORTS                  NAMES
8ed021bd842b   docker/welcome-to-docker   "/docker-entrypoint.…"   4 seconds ago   Up 3 seconds   0.0.0.0:8080->80/tcp   upbeat_wozniak

`Dockerfile`

`compose.yaml` 

each component has its own `Dockerfile` which specifies the base image, working directory, dependencies, and start up commands

`docker-compose.yaml`  file defines services for each component and how they should be run.  it also maps ports from the containers to the host machine

volumes -  the pocketbase service uses a volume to persist data.

`docker compose up --build`

