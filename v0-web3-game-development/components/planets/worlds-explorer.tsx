"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMockPlanets } from "@/hooks/use-mock-planets"
import { useI18n } from "@/lib/i18n/context"
import { TransactionModal } from "@/components/ui/transaction-modal"
import { useTransactionModal } from "@/hooks/use-transaction-modal"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { useToast } from "@/hooks/use-toast"
import { Zap, Fuel, Trophy } from "lucide-react"

export function WorldsExplorer() {
  const { planets, loading } = useMockPlanets()
  const { t } = useI18n()
  const transactionModal = useTransactionModal()
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const { toast } = useToast()
  const [simulating, setSimulating] = useState<number | null>(null)

  const featuredPlanets = planets.slice(0, 3)

  const handleSimulate = async (planetId: number, reward: number, successRate: number) => {
    if (!publicKey) {
      toast({
        title: t.home.quickActions.devnet.title,
        description: t.planets.worldsExplorer.walletRequired,
        variant: "destructive",
      })
      return
    }

    setSimulating(planetId)
    transactionModal.showPending(t.planets.worldsExplorer.pending, t.transaction.pending)

    try {
      // Ping the devnet to ensure connection is live
      await connection.getLatestBlockhash()
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const success = Math.random() <= successRate

      if (success) {
        transactionModal.showSuccess(
          t.planets.worldsExplorer.successTitle,
          t.planets.worldsExplorer.successDescription.replace("{reward}", reward.toString()),
        )
      } else {
        transactionModal.showError(t.planets.worldsExplorer.failureTitle, t.planets.worldsExplorer.failureDescription)
      }
    } catch (error) {
      console.error("World simulation error", error)
      transactionModal.showError(t.planets.worldsExplorer.failureTitle, t.transaction.error)
    } finally {
      setSimulating(null)
    }
  }

  if (loading) {
    return (
      <Card className="border-primary/30 bg-card/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-primary">{t.planets.worldsExplorer.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-32 rounded-lg border border-primary/20 bg-card/20 animate-pulse" />
          ))}
        </CardContent>
      </Card>
    )
  }

  if (featuredPlanets.length === 0) {
    return null
  }

  return (
    <>
      <TransactionModal
        isOpen={transactionModal.isOpen}
        status={transactionModal.status}
        title={transactionModal.title}
        message={transactionModal.message}
        txSignature={transactionModal.txSignature}
        onClose={transactionModal.close}
      />

      <Card className="border-primary/30 bg-card/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-primary text-2xl glow-cyan">{t.planets.worldsExplorer.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{t.planets.worldsExplorer.description}</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredPlanets.map((planet) => {
            const fuelCost = planet.tier * 12
            const successRate = Math.max(0.3, 0.85 - planet.tier * 0.1)
            const requiredShipLevel = planet.tier * 2
            const requiredCrewLevel = planet.tier * 2 - 1

            return (
              <div
                key={planet.id}
                className="relative rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-5 shadow-[0_0_30px_rgba(0,255,255,0.1)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-primary glow-cyan">{planet.name}</h3>
                    <p className="text-xs text-muted-foreground">{planet.description}</p>
                  </div>
                  <Badge className="bg-primary/20 border-primary/40 text-primary">{t.planets.tier} {planet.tier}</Badge>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Zap className="h-4 w-4 text-primary" />
                      {t.planets.worldsExplorer.winRate}
                    </span>
                    <span className="font-bold text-primary">{Math.round(successRate * 100)}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Trophy className="h-4 w-4 text-accent" />
                      {t.planets.worldsExplorer.reward}
                    </span>
                    <span className="font-bold text-accent">{planet.baseReward} $DST</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Fuel className="h-4 w-4 text-secondary" />
                      {t.planets.worldsExplorer.gasCost}
                    </span>
                    <span className="font-bold text-secondary">{fuelCost} $DST</span>
                  </div>

                  <div className="pt-3 border-t border-border/40 space-y-2 text-xs">
                    <p className="font-semibold text-muted-foreground uppercase tracking-wide">
                      {t.planets.worldsExplorer.requirements}
                    </p>
                    <p>{t.planets.worldsExplorer.requiresShipLevel.replace("{level}", requiredShipLevel.toString())}</p>
                    <p>{t.planets.worldsExplorer.requiresCrewLevel.replace("{level}", requiredCrewLevel.toString())}</p>
                  </div>
                </div>

                <Button
                  onClick={() => handleSimulate(planet.id, planet.baseReward, successRate)}
                  disabled={simulating === planet.id}
                  className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 border-glow font-bold"
                >
                  {simulating === planet.id ? t.common.loading : t.planets.worldsExplorer.explore}
                </Button>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </>
  )
}
