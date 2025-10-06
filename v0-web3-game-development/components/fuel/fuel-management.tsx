"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Fuel, Zap, TrendingUp } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { useTransactionModal } from "@/hooks/use-transaction-modal"
import type { Ship } from "@/lib/solana/types"

interface FuelManagementProps {
  ship: Ship
  onRefuel: (shipMint: string) => Promise<void>
}

export function FuelManagement({ ship, onRefuel }: FuelManagementProps) {
  const { t } = useI18n()
  const { showModal } = useTransactionModal()
  const [isRefueling, setIsRefueling] = useState(false)

  const fuelPercent = (ship.fuel / ship.maxFuel) * 100
  const refuelCost = ((ship.maxFuel - ship.fuel) * 0.001).toFixed(3) // 0.001 SOL per fuel unit

  const handleRefuel = async () => {
    setIsRefueling(true)
    showModal("pending", t.transaction.pending)

    try {
      await onRefuel(ship.mint)
      showModal("success", t.fuel.refuelSuccess)
    } catch (error) {
      showModal("error", t.transaction.error)
    } finally {
      setIsRefueling(false)
    }
  }

  return (
    <Card className="border-secondary/30 bg-card/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-secondary">
          <Fuel className="h-5 w-5" />
          {t.fuel.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t.fuel.current}</span>
            <span className="font-bold text-secondary">
              {ship.fuel} / {ship.maxFuel}
            </span>
          </div>
          <Progress value={fuelPercent} className="h-3" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              {t.fuel.consumptionRate}
            </div>
            <div className="font-bold text-primary">{ship.fuelConsumptionRate}/h</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Zap className="h-3 w-3" />
              {t.fuel.cost}
            </div>
            <div className="font-bold text-accent">{refuelCost} SOL</div>
          </div>
        </div>

        <Button
          onClick={handleRefuel}
          disabled={isRefueling || ship.fuel === ship.maxFuel}
          className="w-full bg-secondary hover:bg-secondary/90"
        >
          <Fuel className="mr-2 h-4 w-4" />
          {t.fleet.refuel}
        </Button>
      </CardContent>
    </Card>
  )
}
