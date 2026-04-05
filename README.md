# Devstack App + API

![Docker](https://img.shields.io/badge/docker-ready-blue)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-GPL--3.0-green)

A modern, reusable devstack to bootstrap fullstack projects (App + API) with Docker, Traefik, and zero setup friction.

---

## Demo

See how easy it is to start the entire stack:

![Devstack Demo](./devstack.gif)

---

## Overview

This project provides a standardized development environment for modern fullstack applications.

Instead of reinventing the setup for every project, this devstack gives you a **ready-to-use foundation** focused on:

* Fast onboarding
* Consistent environments
* Reusability across projects
* Better developer experience

---

## Quick Start

```bash
git clone https://github.com/mamura/devstack.git
cd devstack

make init
```

This will:

* create `infra/.env` from `infra/.env.example`
* create the Docker network if needed
* start the full stack

Then access:

* [http://app.localhost](http://app.localhost)
* [http://api.localhost](http://api.localhost)

---

## Project Structure

```
devstack/
├── app/
├── api/
├── infra/
│   ├── .env.example
│   ├── compose.yaml
│   ├── traefik/
│   │   └── traefik.yml
│   └── scripts/
│       └── bootstrap.sh
└── Makefile
```

---

## Infrastructure Environment

This project uses a dedicated environment file for infrastructure:

```
infra/.env
```

This avoids conflicts with application-level `.env` files inside `app/` or `api/`.

---

## Stack

* Docker & Docker Compose
* Traefik (reverse proxy)
* Makefile (command orchestration)
* Bootstrap script (environment setup)

---

## Available Commands

```bash
make init       # Full setup (setup + bootstrap + up)
make setup      # Create infra/.env from example
make bootstrap  # Prepare environment (network)
make up         # Start containers
make down       # Stop containers
make logs       # View logs
make restart    # Restart stack
make ps         # List containers
```

---

## Local URLs

Once the stack is running, services are exposed through Traefik:

* [http://app.localhost](http://app.localhost)
* [http://api.localhost](http://api.localhost)

---

## Intended Usage

This repository is a base structure for projects that contain:

* `app/`: frontend application
* `api/`: backend application
* `infra/`: shared development infrastructure

You can use it as:

* a starting template for new projects
* a reusable local infrastructure base
* a standard layout for app + api development

---

## Customization

Edit `infra/.env` to customize:

* stack name
* local domain
* exposed ports
* container images
* database credentials

---

## Requirements

* Docker
* Docker Compose
* GNU Make

---

## Why this devstack?

Because setting up environments shouldn't slow you down.

This project helps you:

* Avoid port conflicts
* Standardize project setup
* Reduce onboarding friction
* Focus on building features instead of configuring infrastructure

---

## Roadmap

* [ ] HTTPS local support
* [ ] Database services (MySQL/Postgres)
* [ ] Hot reload improvements
* [ ] CLI for project scaffolding
* [ ] Multi-environment support

---

## Contributing

Contributions are welcome!

Feel free to open issues, suggest improvements, or submit pull requests.

---

## License

MIT

---

## Support

If this project helped you, consider giving it a star ⭐
