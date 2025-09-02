# Projeto backend SMARTNX

## Autor

- **Gustavo Henrique** - [@1910gstv](https://github.com/1910gstv)

## Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)


## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   
    DB_NAME=postgres
    DB_USER=postgres
    DB_PASSWORD=123456
    DB_HOST=db
    DB_PORT=5432

    JWT_SECRET=smartnx

    NODE_ENV=development

    MONGO_URI=mongodb://mongo:27017/backend

    URL_API=http://localhost
    PORT=8080

## Como executar

1) Garanta que o Docker esteja rodando na sua máquina.

2) Na raiz do projeto, executar o comando:

```bash
docker compose up --build

```

A aplicação estará disponível em: http://localhost:8080

A documentação da swagger para acessar os endpoints disponível em: http://localhost:8080/api/swagger

### Observações

- Os endpoints de usuários não tem autenticação, pois é preciso criar um usuário para acessar os demais.
