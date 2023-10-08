# Defining color codes
RED=\033[0;31m
GREEN=\033[0;32m
NC=\033[0m # No Color

# Project name for Docker Compose
PROJECT_NAME=owt_boats

# Create Docker images and start containers
up:
	@echo "${GREEN}Starting up Docker containers...${NC}"
	docker-compose -p $(PROJECT_NAME) up -d

# Stop and remove Docker containers
down:
	@echo "${RED}Stopping Docker containers...${NC}"
	docker-compose -p $(PROJECT_NAME) down

# Display Docker container logs
logs:
	@echo "${GREEN}Displaying Docker logs...${NC}"
	docker-compose -p $(PROJECT_NAME) logs
