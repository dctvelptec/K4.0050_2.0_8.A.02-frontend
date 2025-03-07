# Development

## Pre-requisites

### Environment

1. Copy `.env.example` and rename to `.env.local`
2. Update desired variables with your personal data
   ```
   VITE_PINATA_KEY=[YOUR KEY HERE]
   VITE_PINATA_JWT=[YOUR JWT HERE]
   SEPOLIA_RPC=[YOUR SEPOLIA RPC HERE]
   ```
3. Current addresses are on Sepolia Testnet

### Smart Contracts Addresses On Sepolia

`Marketplace`: https://sepolia.etherscan.io/address/0x5935ad7e3e05bbcabe29922160074c3c1ae0e47b  
`MyFancyNFT`: https://sepolia.etherscan.io/address/0x697e5cf28a47a063b2cefd584169cda01a570254

## Building

```bash
yarn
yarn dev
```
