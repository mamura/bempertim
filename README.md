# Bem Pertim

**Bem Pertim** é uma plataforma digital que conecta moradores a pequenos comércios locais, facilitando a descoberta de serviços e produtos próximos com base na localização do usuário.

O projeto nasceu como um trabalho de extensão da disciplina **Sistemas de Informação e Sociedade**, com o objetivo de promover inclusão digital e fortalecer a economia local.

---

## Objetivo

O Bem Pertim tem como objetivo:

- Facilitar a descoberta de pequenos negócios locais
- Aumentar a visibilidade de empreendedores da comunidade
- Incentivar o consumo local
- Promover inclusão digital

---

## Problema

Muitos pequenos comércios:

- Não possuem presença digital
- Não são encontrados por clientes da própria região
- Dependem apenas de indicação ou fluxo local

Enquanto isso, consumidores:

- Não sabem quais serviços existem perto deles
- Acabam recorrendo a grandes empresas

---

## Solução

Uma plataforma simples onde o usuário pode:

- Ver comércios próximos
- Filtrar por categoria
- Acessar informações básicas (contato, descrição)
- Descobrir negócios locais facilmente

---

## Tecnologias

### Frontend
- Next.js
- TypeScript
- TailwindCSS

### Backend (em desenvolvimento)
- Laravel
- MySQL / SQLite

### Infraestrutura
- Docker
- Traefik (para ambiente local)

---

## Funcionalidades (MVP)

### Usuário
- Visualizar comércios próximos
- Filtrar por categoria
- Ver detalhes do comércio

### Admin (inicial)
- Cadastrar comércios
- Editar informações

---

## Estrutura do Projeto

```bash
.
├── app/        # Frontend (Next.js)
├── api/        # Backend (Laravel - futuro)
├── infra/      # Infraestrutura Docker
├── Makefile
└── README.md
```

# Como rodar o projeto
Pré-requisitos:
- Docker
- Docker Compose
- make up

Depois acesse:

http://bempertim.localhost

# Metodologia

O projeto segue uma abordagem:
- Aplicada (resolução de problema real)
- Incremental (MVP evolutivo)
- Baseada em feedback de usuários reais

# Métricas de avaliação
- Número de comércios cadastrados
- Feedback dos usuários
- Facilidade de uso
- Percepção de aumento de visibilidade

# Roadmap
- Listagem de comércios próximos
- Geolocalização do usuário
- Cadastro de comércios
- Integração com backend
- Avaliações de usuários
- Integração com mapas

# Contribuição
Este projeto está em fase inicial (MVP). Sugestões e melhorias são bem-vindas.

# Autor

Marcio José Mota Pinto

Projeto acadêmico + aplicação prática real
Foco em impacto social com tecnologia

# Licença
MIT