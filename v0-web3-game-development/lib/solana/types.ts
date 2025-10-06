import type { ShipRarity, DroneType, PlanetTier } from "./constants"

export interface Ship {
  mint: string
  name: string
  rarity: ShipRarity
  miningPower: number
  durability: number
  maxDurability: number
  fuelEfficiency: number
  fuel: number
  maxFuel: number
  fuelConsumptionRate: number
  tier: 1 | 2 | 3 | 4 | 5
  equippedDrones: string[] // Drone mints
  requiredWorkersForUpgrade: number
  specialTrait: string
  status: "Hangar" | "Expedition" | "Repair"
  level: number
  image: string
}

export interface Drone {
  mint: string
  name: string
  type: DroneType
  bonus: number
  status: "Available" | "Equipped"
  image: string
}

export interface Planet {
  id: number
  name: string
  tier: PlanetTier
  requiredMiningPower: number
  baseReward: number
  duration: number
  image: string
  description: string
}

export interface Fleet {
  id: string
  ships: Ship[]
  drones: Drone[]
  totalMiningPower: number
  status: "Idle" | "OnExpedition"
}

export interface Expedition {
  id: string
  fleetId: string
  planetId: number
  startTime: number
  endTime: number
  status: "Active" | "Completed" | "Claimed"
  rewards?: {
    dst: number
    materials: string[]
  }
}

export interface TokenBalance {
  gxy: number
  dst: number
}

export interface MarketplaceAsset {
  type: "ship" | "drone"
  name: string
  image: string
  mint: string
  // Ship specific
  rarity?: ShipRarity
  miningPower?: number
  durability?: number
  maxDurability?: number
  fuelEfficiency?: number
  specialTrait?: string
  level?: number
  // Drone specific
  droneType?: DroneType
  bonus?: number
  description?: string
}

export interface MarketplaceListing {
  id: string
  asset: MarketplaceAsset
  seller: string
  price: number
  listedAt: number
}
