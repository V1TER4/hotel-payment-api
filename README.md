# Hotel Payment API

Serviço NestJS para apoiar o processamento de pagamentos de um sistema hoteleiro. O projeto oferece a estrutura de uma API Node.js tipada, com módulos separados e configuração preparada para execução com Node ou PM2.

## Stack

- Node.js
- NestJS
- TypeScript
- Jest
- ESLint e Prettier

## Executar

```bash
git clone https://github.com/V1TER4/hotel-payment-api.git
cd hotel-payment-api
npm install
npm run start:dev
```

Outros comandos úteis:

```bash
npm run build
npm test
npm run test:e2e
npm run start:prod
```

A aplicação inicia na porta configurada pelo NestJS. Revise o `src/` e o `package.json` para integrar o provedor de pagamento escolhido e definir variáveis de ambiente.

## Segurança

Credenciais de gateway, tokens e chaves de assinatura devem ficar em variáveis de ambiente. Antes de usar em produção, configure idempotência, validação de webhooks e logs sem dados sensíveis.

