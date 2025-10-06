import { PublicKey } from "@solana/web3.js"

// Program IDs (these would be your deployed Solana programs)
export const GAME_PROGRAM_ID = new PublicKey("11111111111111111111111111111111") // Placeholder
export const NFT_PROGRAM_ID = new PublicKey("11111111111111111111111111111111") // Placeholder

// Token Mint Addresses
export const GXY_TOKEN_MINT = new PublicKey("11111111111111111111111111111111") // $GXY governance token
export const DST_TOKEN_MINT = new PublicKey("11111111111111111111111111111111") // $DST utility token

// Game Constants
export const SHIP_RARITIES = ["Common", "Rare", "Epic", "Legendary"] as const
export const DRONE_TYPES = ["Mining", "Efficiency", "Shield"] as const
export const PLANET_TIERS = [1, 2, 3, 4, 5] as const

export type ShipRarity = (typeof SHIP_RARITIES)[number]
export type DroneType = (typeof DRONE_TYPES)[number]
export type PlanetTier = (typeof PLANET_TIERS)[number]
