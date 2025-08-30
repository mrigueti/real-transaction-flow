# Real Transaction Flow

Este projeto é uma simulação real de um fluxo de pagamento utilizando Stripe. Ele integra backend Node.js, filas via RabbitMQ, banco de dados MySQL, e um frontend estático para demonstrar o processo completo de pagamento.

## Tecnologias usadas

- **Backend**: Node.js + Express
- **Banco de dados**: MySQL (Docker)
- **Filas**: RabbitMQ
- **Pagamentos**: Stripe
- **Frontend**: HTML/CSS/JavaScript (estático)

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Stripe CLI](https://stripe.com/docs/stripe-cli) (opcional, para testar webhooks)

## Configuração do `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DB_HOST=mysqldb
DB_PORT=3306
DB_NAME=pagamentos_db
DB_USER=root
DB_PASSWORD=rootpassword
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
MYSQL_DATABASE=pagamentos_db
MYSQL_PASSWORD=rootpassword
```

## Como subir os serviços

Execute o comando abaixo para subir todos os serviços com Docker:

```bash
docker-compose up --build
```

## Testar Pagamento

1. Acesse: [http://localhost:3000](http://localhost:3000)
2. Clique em **"Pagar R$ 10,00"**
3. Utilize um dos seguintes cartões de teste:

- **Sucesso**: `4242 4242 4242 4242`
- **Falha**: `4000 0000 0000 9995`
