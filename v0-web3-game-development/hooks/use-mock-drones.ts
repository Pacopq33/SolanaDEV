"use client"

import { useState, useEffect } from "react"
import type { Drone } from "@/lib/solana/types"

export function useMockDrones() {
  const [drones, setDrones] = useState<Drone[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading drones from blockchain
    const loadDrones = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockDrones: Drone[] = [
        {
          mint: "3xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsA",
          name: "Mining Drone Alpha",
          type: "Mining",
          bonus: 15,
          status: "Available",
          image: "/mining-drone-robot-cyan.jpg",
        },
        {
          mint: "4xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsB",
          name: "Efficiency Drone Beta",
          type: "Efficiency",
          bonus: 20,
          status: "Equipped",
          image: "/efficiency-drone-robot-magenta.jpg",
        },
        {
          mint: "6xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsC",
          name: "Shield Drone Gamma",
          type: "Shield",
          bonus: 25,
          status: "Available",
          image: "/shield-drone-robot-green.jpg",
        },
        {
          mint: "8xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsD",
          name: "Mining Drone Delta",
          type: "Mining",
          bonus: 18,
          status: "Available",
          image: "/advanced-mining-drone-blue.jpg",
        },
      ]

      setDrones(mockDrones)
      setLoading(false)
    }

    loadDrones()
  }, [])

  return { drones, loading }
}
