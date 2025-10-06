"use client"

import { useState, useEffect } from "react"

interface MockExpedition {
  id: string
  planetName: string
  shipCount: number
  startTime: number
  endTime: number
  status: "Active" | "Completed"
}

export function useMockExpeditions() {
  const [expeditions, setExpeditions] = useState<MockExpedition[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadExpeditions = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const now = Date.now()
      const mockExpeditions: MockExpedition[] = [
        {
          id: "exp-1",
          planetName: "Crystalis",
          shipCount: 3,
          startTime: now - 3600000, // Started 1 hour ago
          endTime: now + 3600000, // Ends in 1 hour
          status: "Active",
        },
        {
          id: "exp-2",
          planetName: "Novara Prime",
          shipCount: 2,
          startTime: now - 7200000, // Started 2 hours ago
          endTime: now - 600000, // Ended 10 minutes ago
          status: "Completed",
        },
      ]

      setExpeditions(mockExpeditions)
      setLoading(false)
    }

    loadExpeditions()
  }, [])

  return { expeditions, loading }
}
