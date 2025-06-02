# Stage 1: Download and unzip in Debian-based image
FROM debian:bookworm as downloader

RUN apt-get update && apt-get install -y wget unzip

WORKDIR /ors-setup

# Download and unzip your data/config
RUN wget -O ors-docker.zip https://ors-app.s3.eu-north-1.amazonaws.com/ors-docker.zip && \
    unzip ors-docker.zip && \
    rm ors-docker.zip

# Stage 2: Final image based on OpenRouteService
FROM openrouteservice/openrouteservice:v8.0.0

WORKDIR /home/ors

# Copy prepared data/config from downloader stage
COPY --from=downloader /ors-setup/ors-docker/ /home/ors/


# Expose required ports
EXPOSE 8082 9001

# Set runtime environment variables
ENV REBUILD_GRAPHS=False \
    CONTAINER_LOG_LEVEL=INFO \
    XMS=1g \
    XMX=2g

