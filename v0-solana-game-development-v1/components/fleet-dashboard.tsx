"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Rocket, Activity, Pickaxe, Globe, Bed, Fuel, Plus, Minus } from "lucide-react"
import { TransactionLoader } from "@/components/transaction-loader"
import type { Miner } from "@/app/page"

interface FleetDashboardProps {
  miners: Miner[]
  shipLevel: number
  shipGas: number
  sworkBalance: number
  onBuyGas: (amount: number) => boolean
}

export function FleetDashboard({ miners, shipLevel, shipGas, sworkBalance, onBuyGas }: FleetDashboardProps) {
  const [gasAmount, setGasAmount] = useState(10)
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

  const totalMiners = miners.length
  const availableMiners = miners.filter((m) => m.status === "idle").length
  const miningMiners = miners.filter((m) => m.status === "mining").length
  const exploringMiners = miners.filter((m) => m.status === "exploring").length
  const restingMiners = miners.filter((m) => m.status === "resting").length

  const totalShips = 1
  const availableShips = exploringMiners > 0 ? 0 : 1
  const shipsInUse = exploringMiners > 0 ? 1 : 0

  const gasCost = gasAmount * 2

  const handleBuyGas = async () => {
    setTransactionState({
      isOpen: true,
      type: "loading",
      title: "Procesando compra",
      message: "Cargando combustible...",
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const success = onBuyGas(gasAmount)

    if (success) {
      setTransactionState({
        isOpen: true,
        type: "success",
        title: "¡Recarga exitosa!",
        message: `Has cargado ${gasAmount} unidades de gas`,
        amount: gasAmount,
        currency: "GAS",
      })
      setGasAmount(10)
    } else {
      setTransactionState({
        isOpen: true,
        type: "error",
        title: "Recarga fallida",
        message: "No tienes suficiente SWORK",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "mining":
        return "bg-primary/20 text-primary border-primary/30"
      case "exploring":
        return "bg-accent/20 text-accent border-accent/30"
      case "resting":
        return "bg-secondary/20 text-secondary border-secondary/30"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "mining":
        return <Pickaxe className="w-3 h-3" />
      case "exploring":
        return <Globe className="w-3 h-3" />
      case "resting":
        return <Bed className="w-3 h-3" />
      default:
        return <Activity className="w-3 h-3" />
    }
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
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard de Flota</h2>
        <p className="text-muted-foreground">Gestiona tus naves y trabajadores en tiempo real</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Ships Card */}
        <Card className="p-6 bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-lg bg-chart-4/20 flex items-center justify-center animate-neon-pulse">
              <Rocket className="w-7 h-7 text-chart-4" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Naves Espaciales</h3>
              <p className="text-sm text-muted-foreground">Nivel {shipLevel}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Total de Naves</span>
              <span className="text-lg font-bold text-foreground">{totalShips}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Naves Disponibles</span>
              <span className="text-lg font-bold text-accent">{availableShips}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Naves en Uso</span>
              <span className="text-lg font-bold text-primary">{shipsInUse}</span>
            </div>
          </div>
        </Card>

        {/* Workers Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center animate-neon-pulse">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Trabajadores</h3>
              <p className="text-sm text-muted-foreground">Mineros NFT</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Total de Trabajadores</span>
              <span className="text-lg font-bold text-foreground">{totalMiners}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Disponibles</span>
              <span className="text-lg font-bold text-accent">{availableMiners}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-sm text-muted-foreground">En Uso</span>
              <span className="text-lg font-bold text-primary">{miningMiners + exploringMiners}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center animate-neon-pulse">
            <Fuel className="w-7 h-7 text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Estación de Combustible</h3>
            <p className="text-sm text-muted-foreground">Gas actual: {shipGas} unidades</p>
          </div>
        </div>

        <div className="bg-background/50 rounded-lg p-4">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGasAmount(Math.max(1, gasAmount - 10))}
              className="border-accent/30 hover:bg-accent/10"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <Input
                type="number"
                value={gasAmount}
                onChange={(e) => setGasAmount(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="text-center text-lg font-bold bg-background border-accent/30"
                min="1"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGasAmount(gasAmount + 10)}
              className="border-accent/30 hover:bg-accent/10"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Costo total:</span>
            <span className="text-lg font-bold text-accent">{gasCost} SWORK</span>
          </div>

          <Button
            onClick={handleBuyGas}
            disabled={sworkBalance < gasCost}
            className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/80"
          >
            <Fuel className="w-4 h-4" />
            Comprar {gasAmount} Gas
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-3">Precio: 2 SWORK por unidad de gas</p>
        </div>
      </Card>

      {/* Detailed Workers List */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-primary" />
          <div>
            <h3 className="text-xl font-bold text-foreground">Estado de Trabajadores</h3>
            <p className="text-sm text-muted-foreground">Actividad actual de cada minero</p>
          </div>
        </div>

        <div className="space-y-3">
          {miners.map((miner) => (
            <div
              key={miner.id}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{miner.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Nivel {miner.level} • Poder: {miner.power}
                  </p>
                </div>
              </div>

              <Badge className={`gap-1.5 ${getStatusColor(miner.status)}`}>
                {getStatusIcon(miner.status)}
                {miner.status === "idle" && "Disponible"}
                {miner.status === "mining" && "Minando"}
                {miner.status === "exploring" && "Explorando"}
                {miner.status === "resting" && "Descansando"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Card className="p-4 bg-muted/30 border-border text-center">
          <Activity className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{availableMiners}</p>
          <p className="text-xs text-muted-foreground">Disponibles</p>
        </Card>

        <Card className="p-4 bg-primary/10 border-primary/30 text-center">
          <Pickaxe className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-primary">{miningMiners}</p>
          <p className="text-xs text-muted-foreground">Minando</p>
        </Card>

        <Card className="p-4 bg-accent/10 border-accent/30 text-center">
          <Globe className="w-6 h-6 text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold text-accent">{exploringMiners}</p>
          <p className="text-xs text-muted-foreground">Explorando</p>
        </Card>

        <Card className="p-4 bg-secondary/10 border-secondary/30 text-center">
          <Bed className="w-6 h-6 text-secondary mx-auto mb-2" />
          <p className="text-2xl font-bold text-secondary">{restingMiners}</p>
          <p className="text-xs text-muted-foreground">Descansando</p>
        </Card>
      </div>
    </div>
  )
}
