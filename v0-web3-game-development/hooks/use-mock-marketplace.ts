"use client"

import { useState, useEffect } from "react"
import type { MarketplaceListing } from "@/lib/solana/types"

export function useMockMarketplace() {
  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadListings = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockListings: MarketplaceListing[] = [
        {
          id: "listing-1",
          asset: {
            type: "ship",
            name: "Cosmic Wanderer",
            image: "/futuristic-spaceship-purple-glow.jpg",
            mint: "ABC123...",
            rarity: "Epic",
            miningPower: 920,
            durability: 200,
            maxDurability: 200,
            fuelEfficiency: 88,
            specialTrait: "Asteroid Belt Expert",
            level: 6,
          },
          seller: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
          price: 12.5,
          listedAt: Date.now() - 3600000,
        },
        {
          id: "listing-2",
          asset: {
            type: "ship",
            name: "Star Cruiser",
            image: "/blue-spaceship-neon.jpg",
            mint: "DEF456...",
            rarity: "Rare",
            miningPower: 680,
            durability: 150,
            maxDurability: 150,
            fuelEfficiency: 72,
            specialTrait: "Speed Boost",
            level: 4,
          },
          seller: "9yKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsV",
          price: 5.8,
          listedAt: Date.now() - 7200000,
        },
        {
          id: "listing-3",
          asset: {
            type: "ship",
            name: "Galaxy Destroyer",
            image: "/gold-legendary-spaceship.jpg",
            mint: "GHI789...",
            rarity: "Legendary",
            miningPower: 1450,
            durability: 300,
            maxDurability: 300,
            fuelEfficiency: 98,
            specialTrait: "Quantum Core",
            level: 10,
          },
          seller: "5xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsW",
          price: 45.0,
          listedAt: Date.now() - 1800000,
        },
        {
          id: "listing-4",
          asset: {
            type: "drone",
            name: "Turbo Mining Drone",
            image: "/mining-drone-robot-cyan.jpg",
            mint: "JKL012...",
            droneType: "Mining",
            bonus: 22,
            description: "Increases Mining Power significantly",
          },
          seller: "3xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsA",
          price: 2.3,
          listedAt: Date.now() - 5400000,
        },
        {
          id: "listing-5",
          asset: {
            type: "drone",
            name: "Ultra Shield Drone",
            image: "/shield-drone-robot-green.jpg",
            mint: "MNO345...",
            droneType: "Shield",
            bonus: 30,
            description: "Reduces Durability Loss dramatically",
          },
          seller: "6xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsC",
          price: 3.5,
          listedAt: Date.now() - 9000000,
        },
        {
          id: "listing-6",
          asset: {
            type: "drone",
            name: "Hyper Efficiency Drone",
            image: "/efficiency-drone-robot-magenta.jpg",
            mint: "PQR678...",
            droneType: "Efficiency",
            bonus: 25,
            description: "Improves Fuel Efficiency greatly",
          },
          seller: "4xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsB",
          price: 2.8,
          listedAt: Date.now() - 10800000,
        },
      ]

      setListings(mockListings)
      setLoading(false)
    }

    loadListings()
  }, [])

  return { listings, loading }
}
