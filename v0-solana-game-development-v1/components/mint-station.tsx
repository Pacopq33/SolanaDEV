"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TransactionLoader } from "@/components/transaction-loader"
import { Sparkles, Users, Rocket } from "lucide-react"
import type { Miner, Ship } from "@/app/page"

interface MintStationProps {
  sworkBalance: number
  onMintWorker: (worker: Omit<Miner, "id">) => boolean
  onMintShip: (ship: Omit<Ship, "id">) => boolean
}

const WORKER_MINT_COST = 150
const SHIP_MINT_COST = 300

const workerImages = [
  "/futuristic-robot-miner-blue.jpg",
  "/futuristic-robot-miner-purple.jpg",
  "/futuristic-robot-miner-gold.jpg",
]

const tierNames = ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"]
const rarityByTier = ["common", "common", "rare", "epic", "legendary"] as const

const rarityColors = {
  common: "bg-muted text-muted-foreground border-muted",
  rare: "bg-secondary/20 text-secondary border-secondary/50",
  epic: "bg-primary/20 text-primary border-primary/50",
  legendary: "bg-accent/20 text-accent border-accent/50",
}

const rarityLabels = {
  common: "Común",
  rare: "Raro",
  epic: "Épico",
  legendary: "Legendario",
}

export function MintStation({ sworkBalance, onMintWorker, onMintShip }: MintStationProps) {
  const [transactionState, setTransactionState] = useState<{
    isOpen: boolean
    type: "success" | "error" | "loading"
    title: string
    message: string
    mintedItem?: {
      type: "worker" | "ship"
      tier: number
      name: string
      rarity: "common" | "rare" | "epic" | "legendary"
      power: number
    }
  }>({
    isOpen: false,
    type: "loading",
    title: "",
    message: "",
  })

  const [showSuccessDetails, setShowSuccessDetails] = useState(false)

  const getRandomTier = () => {
    return Math.floor(Math.random() * 5) + 1 // 1-5
  }

  const closeAllModals = () => {
    setTransactionState({
      isOpen: false,
      type: "loading",
      title: "",
      message: "",
      mintedItem: undefined,
    })
    setShowSuccessDetails(false)
  }

  const handleMintWorker = () => {
    if (sworkBalance < WORKER_MINT_COST) {
      setTransactionState({
        isOpen: true,
        type: "error",
        title: "Fondos Insuficientes",
        message: `Necesitas ${WORKER_MINT_COST} SWORK para mintear un trabajador`,
      })
      return
    }

    // Show loading
    setTransactionState({
      isOpen: true,
      type: "loading",
      title: "Minteando Trabajador",
      message: "Generando tu nuevo trabajador...",
    })

    // Simulate minting process
    setTimeout(() => {
      const tier = getRandomTier()
      const level = tier
      const power = tier * 10
      const efficiency = 80 + tier * 3
      const rarity = rarityByTier[tier - 1]
      const image = workerImages[Math.floor(Math.random() * workerImages.length)]

      const newWorker: Omit<Miner, "id"> = {
        name: `Trabajador ${tierNames[tier - 1]}`,
        level,
        power,
        efficiency,
        status: "idle",
        image,
        rarity,
      }

      const success = onMintWorker(newWorker)

      if (success) {
        setTransactionState({
          isOpen: false,
          type: "success",
          title: "¡Minteo Exitoso!",
          message: `Has obtenido un trabajador ${tierNames[tier - 1]}`,
          mintedItem: {
            type: "worker",
            tier,
            name: newWorker.name,
            rarity,
            power,
          },
        })
        setShowSuccessDetails(true)
      }
    }, 2000)
  }

  const handleMintShip = () => {
    if (sworkBalance < SHIP_MINT_COST) {
      setTransactionState({
        isOpen: true,
        type: "error",
        title: "Fondos Insuficientes",
        message: `Necesitas ${SHIP_MINT_COST} SWORK para mintear una nave`,
      })
      return
    }

    // Show loading
    setTransactionState({
      isOpen: true,
      type: "loading",
      title: "Minteando Nave",
      message: "Construyendo tu nueva nave...",
    })

    // Simulate minting process
    setTimeout(() => {
      const tier = getRandomTier()
      const level = tier
      const capacity = tier * 5 + 5
      const rarity = rarityByTier[tier - 1]

      const newShip: Omit<Ship, "id"> = {
        name: `Nave ${tierNames[tier - 1]}`,
        level,
        capacity,
        rarity,
      }

      const success = onMintShip(newShip)

      if (success) {
        setTransactionState({
          isOpen: false,
          type: "success",
          title: "¡Minteo Exitoso!",
          message: `Has obtenido una nave ${tierNames[tier - 1]}`,
          mintedItem: {
            type: "ship",
            tier,
            name: newShip.name,
            rarity,
            power: capacity,
          },
        })
        setShowSuccessDetails(true)
      }
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 animate-neon-pulse">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Estación de Minteo</h2>
        <p className="text-muted-foreground">Mintea trabajadores y naves con tiers aleatorios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mint Worker Card */}
        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 mb-4">
              <Users className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Mintear Trabajador</h3>
            <p className="text-sm text-muted-foreground mb-4">Obtén un trabajador aleatorio de cualquier tier (1-5)</p>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Costo de Minteo</span>
                <span className="text-lg font-bold text-primary">{WORKER_MINT_COST} SWORK</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tu Balance</span>
                <span className="text-sm font-semibold text-foreground">{sworkBalance} SWORK</span>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground text-center">
                <span className="text-accent font-semibold">Probabilidad igual</span> para todos los tiers
              </p>
            </div>

            <Button
              onClick={handleMintWorker}
              disabled={sworkBalance < WORKER_MINT_COST}
              className="w-full bg-secondary hover:bg-secondary/80 gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Mintear Trabajador
            </Button>
          </div>
        </Card>

        {/* Mint Ship Card */}
        <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
              <Rocket className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Mintear Nave</h3>
            <p className="text-sm text-muted-foreground mb-4">Obtén una nave aleatoria de cualquier tier (1-5)</p>
          </div>

          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Costo de Minteo</span>
                <span className="text-lg font-bold text-primary">{SHIP_MINT_COST} SWORK</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tu Balance</span>
                <span className="text-sm font-semibold text-foreground">{sworkBalance} SWORK</span>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground text-center">
                <span className="text-accent font-semibold">Probabilidad igual</span> para todos los tiers
              </p>
            </div>

            <Button
              onClick={handleMintShip}
              disabled={sworkBalance < SHIP_MINT_COST}
              className="w-full bg-primary hover:bg-primary/80 gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Mintear Nave
            </Button>
          </div>
        </Card>
      </div>

      {/* Info Section */}
      <Card className="mt-8 p-6 bg-card/50 border-border">
        <h4 className="font-semibold text-foreground mb-3">Información de Tiers</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {tierNames.map((tier, index) => (
            <div key={tier} className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">{tier}</p>
              <p className="text-sm font-semibold text-foreground">Nivel {index + 1}</p>
              <p className="text-xs text-accent mt-1">20% chance</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Transaction Loader - only for loading and error states */}
      <TransactionLoader
        isOpen={transactionState.isOpen}
        onClose={closeAllModals}
        type={transactionState.type}
        title={transactionState.title}
        message={transactionState.message}
      />

      {showSuccessDetails && transactionState.mintedItem && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 bg-card border-2 border-primary/50 animate-scale-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4 animate-neon-pulse">
                {transactionState.mintedItem.type === "worker" ? (
                  <Users className="w-10 h-10 text-primary" />
                ) : (
                  <Rocket className="w-10 h-10 text-primary" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">¡Felicidades!</h3>
              <p className="text-muted-foreground mb-6">Has minteado exitosamente:</p>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-6 mb-6">
                <p className="text-xl font-bold text-primary mb-2">{transactionState.mintedItem.name}</p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Badge className={`${rarityColors[transactionState.mintedItem.rarity]} border text-sm px-3 py-1`}>
                    {rarityLabels[transactionState.mintedItem.rarity]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {tierNames[transactionState.mintedItem.tier - 1]} - Nivel {transactionState.mintedItem.tier}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-accent">{transactionState.mintedItem.power}</span>
                  <span className="text-sm text-muted-foreground">
                    {transactionState.mintedItem.type === "worker" ? "Poder" : "Capacidad"}
                  </span>
                </div>
              </div>

              <Button onClick={closeAllModals} className="w-full bg-primary hover:bg-primary/80">
                Continuar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
