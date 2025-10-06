"use client"

import { useState, useEffect } from "react"
import type { Planet } from "@/lib/solana/types"

export function useMockPlanets() {
  const [planets, setPlanets] = useState<Planet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPlanets = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockPlanets: Planet[] = [
        {
          id: 1,
          name: "Novara Prime",
          tier: 1,
          requiredMiningPower: 500,
          baseReward: 1000,
          duration: 7200, // 2 hours
          image: "/planet-tier1-gray.jpg",
          description: "A barren world with basic mineral deposits. Perfect for beginners.",
        },
        {
          id: 2,
          name: "Crystalis",
          tier: 2,
          requiredMiningPower: 1000,
          baseReward: 2500,
          duration: 14400, // 4 hours
          image: "/planet-tier2-blue.jpg",
          description: "Ice planet rich in crystalline structures and rare minerals.",
        },
        {
          id: 3,
          name: "Pyroxis",
          tier: 3,
          requiredMiningPower: 2000,
          baseReward: 5000,
          duration: 21600, // 6 hours
          image: "/planet-tier3-purple.jpg",
          description: "Volcanic world with extreme heat and valuable ore deposits.",
        },
        {
          id: 4,
          name: "Nebulox",
          tier: 4,
          requiredMiningPower: 3500,
          baseReward: 10000,
          duration: 28800, // 8 hours
          image: "/planet-tier4-orange.jpg",
          description: "Gas giant moon with exotic matter and high-value resources.",
        },
        {
          id: 5,
          name: "Quantum Nexus",
          tier: 5,
          requiredMiningPower: 5000,
          baseReward: 25000,
          duration: 43200, // 12 hours
          image: "/planet-tier5-red.jpg",
          description: "Legendary planet at the edge of known space. Maximum rewards.",
        },
      ]

      setPlanets(mockPlanets)
      setLoading(false)
    }

    loadPlanets()
  }, [])

  return { planets, loading }
}
