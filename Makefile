SHELL := /bin/bash

COMPOSE_FILE=infra/compose.yaml
INFRA_ENV_FILE=infra/.env
INFRA_ENV_EXAMPLE=infra/.env.example

.PHONY: help init setup bootstrap up down logs restart ps

help:
	@echo ""
	@echo "Available commands:"
	@echo "  make init       - Full first-time setup (setup + bootstrap + up)"
	@echo "  make setup      - Copy infra/.env.example to infra/.env if needed"
	@echo "  make bootstrap  - Prepare environment (create Docker network)"
	@echo "  make up         - Start the stack"
	@echo "  make down       - Stop the stack"
	@echo "  make logs       - Show container logs"
	@echo "  make restart    - Restart the stack"
	@echo "  make ps         - List running containers"
	@echo ""

init: setup bootstrap up

setup:
	@if [ ! -f $(INFRA_ENV_FILE) ]; then \
		if [ -f $(INFRA_ENV_EXAMPLE) ]; then \
			cp $(INFRA_ENV_EXAMPLE) $(INFRA_ENV_FILE); \
			echo "$(INFRA_ENV_FILE) created from $(INFRA_ENV_EXAMPLE)"; \
		else \
			echo "$(INFRA_ENV_EXAMPLE) not found!"; \
			exit 1; \
		fi; \
	else \
		echo "$(INFRA_ENV_FILE) already exists"; \
	fi

bootstrap:
	@chmod +x ./infra/scripts/bootstrap.sh
	@./infra/scripts/bootstrap.sh

up:
	@docker compose --env-file $(INFRA_ENV_FILE) -f $(COMPOSE_FILE) up -d

down:
	@docker compose --env-file $(INFRA_ENV_FILE) -f $(COMPOSE_FILE) down

logs:
	@docker compose --env-file $(INFRA_ENV_FILE) -f $(COMPOSE_FILE) logs -f

restart:
	@docker compose --env-file $(INFRA_ENV_FILE) -f $(COMPOSE_FILE) down
	@docker compose --env-file $(INFRA_ENV_FILE) -f $(COMPOSE_FILE) up -d

ps:
	@docker compose --env-file $(INFRA_ENV_FILE) -f $(COMPOSE_FILE) ps