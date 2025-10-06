"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Rocket, Cpu, Loader2 } from "lucide-react"
import { SHIP_RARITIES, DRONE_TYPES } from "@/lib/solana/constants"
import { TransactionModal } from "@/components/ui/transaction-modal"
import { useTransactionModal } from "@/hooks/use-transaction-modal"
import { useI18n } from "@/lib/i18n/context"

export function MintSection() {
  const { connected } = useWallet()
  const transactionModal = useTransactionModal()
  const [mintingShip, setMintingShip] = useState(false)
  const [mintingDrone, setMintingDrone] = useState(false)
  const [selectedRarity, setSelectedRarity] = useState<string>("Common")
  const [selectedDroneType, setSelectedDroneType] = useState<string>("Mining")
  const { t } = useI18n()
  const rarityTranslations = t.fleet.rarity as Record<string, string>

  const handleMintShip = async () => {
    const rarityLabel = rarityTranslations[selectedRarity.toLowerCase()] ?? selectedRarity

    if (!connected) {
      transactionModal.showError(
        t.fleet.mintSection.walletErrorTitle,
        t.fleet.mintSection.walletErrorDescription,
      )
      return
    }

    setMintingShip(true)
    transactionModal.showPending(
      t.fleet.mintSection.pendingTitle,
      t.fleet.mintSection.pendingDescription.replace("{rarity}", rarityLabel),
    )

    // Simulate minting process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Simulate success with mock transaction signature
    const mockTxSignature = `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`

    transactionModal.showSuccess(
      t.fleet.mintSection.successTitle,
      t.fleet.mintSection.successDescription.replace("{rarity}", rarityLabel),
      mockTxSignature,
    )
    setMintingShip(false)
  }

  const handleMintDrone = async () => {
    if (!connected) {
      transactionModal.showError(
        t.fleet.mintSection.walletErrorTitle,
        t.fleet.mintSection.walletErrorDescription,
      )
      return
    }

    setMintingDrone(true)
    transactionModal.showPending(
      t.fleet.mintSection.dronePendingTitle,
      t.fleet.mintSection.dronePendingDescription.replace("{type}", selectedDroneType),
    )

    // Simulate minting process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Simulate success with mock transaction signature
    const mockTxSignature = `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`

    transactionModal.showSuccess(
      t.fleet.mintSection.droneSuccessTitle,
      t.fleet.mintSection.droneSuccessDescription.replace("{type}", selectedDroneType),
      mockTxSignature,
    )
    setMintingDrone(false)
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/30 bg-card/30 backdrop-blur hologram hover:border-primary/50 transition-all">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/20 border border-primary/50 border-glow">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-primary glow-cyan">{t.fleet.mintSection.shipTitle.toUpperCase()}</CardTitle>
                <CardDescription>{t.fleet.mintSection.shipDescription}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.fleet.mintSection.rarityLabel}</label>
              <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                <SelectTrigger className="bg-background/50 border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SHIP_RARITIES.map((rarity) => (
                    <SelectItem key={rarity} value={rarity}>
                      {rarityTranslations[rarity.toLowerCase()] ?? rarity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-background/30 border border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.fleet.mintSection.costLabel}</span>
                <span className="font-bold text-primary">0.5 SOL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.fleet.mintSection.gxyRequired}</span>
                <span className="font-bold text-accent">100 $GXY</span>
              </div>
            </div>

            <Button
              onClick={handleMintShip}
              disabled={!connected || mintingShip}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-glow font-bold pulse-glow"
            >
              {mintingShip ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.fleet.mintSection.minting}
                </>
              ) : (
                t.fleet.mintSection.mintShipCta.toUpperCase()
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-secondary/30 bg-card/30 backdrop-blur hologram hover:border-secondary/50 transition-all">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-secondary/20 border border-secondary/50 border-glow-magenta">
                <Cpu className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <CardTitle className="text-secondary glow-magenta">{t.fleet.mintSection.droneTitle.toUpperCase()}</CardTitle>
                <CardDescription>{t.fleet.mintSection.droneDescription}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t.fleet.mintSection.typeLabel}</label>
              <Select value={selectedDroneType} onValueChange={setSelectedDroneType}>
                <SelectTrigger className="bg-background/50 border-secondary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DRONE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type} Drone
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-background/30 border border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.fleet.mintSection.costLabel}</span>
                <span className="font-bold text-secondary">0.2 SOL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.fleet.mintSection.gxyRequired}</span>
                <span className="font-bold text-accent">50 $GXY</span>
              </div>
            </div>

            <Button
              onClick={handleMintDrone}
              disabled={!connected || mintingDrone}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 border-glow-magenta font-bold pulse-glow"
            >
              {mintingDrone ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.fleet.mintSection.minting}
                </>
              ) : (
                t.fleet.mintSection.mintDroneCta.toUpperCase()
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
