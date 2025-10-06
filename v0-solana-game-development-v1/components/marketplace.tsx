"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Users, Rocket, TrendingUp, DollarSign } from "lucide-react"
import { TransactionLoader } from "@/components/transaction-loader"
import type { Miner, Ship } from "@/app/page"
import Image from "next/image"

interface MarketplaceProps {
  sworkBalance: number
  currentShipLevel: number
  ownedMiners: Miner[]
  ownedShips: Ship[]
  onBuyMiner: (miner: Omit<Miner, "id">, price: number) => boolean
  onSellMiner: (minerId: string, price: number) => void
  onSellShip: (shipId: string, price: number) => void
  onBuyShip: (level: number, price: number) => boolean
}

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

// Mineros disponibles para comprar
const availableMiners = [
  {
    name: "Miner Delta",
    level: 1,
    power: 12,
    efficiency: 86,
    status: "idle" as const,
    image: "/futuristic-robot-miner-blue.jpg",
    rarity: "common" as const,
    price: 100,
  },
  {
    name: "Miner Epsilon",
    level: 2,
    power: 20,
    efficiency: 90,
    status: "idle" as const,
    image: "/futuristic-robot-miner-purple.jpg",
    rarity: "rare" as const,
    price: 250,
  },
  {
    name: "Miner Zeta",
    level: 3,
    power: 35,
    efficiency: 93,
    status: "idle" as const,
    image: "/futuristic-robot-miner-gold.jpg",
    rarity: "epic" as const,
    price: 500,
  },
  {
    name: "Miner Omega",
    level: 5,
    power: 75,
    efficiency: 98,
    status: "idle" as const,
    image: "/futuristic-robot-miner-gold.jpg",
    rarity: "legendary" as const,
    price: 1200,
  },
]

// Naves disponibles para comprar
const availableShips = [
  { level: 2, price: 300, name: "Nave Clase B", description: "Desbloquea mundos Tier 2", capacity: 100 },
  { level: 3, price: 600, name: "Nave Clase A", description: "Desbloquea mundos Tier 3", capacity: 200 },
  { level: 4, price: 1000, name: "Nave Clase S", description: "Desbloquea mundos Tier 4", capacity: 300 },
  { level: 5, price: 1500, name: "Nave Clase X", description: "Desbloquea mundos Tier 5", capacity: 400 },
]

export function Marketplace({
  sworkBalance,
  currentShipLevel,
  ownedMiners,
  ownedShips,
  onBuyMiner,
  onSellMiner,
  onSellShip,
  onBuyShip,
}: MarketplaceProps) {
  const [selectedTab, setSelectedTab] = useState("buy-miners")
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

  const handleBuyMiner = async (miner: (typeof availableMiners)[0]) => {
    setTransactionState({
      isOpen: true,
      type: "loading",
      title: "Procesando compra",
      message: "Adquiriendo minero...",
    })

    // Simular delay de transacción
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const success = onBuyMiner(miner, miner.price)

    setTransactionState({
      isOpen: true,
      type: success ? "success" : "error",
      title: success ? "¡Compra exitosa!" : "Compra fallida",
      message: success ? `Has adquirido ${miner.name}` : "No tienes suficiente SWORK",
      amount: success ? miner.price : undefined,
      currency: success ? "SWORK" : undefined,
    })
  }

  const handleSellMiner = async (miner: Miner) => {
    const sellPrice = Math.floor(miner.level * 50 + miner.power * 2)
    if (!confirm(`¿Vender ${miner.name} por ${sellPrice} SWORK?`)) return

    setTransactionState({
      isOpen: true,
      type: "loading",
      title: "Procesando venta",
      message: "Vendiendo minero...",
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    onSellMiner(miner.id, sellPrice)

    setTransactionState({
      isOpen: true,
      type: "success",
      title: "¡Venta exitosa!",
      message: `Has vendido ${miner.name}`,
      amount: sellPrice,
      currency: "SWORK",
    })
  }

  const handleBuyShip = async (ship: (typeof availableShips)[0]) => {
    setTransactionState({
      isOpen: true,
      type: "loading",
      title: "Procesando compra",
      message: "Adquiriendo nave...",
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const success = onBuyShip(ship.level, ship.price)

    setTransactionState({
      isOpen: true,
      type: success ? "success" : "error",
      title: success ? "¡Compra exitosa!" : "Compra fallida",
      message: success ? `Has adquirido ${ship.name}` : "No tienes suficiente SWORK o ya tienes este nivel",
      amount: success ? ship.price : undefined,
      currency: success ? "SWORK" : undefined,
    })
  }

  const handleSellShip = async (ship: Ship) => {
    const sellPrice = Math.floor(ship.level * 100 + ship.capacity * 20)
    if (!confirm(`¿Vender ${ship.name} por ${sellPrice} SWORK?`)) return

    setTransactionState({
      isOpen: true,
      type: "loading",
      title: "Procesando venta",
      message: "Vendiendo nave...",
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    onSellShip(ship.id, sellPrice)

    setTransactionState({
      isOpen: true,
      type: "success",
      title: "¡Venta exitosa!",
      message: `Has vendido ${ship.name}`,
      amount: sellPrice,
      currency: "SWORK",
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

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Marketplace</h2>
        <p className="text-muted-foreground">Compra y vende trabajadores y naves</p>
        <div className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-accent/20 border border-accent/30 rounded-lg">
          <DollarSign className="w-5 h-5 text-accent" />
          <span className="text-lg font-bold text-foreground">{sworkBalance} SWORK</span>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 bg-card border border-border">
          <TabsTrigger value="buy-miners" className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            Comprar Mineros
          </TabsTrigger>
          <TabsTrigger value="sell-miners" className="gap-2">
            <Users className="w-4 h-4" />
            Vender Mineros
          </TabsTrigger>
          <TabsTrigger value="sell-ships" className="gap-2">
            <Rocket className="w-4 h-4" />
            Vender Naves
          </TabsTrigger>
          <TabsTrigger value="buy-ships" className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            Comprar Naves
          </TabsTrigger>
        </TabsList>

        <TabsContent value="buy-miners" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableMiners.map((miner, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="relative h-48 bg-muted/50 overflow-hidden">
                  <Image src={miner.image || "/placeholder.svg"} alt={miner.name} fill className="object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge className={`${rarityColors[miner.rarity]} border`}>{rarityLabels[miner.rarity]}</Badge>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{miner.name}</h3>
                      <p className="text-sm text-muted-foreground">Nivel {miner.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{miner.power}</p>
                      <p className="text-xs text-muted-foreground">Poder</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Eficiencia</span>
                      <span className="font-semibold text-foreground">{miner.efficiency}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 p-3 bg-accent/10 rounded-lg">
                    <span className="text-sm font-semibold text-foreground">Precio:</span>
                    <span className="text-lg font-bold text-accent">{miner.price} SWORK</span>
                  </div>

                  <Button
                    onClick={() => handleBuyMiner(miner)}
                    disabled={sworkBalance < miner.price}
                    className="w-full gap-2 bg-primary hover:bg-primary/80"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Comprar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sell-miners" className="mt-8">
          {ownedMiners.length === 0 ? (
            <Card className="p-12 text-center bg-card border-border">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No tienes mineros</h3>
              <p className="text-muted-foreground">Compra mineros en la pestaña de compra</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownedMiners.map((miner) => {
                const sellPrice = Math.floor(miner.level * 50 + miner.power * 2)
                return (
                  <Card
                    key={miner.id}
                    className="overflow-hidden bg-card border-border hover:border-secondary/50 transition-all duration-300"
                  >
                    <div className="relative h-48 bg-muted/50 overflow-hidden">
                      <Image src={miner.image || "/placeholder.svg"} alt={miner.name} fill className="object-cover" />
                      <div className="absolute top-3 right-3">
                        <Badge className={`${rarityColors[miner.rarity]} border`}>{rarityLabels[miner.rarity]}</Badge>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg text-foreground">{miner.name}</h3>
                          <p className="text-sm text-muted-foreground">Nivel {miner.level}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{miner.power}</p>
                          <p className="text-xs text-muted-foreground">Poder</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Eficiencia</span>
                          <span className="font-semibold text-foreground">{miner.efficiency}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4 p-3 bg-secondary/10 rounded-lg">
                        <span className="text-sm font-semibold text-foreground">Precio de venta:</span>
                        <span className="text-lg font-bold text-secondary">{sellPrice} SWORK</span>
                      </div>

                      <Button
                        onClick={() => handleSellMiner(miner)}
                        variant="secondary"
                        className="w-full gap-2 bg-secondary hover:bg-secondary/80"
                      >
                        <DollarSign className="w-4 h-4" />
                        Vender
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="sell-ships" className="mt-8">
          {ownedShips.length === 0 ? (
            <Card className="p-12 text-center bg-card border-border">
              <Rocket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No tienes naves</h3>
              <p className="text-muted-foreground">Mintea o compra naves en otras pestañas</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownedShips.map((ship) => {
                const sellPrice = Math.floor(ship.level * 100 + ship.capacity * 20)
                return (
                  <Card
                    key={ship.id}
                    className="overflow-hidden bg-card border-border hover:border-secondary/50 transition-all duration-300"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-chart-4/20 to-chart-4/5 flex items-center justify-center">
                      <Rocket className="w-24 h-24 text-chart-4 opacity-50" />
                      <div className="absolute top-3 right-3">
                        <Badge className={`${rarityColors[ship.rarity]} border`}>{rarityLabels[ship.rarity]}</Badge>
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
                      </div>

                      <div className="flex items-center justify-between mb-4 p-3 bg-secondary/10 rounded-lg">
                        <span className="text-sm font-semibold text-foreground">Precio de venta:</span>
                        <span className="text-lg font-bold text-secondary">{sellPrice} SWORK</span>
                      </div>

                      <Button
                        onClick={() => handleSellShip(ship)}
                        variant="secondary"
                        className="w-full gap-2 bg-secondary hover:bg-secondary/80"
                      >
                        <DollarSign className="w-4 h-4" />
                        Vender
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="buy-ships" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {availableShips.map((ship) => {
              const isOwned = currentShipLevel >= ship.level
              const canBuy = !isOwned && currentShipLevel === ship.level - 1

              return (
                <Card
                  key={ship.level}
                  className={`p-6 bg-card border-border ${
                    isOwned ? "opacity-50" : "hover:border-chart-4/50 transition-all"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-lg bg-chart-4/20 flex items-center justify-center animate-neon-pulse">
                      <Rocket className="w-8 h-8 text-chart-4" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{ship.name}</h3>
                      <p className="text-sm text-muted-foreground">Nivel {ship.level}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{ship.description}</p>

                  <div className="flex items-center justify-between mb-4 p-3 bg-chart-4/10 rounded-lg">
                    <span className="text-sm font-semibold text-foreground">Precio:</span>
                    <span className="text-lg font-bold text-chart-4">{ship.price} SWORK</span>
                  </div>

                  {isOwned ? (
                    <Button disabled className="w-full gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Ya adquirida
                    </Button>
                  ) : canBuy ? (
                    <Button
                      onClick={() => handleBuyShip(ship)}
                      disabled={sworkBalance < ship.price}
                      className="w-full gap-2 bg-chart-4 text-chart-4-foreground hover:bg-chart-4/80"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Comprar Nave
                    </Button>
                  ) : (
                    <Button disabled className="w-full gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Requiere nivel {ship.level - 1}
                    </Button>
                  )}
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
