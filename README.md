# Development

## Pre-requisites

### Environment

1. Copy `.env.example` and rename to `.env.local`
2. Update desired variables with PINATA credentials

### Smart Contracts Addresses

Update `src/helpers/contracts.ts` with the desired smart contracts addresses of your deployment. If you're using standard Foundry, you don't need to change anything.

## Building

```bash
yarn
yarn dev
```
