# Guía de Integración con Solana

Este documento explica cómo integrar completamente el juego con la blockchain de Solana.

## 1. Instalación de Dependencias

\`\`\`bash
npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-wallets
npm install @solana/wallet-adapter-react-ui @solana/wallet-adapter-base
npm install @metaplex-foundation/js
\`\`\`

## 2. Configurar Wallet Adapter

Envuelve tu aplicación con los providers necesarios en `app/layout.tsx`:

\`\`\`tsx
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import '@solana/wallet-adapter-react-ui/styles.css'

const network = WalletAdapterNetwork.Devnet
const endpoint = clusterApiUrl(network)

const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
]

// Envolver children con:
<ConnectionProvider endpoint={endpoint}>
  <WalletProvider wallets={wallets} autoConnect>
    <WalletModalProvider>
      {children}
    </WalletModalProvider>
  </WalletProvider>
</ConnectionProvider>
\`\`\`

## 3. Implementar Conexión de Wallet

En `components/wallet-button.tsx`, reemplazar la simulación con:

\`\`\`tsx
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export function WalletButton() {
  return <WalletMultiButton />
}
\`\`\`

## 4. Crear NFTs de Mineros

Usar Metaplex para crear NFTs:

\`\`\`tsx
import { Metaplex } from '@metaplex-foundation/js'
import { Connection, clusterApiUrl } from '@solana/web3.js'

const connection = new Connection(clusterApiUrl('devnet'))
const metaplex = Metaplex.make(connection)

async function createMinerNFT(minerData) {
  const { nft } = await metaplex.nfts().create({
    name: minerData.name,
    symbol: "MINER",
    uri: "https://tu-metadata-uri.com/miner.json",
    sellerFeeBasisPoints: 500,
    attributes: [
      { trait_type: "Level", value: minerData.level },
      { trait_type: "Power", value: minerData.power },
      { trait_type: "Efficiency", value: minerData.efficiency },
      { trait_type: "Rarity", value: minerData.rarity }
    ]
  })
  return nft
}
\`\`\`

## 5. Sistema de Recompensas

Enviar SOL como recompensa:

\`\`\`tsx
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js'

async function sendReward(recipientAddress: string, amount: number) {
  const connection = new Connection(clusterApiUrl('devnet'))
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(recipientAddress),
      lamports: amount * 1e9 // Convertir SOL a lamports
    })
  )
  
  const signature = await wallet.sendTransaction(transaction, connection)
  await connection.confirmTransaction(signature)
  return signature
}
\`\`\`

## 6. Programa de Solana (Smart Contract)

Para funcionalidades avanzadas como el marketplace, necesitarás crear un programa de Solana:

1. Instalar Anchor Framework: `cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked`
2. Crear nuevo proyecto: `anchor init solana_mines`
3. Implementar lógica de:
   - Staking de mineros
   - Marketplace (compra/venta)
   - Sistema de recompensas automático
   - Mejoras de mineros

## 7. Metadata de NFTs

Crear archivos JSON para metadata de mineros:

\`\`\`json
{
  "name": "Miner Alpha #1",
  "symbol": "MINER",
  "description": "Un minero poderoso de la colección SolanaMines",
  "image": "https://tu-cdn.com/miner-alpha.png",
  "attributes": [
    { "trait_type": "Level", "value": 1 },
    { "trait_type": "Power", "value": 10 },
    { "trait_type": "Efficiency", "value": 85 },
    { "trait_type": "Rarity", "value": "Common" }
  ],
  "properties": {
    "category": "image",
    "files": [
      {
        "uri": "https://tu-cdn.com/miner-alpha.png",
        "type": "image/png"
      }
    ]
  }
}
\`\`\`

## 8. Variables de Entorno

Agregar a tu proyecto:

\`\`\`env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_TREASURY_WALLET=TU_WALLET_PRIVADA_PARA_RECOMPENSAS
\`\`\`

## 9. Testing

Usar Solana Devnet para pruebas:
- Obtener SOL de prueba: https://solfaucet.com/
- Explorador de Devnet: https://explorer.solana.com/?cluster=devnet

## 10. Producción

Para lanzar en mainnet:
1. Cambiar network a 'mainnet-beta'
2. Actualizar RPC endpoint
3. Auditar smart contracts
4. Configurar wallet de tesorería con fondos reales
5. Implementar rate limiting y seguridad adicional

## Recursos Adicionales

- Documentación Solana: https://docs.solana.com/
- Metaplex Docs: https://docs.metaplex.com/
- Anchor Framework: https://www.anchor-lang.com/
- Wallet Adapter: https://github.com/solana-labs/wallet-adapter
