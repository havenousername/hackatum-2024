FROM python:3.9-slim as build

ENV UPDATE_INTERVAL=0.4

WORKDIR /app

# Install system dependencies for CBC solver
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        coinor-cbc \
        gcc \
        libffi-dev \
        libgl1 \
        && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source
COPY . .

# Expose port
EXPOSE 8888

# Run the app
CMD ["uvicorn", "websocket:app", "--host", "0.0.0.0", "--port", "8888", "--workers", "4"]
