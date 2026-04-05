#!/usr/bin/env bash

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ENV_FILE="$ROOT_DIR/infra/.env"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker não está instalado ou não está disponível no PATH."
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "Arquivo .env não encontrado."
  echo "Copie o arquivo de exemplo antes de continuar:"
  echo "cp .env.example .env"
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

if [ -z "${NETWORK_NAME:-}" ]; then
  echo "A variável NETWORK_NAME não está definida no arquivo .env."
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "Docker parece não estar em execução."
  exit 1
fi

if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
  echo "Docker network '$NETWORK_NAME' não encontrada. Criando..."
  docker network create "$NETWORK_NAME"
else
  echo "Docker network '$NETWORK_NAME' já existe."
fi

echo "Ambiente pronto 🚀"