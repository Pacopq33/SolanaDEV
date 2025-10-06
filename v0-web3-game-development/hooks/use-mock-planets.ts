"use client"

import { useEffect, useState } from "react"
import type { Planet } from "@/lib/solana/types"
import { useI18n } from "@/lib/i18n/context"
import { translations } from "@/lib/i18n/translations"

type PlanetTranslationKey = keyof (typeof translations)["en"]["planets"]["catalog"]

interface PlanetConfig extends Omit<Planet, "name" | "description"> {
  translationKey: PlanetTranslationKey
  fallbackName: string
  fallbackDescription: string
}

const BASE_PLANETS: PlanetConfig[] = [
  {
    id: 1,
    tier: 1,
    requiredMiningPower: 500,
    baseReward: 1000,
    duration: 7200,
    image: "/planet-tier1-gray.jpg",
    translationKey: "novaraPrime",
    fallbackName: "Novara Prime",
    fallbackDescription: "A barren world with basic mineral deposits. Perfect for beginners.",
  },
  {
    id: 2,
    tier: 2,
    requiredMiningPower: 1000,
    baseReward: 2500,
    duration: 14400,
    image: "/planet-tier2-blue.jpg",
    translationKey: "crystalis",
    fallbackName: "Crystalis",
    fallbackDescription: "Ice planet rich in crystalline structures and rare minerals.",
  },
  {
    id: 3,
    tier: 3,
    requiredMiningPower: 2000,
    baseReward: 5000,
    duration: 21600,
    image: "/planet-tier3-purple.jpg",
    translationKey: "pyroxis",
    fallbackName: "Pyroxis",
    fallbackDescription: "Volcanic world with extreme heat and valuable ore deposits.",
  },
  {
    id: 4,
    tier: 4,
    requiredMiningPower: 3500,
    baseReward: 10000,
    duration: 28800,
    image: "/planet-tier4-orange.jpg",
    translationKey: "nebulox",
    fallbackName: "Nebulox",
    fallbackDescription: "Gas giant moon with exotic matter and high-value resources.",
  },
  {
    id: 5,
    tier: 5,
    requiredMiningPower: 5000,
    baseReward: 25000,
    duration: 43200,
    image: "/planet-tier5-red.jpg",
    translationKey: "quantumNexus",
    fallbackName: "Quantum Nexus",
    fallbackDescription: "Legendary planet at the edge of known space. Maximum rewards.",
  },
]

export function useMockPlanets() {
  const { language, t } = useI18n()
  const [planets, setPlanets] = useState<Planet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadPlanets = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!isMounted) {
        return
      }

      const localizedPlanets: Planet[] = BASE_PLANETS.map((planet) => {
        const localized = t.planets.catalog?.[planet.translationKey]

        return {
          ...planet,
          name: localized?.name ?? planet.fallbackName,
          description: localized?.description ?? planet.fallbackDescription,
        }
      })

      setPlanets(localizedPlanets)
      setLoading(false)
    }

    loadPlanets()

    return () => {
      isMounted = false
    }
  }, [language, t])

  return { planets, loading }
}
