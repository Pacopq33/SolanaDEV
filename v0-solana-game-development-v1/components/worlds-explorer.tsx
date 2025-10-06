"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Rocket, Zap, TrendingUp, Star, Sparkles } from "lucide-react"
import { TransactionLoader } from "@/components/transaction-loader"
import type { Miner } from "@/app/page"
import Image from "next/image"

interface World {
  id: string
  name: string
  tier: number
  description: string
  winRate: number
  reward: number
  gasCost: number
  requiredShipLevel: number
  requiredMinerLevel: number
  image: string
  color: string
  glowColor: string
}

const worlds: World[] = [
  {
    id: "1",
    name: "Nebulosa Genesis",
    tier: 1,
    description: "Un mundo de inicio perfecto para mineros novatos. Recursos abundantes y peligros mínimos.",
    winRate: 80,
    reward: 20,
    gasCost: 10,
    requiredShipLevel: 1,
    requiredMinerLevel: 1,
    image: "/purple-nebula-space-planet.jpg",
    color: "from-purple-500/20 to-pink-500/20",
    glowColor: "shadow-purple-500/50",
  },
  {
    id: "2",
    name: "Cinturón de Asteroides Cyan",
    tier: 2,
    description: "Asteroides ricos en minerales raros. Requiere equipo mejorado para extraer eficientemente.",
    winRate: 65,
    reward: 35,
    gasCost: 20,
    requiredShipLevel: 2,
    requiredMinerLevel: 2,
    image: "/cyan-asteroid-belt-space.jpg",
    color: "from-cyan-500/20 to-blue-500/20",
    glowColor: "shadow-cyan-500/50",
  },
  {
    id: "3",
    name: "Planeta Esmeralda",
    tier: 3,
    description: "Un mundo exuberante con cristales de energía verde. Alta competencia entre mineros.",
    winRate: 50,
    reward: 45,
    gasCost: 30,
    requiredShipLevel: 3,
    requiredMinerLevel: 3,
    image: "/green-emerald-planet-glowing.jpg",
    color: "from-green-500/20 to-emerald-500/20",
    glowColor: "shadow-green-500/50",
  },
  {
    id: "4",
    name: "Estrella Dorada Omega",
    tier: 4,
    description: "Orbita una estrella moribunda. Recursos extremadamente valiosos pero condiciones peligrosas.",
    winRate: 35,
    reward: 70,
    gasCost: 40,
    requiredShipLevel: 4,
    requiredMinerLevel: 4,
    image: "/golden-yellow-star-space-bright.jpg",
    color: "from-yellow-500/20 to-orange-500/20",
    glowColor: "shadow-yellow-500/50",
  },
  {
    id: "5",
    name: "Agujero Negro Carmesí",
    tier: 5,
    description: "El desafío definitivo. Solo los mineros más experimentados sobreviven aquí.",
    winRate: 30,
    reward: 100,
    gasCost: 50,
    requiredShipLevel: 5,
    requiredMinerLevel: 5,
    image: "/red-black-hole-space-vortex.jpg",
    color: "from-red-500/20 to-rose-500/20",
    glowColor: "shadow-red-500/50",
  },
]

interface WorldsExplorerProps {
  shipLevel: number
  miners: Miner[]
  shipGas: number
  onExplore: (
    worldId: string,
    gasCost: number,
    winRate: number,
    reward: number,
  ) => { success: boolean; won?: boolean; reward?: number; message?: string }
}

export function WorldsExplorer({ shipLevel, miners, shipGas, onExplore }: WorldsExplorerProps) {
  const [exploringWorld, setExploringWorld] = useState<string | null>(null)
  const [transactionState, setTransactionState] = useState<{
    isOpen: boolean
    type: "success" | "error" | "loading"
    title: string
    message: string
    amount?: number
    currency?: string
  }>({
    isOpen: false,
    type: "loading",
    title: "",
    message: "",
  })

  const minMinerLevel = miners.length > 0 ? Math.min(...miners.map((m) => m.level)) : 0

  const canAccessWorld = (world: World) => {
    return shipLevel >= world.requiredShipLevel && minMinerLevel >= world.requiredMinerLevel
  }

  const getTierIcon = (tier: number) => {
    switch (tier) {
      case 1:
        return <Star className="w-4 h-4" />
      case 2:
        return <Zap className="w-4 h-4" />
      case 3:
        return <TrendingUp className="w-4 h-4" />
      case 4:
        return <Sparkles className="w-4 h-4" />
      case 5:
        return <Rocket className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const handleExploreWorld = async (world: World) => {
    if (shipGas < world.gasCost) {
      return
    }

    setExploringWorld(world.id)

    setTransactionState({
      isOpen: true,
      type: "loading",
      title: "Explorando mundo",
      message: `Navegando hacia ${world.name}...`,
    })

    await new Promise((resolve) => setTimeout(resolve, 2500))

    const result = onExplore(world.id, world.gasCost, world.winRate, world.reward)

    if (result.success && result.won !== undefined) {
      setTransactionState({
        isOpen: true,
        type: result.won ? "success" : "error",
        title: result.won ? "¡Exploración exitosa!" : "Exploración fallida",
        message: result.won ? `Has descubierto recursos en ${world.name}` : "No encontraste recursos esta vez",
        amount: result.won ? result.reward : undefined,
        currency: result.won ? "SWORK" : undefined,
      })
    } else {
      setTransactionState({
        isOpen: true,
        type: "error",
        title: "Error",
        message: result.message || "No se pudo completar la exploración",
      })
    }

    setExploringWorld(null)
  }

  return (
    <div>
      <TransactionLoader
        isOpen={transactionState.isOpen}
        onClose={() => setTransactionState({ ...transactionState, isOpen: false })}
        type={transactionState.type}
        title={transactionState.title}
        message={transactionState.message}
        amount={transactionState.amount}
        currency={transactionState.currency}
      />

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Explorar Mundos</h2>
        <p className="text-muted-foreground">
          Descubre nuevos planetas y gana tokens SWORK. Cada exploración consume gas de nave.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {worlds.map((world) => {
          const isAccessible = canAccessWorld(world)
          const needsShipUpgrade = shipLevel < world.requiredShipLevel
          const needsMinerUpgrade = minMinerLevel < world.requiredMinerLevel
          const hasEnoughGas = shipGas >= world.gasCost
          const isExploring = exploringWorld === world.id

          return (
            <Card
              key={world.id}
              className={`overflow-hidden bg-card border-2 transition-all duration-300 ${
                isAccessible
                  ? `border-primary/50 hover:border-primary hover:${world.glowColor}`
                  : "border-border opacity-60"
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${world.color}`} />
                <Image
                  src={world.image || "/placeholder.svg"}
                  alt={world.name}
                  fill
                  className="object-cover mix-blend-overlay"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-background/80 text-foreground border border-border">
                    {getTierIcon(world.tier)}
                    <span className="ml-1">Tier {world.tier}</span>
                  </Badge>
                  {!isAccessible && (
                    <Badge className="bg-destructive/80 text-destructive-foreground border-0">
                      <Lock className="w-3 h-3 mr-1" />
                      Bloqueado
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{world.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{world.description}</p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-muted/50 rounded-lg p-2 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
                    <p className="text-sm font-bold text-accent">{world.winRate}%</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Recompensa</p>
                    <p className="text-sm font-bold text-chart-5">{world.reward} SWORK</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-2 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Costo Gas</p>
                    <p className="text-sm font-bold text-secondary">{world.gasCost}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Nivel de Nave:</span>
                    <span
                      className={`font-semibold ${
                        shipLevel >= world.requiredShipLevel ? "text-accent" : "text-destructive"
                      }`}
                    >
                      {shipLevel} / {world.requiredShipLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Nivel Mínimo de Mineros:</span>
                    <span
                      className={`font-semibold ${
                        minMinerLevel >= world.requiredMinerLevel ? "text-accent" : "text-destructive"
                      }`}
                    >
                      {minMinerLevel} / {world.requiredMinerLevel}
                    </span>
                  </div>
                </div>

                {isAccessible ? (
                  <Button
                    onClick={() => handleExploreWorld(world)}
                    disabled={!hasEnoughGas || isExploring}
                    className="w-full gap-2 bg-primary hover:bg-primary/80"
                  >
                    <Rocket className="w-4 h-4" />
                    Explorar ({world.gasCost} Gas)
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button disabled className="w-full gap-2">
                      <Lock className="w-4 h-4" />
                      Bloqueado
                    </Button>
                    <p className="text-xs text-center text-destructive">
                      {needsShipUpgrade && `Mejora tu nave a nivel ${world.requiredShipLevel}`}
                      {needsShipUpgrade && needsMinerUpgrade && " y "}
                      {needsMinerUpgrade && `mejora tus mineros a nivel ${world.requiredMinerLevel}`}
                    </p>
                  </div>
                )}

                {isAccessible && !hasEnoughGas && (
                  <p className="text-xs text-center text-destructive mt-2">Gas insuficiente</p>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
