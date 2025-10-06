"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Rocket, TrendingUp, Zap, ArrowUp } from "lucide-react"
import { TransactionLoader } from "@/components/transaction-loader"
import type { Miner, Ship } from "@/app/page"
import Image from "next/image"

interface EvolutionStationProps {
  miners: Miner[]
  ships: Ship[]
  sworkBalance: number
  onEvolveWorker: (workerId: string, cost: number) => boolean
  onEvolveShip: (shipId: string, cost: number) => boolean
}

const rarityColors = {
  common: "bg-muted text-muted-foreground border-muted",
  rare: "bg-secondary/20 text-secondary border-secondary/50",
  epic: "bg-primary/20 text-primary border-primary/50",
  legendary: "bg-accent/20 text-accent border-accent/50",
  mythic: "bg-chart-4/20 text-chart-4 border-chart-4/50",
}

const rarityLabels = {
  common: "Común",
  rare: "Raro",
  epic: "Épico",
  legendary: "Legendario",
  mythic: "Mítico",
}

const tierNames = ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"]

const getEvolutionCost = (currentLevel: number): number => {
  return currentLevel * 200 + 100
}

const getNextRarity = (currentRarity: string): "common" | "rare" | "epic" | "legendary" | "mythic" => {
  const rarityOrder: Array<"common" | "rare" | "epic" | "legendary" | "mythic"> = [
    "common",
    "rare",
    "epic",
    "legendary",
    "mythic",
  ]
  const currentIndex = rarityOrder.indexOf(currentRarity as any)
  return rarityOrder[Math.min(currentIndex + 1, rarityOrder.length - 1)]
}

export function EvolutionStation({ miners, ships, sworkBalance, onEvolveWorker, onEvolveShip }: EvolutionStationProps) {
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

  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [evolvedDetails, setEvolvedDetails] = useState<{
    name: string
    oldLevel: number
    newLevel: number
    oldPower: number
    newPower: number
    newRarity: string
  } | null>(null)

  const handleEvolveWorker = async (worker: Miner) => {
    if (worker.level >= 5) {
      setTransactionState({
        isOpen: true,
        type: "error",
        title: "Nivel máximo alcanzado",
        message: "Este trabajador ya está en el nivel máximo",
      })
      return
    }

    const cost = getEvolutionCost(worker.level)

    setTransactionState({
      isOpen: true,
      type: "loading",
      title: "Evolucionando trabajador",
      message: "Procesando evolución...",
    })

    await new Promise((resolve) => setTimeout(resolve, 2500))

    const success = onEvolveWorker(worker.id, cost)

    if (success) {
      const newLevel = worker.level + 1
      const newPower = Math.floor(worker.power * 1.5)
      const newRarity = getNextRarity(worker.rarity)

      setEvolvedDetails({
        name: worker.name,
        oldLevel: worker.level,
        newLevel,
        oldPower: worker.power,
        newPower,
        newRarity,
      })

      setTransactionState({
        isOpen: false,
        type: "success",
        title: "",
        message: "",
      })

      setShowDetailsModal(true)
    } else {
      setTransactionState({
        isOpen: true,
        type: "error",
        title: "Evolución fallida",
        message: "No tienes suficiente SWORK",
      })
    }
  }

  const handleEvolveShip = async (ship: Ship) => {
    if (ship.level >= 5) {
      setTransactionState({
        isOpen: true,
        type: "error",
        title: "Nivel máximo alcanzado",
        message: "Esta nave ya está en el nivel máximo",
      })
      return
    }

    const cost = getEvolutionCost(ship.level)

    setTransactionState({
      isOpen: true,
      type: "loading",
      title: "Evolucionando nave",
      message: "Procesando evolución...",
    })

    await new Promise((resolve) => setTimeout(resolve, 2500))

    const success = onEvolveShip(ship.id, cost)

    if (success) {
      const newLevel = ship.level + 1
      const newCapacity = ship.capacity + 2
      const newRarity = getNextRarity(ship.rarity)

      setEvolvedDetails({
        name: ship.name,
        oldLevel: ship.level,
        newLevel,
        oldPower: ship.capacity,
        newPower: newCapacity,
        newRarity,
      })

      setTransactionState({
        isOpen: false,
        type: "success",
        title: "",
        message: "",
      })

      setShowDetailsModal(true)
    } else {
      setTransactionState({
        isOpen: true,
        type: "error",
        title: "Evolución fallida",
        message: "No tienes suficiente SWORK",
      })
    }
  }

  const closeAllModals = () => {
    setShowDetailsModal(false)
    setEvolvedDetails(null)
    setTransactionState({
      isOpen: false,
      type: "loading",
      title: "",
      message: "",
    })
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

      {showDetailsModal && evolvedDetails && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 bg-card border-2 border-primary/50 animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-neon-pulse">
                <TrendingUp className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">¡Evolución Exitosa!</h2>
              <p className="text-muted-foreground">Tu unidad ha evolucionado</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Nombre</p>
                <p className="text-lg font-bold text-foreground">{evolvedDetails.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Nivel</p>
                  <p className="text-2xl font-bold text-primary">
                    {evolvedDetails.oldLevel} → {evolvedDetails.newLevel}
                  </p>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Poder</p>
                  <p className="text-2xl font-bold text-accent">
                    {evolvedDetails.oldPower} → {evolvedDetails.newPower}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-primary/30">
                <p className="text-sm text-muted-foreground mb-2">Nueva Rareza</p>
                <Badge
                  className={`${rarityColors[evolvedDetails.newRarity as keyof typeof rarityColors]} text-lg px-4 py-1`}
                >
                  {rarityLabels[evolvedDetails.newRarity as keyof typeof rarityLabels]}
                </Badge>
              </div>
            </div>

            <Button onClick={closeAllModals} className="w-full bg-primary hover:bg-primary/80">
              Continuar
            </Button>
          </Card>
        </div>
      )}

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Estación de Evolución</h2>
        <p className="text-muted-foreground">
          Evoluciona tus trabajadores y naves para desbloquear mundos de mayor tier
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-accent/20 border border-accent/30 rounded-lg">
          <Zap className="w-5 h-5 text-accent" />
          <span className="text-lg font-bold text-foreground">{sworkBalance} SWORK</span>
        </div>
      </div>

      <Tabs defaultValue="workers" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-card border border-border">
          <TabsTrigger value="workers" className="gap-2">
            <Users className="w-4 h-4" />
            Trabajadores
          </TabsTrigger>
          <TabsTrigger value="ships" className="gap-2">
            <Rocket className="w-4 h-4" />
            Naves
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workers" className="mt-8">
          {miners.length === 0 ? (
            <Card className="p-12 text-center bg-card border-border">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No tienes trabajadores</h3>
              <p className="text-muted-foreground">Mintea o compra trabajadores para comenzar</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {miners.map((worker) => {
                const evolutionCost = getEvolutionCost(worker.level)
                const isMaxLevel = worker.level >= 5

                return (
                  <Card
                    key={worker.id}
                    className="overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="relative h-48 bg-muted/50 overflow-hidden">
                      <Image src={worker.image || "/placeholder.svg"} alt={worker.name} fill className="object-cover" />
                      <div className="absolute top-3 right-3">
                        <Badge className={`${rarityColors[worker.rarity]} border`}>{rarityLabels[worker.rarity]}</Badge>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-background/80 text-foreground border-border">
                          {tierNames[worker.level - 1]}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-foreground">{worker.name}</h3>
                          <p className="text-sm text-muted-foreground">Nivel {worker.level}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{worker.power}</p>
                          <p className="text-xs text-muted-foreground">Poder</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Eficiencia</span>
                          <span className="font-semibold text-foreground">{worker.efficiency}%</span>
                        </div>
                        {!isMaxLevel && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Siguiente nivel</span>
                            <span className="font-semibold text-accent flex items-center gap-1">
                              {Math.floor(worker.power * 1.5)} <ArrowUp className="w-3 h-3" />
                            </span>
                          </div>
                        )}
                      </div>

                      {isMaxLevel ? (
                        <Button disabled className="w-full gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Nivel Máximo
                        </Button>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-4 p-3 bg-primary/10 rounded-lg">
                            <span className="text-sm font-semibold text-foreground">Costo:</span>
                            <span className="text-lg font-bold text-primary">{evolutionCost} SWORK</span>
                          </div>

                          <Button
                            onClick={() => handleEvolveWorker(worker)}
                            disabled={sworkBalance < evolutionCost}
                            className="w-full gap-2 bg-primary hover:bg-primary/80"
                          >
                            <TrendingUp className="w-4 h-4" />
                            Evolucionar
                          </Button>
                        </>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="ships" className="mt-8">
          {ships.length === 0 ? (
            <Card className="p-12 text-center bg-card border-border">
              <Rocket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No tienes naves</h3>
              <p className="text-muted-foreground">Mintea o compra naves para comenzar</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ships.map((ship) => {
                const evolutionCost = getEvolutionCost(ship.level)
                const isMaxLevel = ship.level >= 5

                return (
                  <Card
                    key={ship.id}
                    className="overflow-hidden bg-card border-border hover:border-chart-4/50 transition-all duration-300"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-chart-4/20 to-chart-4/5 flex items-center justify-center">
                      <Rocket className="w-24 h-24 text-chart-4 opacity-50" />
                      <div className="absolute top-3 right-3">
                        <Badge className={`${rarityColors[ship.rarity]} border`}>{rarityLabels[ship.rarity]}</Badge>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-background/80 text-foreground border-border">
                          {tierNames[ship.level - 1]}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-foreground">{ship.name}</h3>
                          <p className="text-sm text-muted-foreground">Nivel {ship.level}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-chart-4">{ship.capacity}</p>
                          <p className="text-xs text-muted-foreground">Capacidad</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Mundos desbloqueados</span>
                          <span className="font-semibold text-foreground">Tier {ship.level}</span>
                        </div>
                        {!isMaxLevel && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Siguiente capacidad</span>
                            <span className="font-semibold text-accent flex items-center gap-1">
                              {ship.capacity + 2} <ArrowUp className="w-3 h-3" />
                            </span>
                          </div>
                        )}
                      </div>

                      {isMaxLevel ? (
                        <Button disabled className="w-full gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Nivel Máximo
                        </Button>
                      ) : (
                        <>
                          <div className="flex items-center justify-between mb-4 p-3 bg-chart-4/10 rounded-lg">
                            <span className="text-sm font-semibold text-foreground">Costo:</span>
                            <span className="text-lg font-bold text-chart-4">{evolutionCost} SWORK</span>
                          </div>

                          <Button
                            onClick={() => handleEvolveShip(ship)}
                            disabled={sworkBalance < evolutionCost}
                            className="w-full gap-2 bg-chart-4 text-chart-4-foreground hover:bg-chart-4/80"
                          >
                            <TrendingUp className="w-4 h-4" />
                            Evolucionar
                          </Button>
                        </>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
