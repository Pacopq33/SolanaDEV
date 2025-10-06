"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface StatsPanelProps {
  solBalance: number
  crystalBalance: number
  sworkBalance: number
  shipGas: number
  totalMiningPower: number
  activeMiners: number
  shipLevel: number
  onAddSwork?: () => void
}

export function StatsPanel({
  solBalance,
  crystalBalance,
  sworkBalance,
  shipGas,
  totalMiningPower,
  activeMiners,
  shipLevel,
  onAddSwork,
}: StatsPanelProps) {
  return (
    <div className="space-y-4">
      {onAddSwork && (
        <div className="flex justify-end">
          <Button
            onClick={onAddSwork}
            variant="outline"
            size="sm"
            className="gap-2 border-chart-5/50 bg-chart-5/10 hover:bg-chart-5/20 text-chart-5"
          >
            <Plus className="w-4 h-4" />
            Agregar 1000 SWORK (Dev)
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        <Card className="p-4 lg:p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 hover:border-primary/50 transition-all">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-primary" />
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">SOL</p>
              <p className="text-lg lg:text-2xl font-bold text-primary">{solBalance.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30 hover:border-secondary/50 transition-all">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
              <div className="w-3 h-3 rotate-45 bg-secondary" />
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Cristales</p>
              <p className="text-lg lg:text-2xl font-bold text-secondary">{crystalBalance.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6 bg-gradient-to-br from-chart-5/10 to-chart-5/5 border-chart-5/30 hover:border-chart-5/50 transition-all">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-chart-5/20 flex items-center justify-center">
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-chart-5 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-chart-5 animate-pulse delay-75 ml-0.5" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">SWORK</p>
              <p className="text-lg lg:text-2xl font-bold text-chart-5">{sworkBalance.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30 hover:border-accent/50 transition-all">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <div className="w-2 h-4 bg-accent rounded-sm" />
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Gas</p>
              <p className="text-lg lg:text-2xl font-bold text-accent">{shipGas}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6 bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/30 hover:border-chart-3/50 transition-all">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-chart-3/20 flex items-center justify-center">
              <div className="relative w-4 h-4">
                <div className="absolute inset-0 border-2 border-chart-3 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Poder</p>
              <p className="text-lg lg:text-2xl font-bold text-chart-3">{totalMiningPower}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6 bg-gradient-to-br from-muted/50 to-muted/20 border-border hover:border-primary/30 transition-all">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <div className="flex gap-0.5">
                <div className="w-1.5 h-3 bg-foreground rounded-sm" />
                <div className="w-1.5 h-4 bg-foreground rounded-sm" />
                <div className="w-1.5 h-3 bg-foreground rounded-sm" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Activos</p>
              <p className="text-lg lg:text-2xl font-bold text-foreground">{activeMiners}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6 bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/30 hover:border-chart-4/50 transition-all">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-chart-4/20 flex items-center justify-center">
              <div className="relative w-4 h-4">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-chart-4" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Nave</p>
              <p className="text-lg lg:text-2xl font-bold text-chart-4">{shipLevel} / 5</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
