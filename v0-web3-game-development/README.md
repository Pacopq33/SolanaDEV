# GalaxyMiner - Solana Web3 Space Mining Game

A blockchain-based space mining game built on Solana, inspired by CryptoMines. Players collect NFT spaceships and drones, explore planets across 5 tiers, and earn tokens through expeditions.

## Features

### Core Gameplay
- **NFT Fleet Management**: Collect and manage unique spaceships and drones with varying rarities and attributes
- **5-Tier Planet System**: Explore planets from Tier 1 to Tier 5, each with increasing difficulty and rewards
- **Mining Expeditions**: Deploy your fleet to mine resources and earn $DST tokens
- **Marketplace**: Buy and sell NFT ships and drones with other players

### Tokenomics
- **$GXY (Governance Token)**: Used for staking, governance, and premium features
  - Total Supply: 100,000,000
  - Stakeable with 15-25% APY
- **$DST (Utility Token)**: Earned from expeditions, used for in-game transactions
  - Unlimited supply
  - Play-to-earn mechanics

### NFT System
**Spaceships**:
- Rarities: Common, Rare, Epic, Legendary
- Attributes: Mining Power, Durability, Fuel Efficiency, Cargo Capacity
- Can equip up to 3 drones per ship

**Drones**:
- Types: Mining, Combat, Scout, Repair
- Enhance ship capabilities
- Tradeable on marketplace

### Planet Tiers
1. **Tier 1 - Novice Sector**: Basic resources, low requirements
2. **Tier 2 - Explorer Zone**: Moderate rewards, requires level 5+ ships
3. **Tier 3 - Advanced Region**: Good rewards, requires level 10+ ships
4. **Tier 4 - Expert Territory**: High rewards, requires level 15+ ships
5. **Tier 5 - Master Domain**: Maximum rewards, requires level 20+ ships

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Blockchain**: Solana Web3.js, Solana Wallet Adapter
- **Design**: Cyberpunk aesthetic with neon colors (cyan, magenta, green)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- A Solana wallet (Phantom or Solflare recommended)

### Installation

1. Clone the repository
2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Connecting Your Wallet

1. Click "Connect Wallet" in the top right
2. Select your wallet provider (Phantom or Solflare)
3. Approve the connection
4. Start playing!

## Game Mechanics

### Starting Out
1. Connect your Solana wallet
2. Mint your first spaceship and drone NFTs
3. View your fleet in the Fleet Manager
4. Select a Tier 1 planet to begin mining

### Expeditions
1. Navigate to the Planets page
2. Select a planet based on your fleet's capabilities
3. Choose ships and drones for the expedition
4. Launch and wait for completion
5. Collect $DST token rewards

### Marketplace Trading
1. Browse available ships and drones
2. Filter by type, rarity, and price
3. Purchase NFTs with SOL or $DST
4. List your own NFTs for sale

### Token Staking
1. Navigate to the Tokens page
2. Stake $GXY tokens to earn passive rewards
3. View your staking APY and pending rewards
4. Unstake anytime (subject to cooldown periods)

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Dashboard
│   ├── fleet/                # Fleet management
│   ├── marketplace/          # NFT marketplace
│   ├── planets/              # Planet exploration
│   └── tokens/               # Token economy
├── components/
│   ├── fleet/                # Fleet components
│   ├── marketplace/          # Marketplace components
│   ├── planets/              # Planet components
│   ├── tokens/               # Token components
│   └── ui/                   # shadcn/ui components
├── hooks/                    # Custom React hooks
├── lib/
│   └── solana/              # Solana utilities and types
└── public/                   # Static assets
\`\`\`

## Smart Contract Integration

This frontend is designed to integrate with Solana programs for:
- NFT minting and management
- Marketplace transactions
- Token staking and rewards
- Expedition mechanics

**Note**: Smart contracts are not included in this repository. You'll need to deploy your own Solana programs and update the program IDs in `lib/solana/constants.ts`.

## Customization

### Updating Token Addresses
Edit `lib/solana/constants.ts`:
\`\`\`typescript
export const GXY_TOKEN_MINT = "YOUR_GXY_TOKEN_ADDRESS"
export const DST_TOKEN_MINT = "YOUR_DST_TOKEN_ADDRESS"
\`\`\`

### Modifying Game Parameters
- Ship attributes: `lib/solana/types.ts`
- Planet tiers: `hooks/use-mock-planets.ts`
- Tokenomics: `components/tokens/tokenomics-info.tsx`

## Design System

### Colors
- **Primary (Cyan)**: `#00f0ff` - Main brand color
- **Secondary (Magenta)**: `#ff00ff` - Accent color
- **Accent (Green)**: `#00ff00` - Success/rewards
- **Background**: Dark theme with transparency

### Typography
- **Headings**: Orbitron (futuristic)
- **Body**: System fonts

### Effects
- Glow effects on interactive elements
- Backdrop blur for cards
- Holographic borders
- Scanline animation

## Contributing

This is a demonstration project. Feel free to fork and customize for your own Web3 game!

## License

MIT License - feel free to use this code for your own projects.

## Disclaimer

This is a demonstration project. No real cryptocurrency transactions occur. Before deploying to production:
1. Implement proper smart contracts
2. Add security audits
3. Implement proper error handling
4. Add rate limiting and anti-cheat measures
5. Comply with local regulations regarding blockchain gaming
