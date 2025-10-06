"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, Users, Coins, CheckCircle2, XCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { useTransactionModal } from "@/hooks/use-transaction-modal"
import type { Ship, Drone } from "@/lib/solana/types"

interface ShipUpgradeProps {
  ship: Ship
  availableDrones: Drone[]
  onUpgrade: (shipMint: string) => Promise<void>
}

export function ShipUpgrade({ ship, availableDrones, onUpgrade }: ShipUpgradeProps) {
  const { t } = useI18n()
  const { showModal } = useTransactionModal()
  const [isUpgrading, setIsUpgrading] = useState(false)

  const nextLevel = ship.level + 1
  const upgradeCost = ship.level * 100 // 100 DST per level
  const requiredWorkerTier = Math.ceil(ship.level / 2) // Tier increases every 2 levels

  // Check if user has enough workers of required tier
  const suitableWorkers = availableDrones.filter((drone) => {
    // Assuming drones have a tier property based on their type
    return drone.status === "Available"
  })

  const hasEnoughWorkers = suitableWorkers.length >= ship.requiredWorkersForUpgrade
  const canUpgrade = hasEnoughWorkers && ship.level < 10

  const handleUpgrade = async () => {
    if (!canUpgrade) return

    setIsUpgrading(true)
    showModal("pending", t.transaction.pending)

    try {
      await onUpgrade(ship.mint)
      showModal("success", t.upgrade.upgradeSuccess)
    } catch (error) {
      showModal("error", t.transaction.error)
    } finally {
      setIsUpgrading(false)
    }
  }

  return (
    <Card className="border-primary/30 bg-card/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <ArrowUp className="h-5 w-5" />
          {t.upgrade.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">{t.upgrade.currentLevel}</div>
            <Badge className="bg-primary/20 text-primary border-primary/50">
              {t.fleet.level} {ship.level}
            </Badge>
          </div>
          <ArrowUp className="h-6 w-6 text-muted-foreground" />
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">{t.upgrade.nextLevel}</div>
            <Badge className="bg-accent/20 text-accent border-accent/50">
              {t.fleet.level} {nextLevel}
            </Badge>
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-border/50">
          <div className="text-sm font-semibold text-foreground">{t.upgrade.requirements}</div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">{t.upgrade.requiredWorkers}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">
                {suitableWorkers.length} / {ship.requiredWorkersForUpgrade}
              </span>
              {hasEnoughWorkers ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Coins className="h-4 w-4 text-accent" />
              <span className="text-muted-foreground">{t.upgrade.cost}</span>
            </div>
            <span className="font-bold text-accent">{upgradeCost} DST</span>
          </div>
        </div>

        {!hasEnoughWorkers && (
          <div className="text-xs text-destructive bg-destructive/10 p-2 rounded border border-destructive/30">
            {t.upgrade.insufficientWorkers.replace("{tier}", requiredWorkerTier.toString())}
          </div>
        )}

        {ship.level >= 10 && (
          <div className="text-xs text-muted-foreground bg-muted/10 p-2 rounded border border-border/30">
            {t.upgrade.maxLevel}
          </div>
        )}

        <Button
          onClick={handleUpgrade}
          disabled={isUpgrading || !canUpgrade}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <ArrowUp className="mr-2 h-4 w-4" />
          {t.fleet.upgrade}
        </Button>
      </CardContent>
    </Card>
  )
}
