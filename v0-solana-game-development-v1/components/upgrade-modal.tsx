"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Gem } from "lucide-react"
import { TransactionLoader } from "@/components/transaction-loader"
import type { Miner } from "@/app/page"
import Image from "next/image"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  miner: Miner | null
  crystalBalance: number
  onConfirm: () => void
}

export function UpgradeModal({ isOpen, onClose, miner, crystalBalance, onConfirm }: UpgradeModalProps) {
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

  if (!miner) return null

  const upgradeCost = miner.level * 100
  const canAfford = crystalBalance >= upgradeCost
  const newPower = Math.floor(miner.power * 1.5)
  const newEfficiency = Math.min(99, miner.efficiency + 1)

  const handleUpgrade = async () => {
    setTransactionState({
      isOpen: true,
      type: "loading",
      title: "Mejorando minero",
      message: "Aplicando mejoras...",
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    onConfirm()
    onClose()

    setTransactionState({
      isOpen: true,
      type: "success",
      title: "¡Mejora exitosa!",
      message: `${miner.name} ha sido mejorado`,
      amount: upgradeCost,
      currency: "CRISTALES",
    })
  }

  return (
    <>
      <TransactionLoader
        isOpen={transactionState.isOpen}
        onClose={() => setTransactionState({ ...transactionState, isOpen: false })}
        type={transactionState.type}
        title={transactionState.title}
        message={transactionState.message}
        amount={transactionState.amount}
        currency={transactionState.currency}
      />

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-foreground">Mejorar Minero</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Mejora tu minero para aumentar su poder y eficiencia
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Miner Preview */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-primary/30">
                <Image src={miner.image || "/placeholder.svg"} alt={miner.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{miner.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs border-muted">
                    Nivel {miner.level}
                  </Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge className="text-xs bg-primary/20 text-primary border border-primary/50">
                    Nivel {miner.level + 1}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Stats Comparison */}
            <div className="space-y-3 bg-muted/30 rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Poder</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{miner.power}</span>
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-accent">{newPower}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-muted-foreground">Eficiencia</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{miner.efficiency}%</span>
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-accent">{newEfficiency}%</span>
                </div>
              </div>
            </div>

            {/* Cost */}
            <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg border border-secondary/30">
              <div className="flex items-center gap-2">
                <Gem className="w-5 h-5 text-secondary" />
                <span className="font-semibold text-foreground">Costo de Mejora</span>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-secondary">{upgradeCost}</p>
                <p className="text-xs text-muted-foreground">Balance: {crystalBalance}</p>
              </div>
            </div>

            {!canAfford && (
              <p className="text-sm text-destructive text-center">No tienes suficientes cristales para esta mejora</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} className="border-border bg-transparent">
              Cancelar
            </Button>
            <Button onClick={handleUpgrade} disabled={!canAfford} className="gap-2 bg-primary hover:bg-primary/80">
              <TrendingUp className="w-4 h-4" />
              Mejorar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
