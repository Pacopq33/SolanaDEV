"use client"

import { useState, useEffect } from "react"
import type { Ship } from "@/lib/solana/types"

export function useMockShips() {
  const [ships, setShips] = useState<Ship[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading ships from blockchain
    const loadShips = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockShips: Ship[] = [
        {
          mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
          name: "Stellar Voyager",
          rarity: "Epic",
          miningPower: 850,
          durability: 180,
          maxDurability: 200,
          fuelEfficiency: 85,
          specialTrait: "Ice Planet Expert",
          status: "Hangar",
          level: 5,
          image: "/futuristic-spaceship-purple-glow.jpg",
        },
        {
          mint: "9yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV",
          name: "Nebula Striker",
          rarity: "Rare",
          miningPower: 620,
          durability: 150,
          maxDurability: 150,
          fuelEfficiency: 75,
          specialTrait: "Reinforced Shield",
          status: "Hangar",
          level: 3,
          image: "/blue-spaceship-neon.jpg",
        },
        {
          mint: "5xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW",
          name: "Quantum Raider",
          rarity: "Legendary",
          miningPower: 1200,
          durability: 250,
          maxDurability: 250,
          fuelEfficiency: 95,
          specialTrait: "Quantum Accelerator",
          status: "Expedition",
          level: 8,
          image: "/gold-legendary-spaceship.jpg",
        },
      ]

      setShips(mockShips)
      setLoading(false)
    }

    loadShips()
  }, [])

  return { ships, loading }
}
