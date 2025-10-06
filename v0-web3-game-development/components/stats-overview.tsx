"use client"

import { Fuel, Shield, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { WalletBalance } from "@/components/wallet-balance"
import { useI18n } from "@/lib/i18n/context"

export function StatsOverview() {
  const { t } = useI18n()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-primary/30 bg-card/50 backdrop-blur border-glow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t.home.stats.miningPower.toUpperCase()}
          </CardTitle>
          <Zap className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary glow-cyan">1,247 MP</div>
          <Progress value={65} className="mt-2 h-2" />
          <p className="text-xs text-muted-foreground mt-2">{t.home.stats.miningChange}</p>
        </CardContent>
      </Card>

      <WalletBalance />

      <Card className="border-accent/30 bg-card/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t.home.stats.fuelReserves.toUpperCase()}
          </CardTitle>
          <Fuel className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent glow-green">78%</div>
          <Progress value={78} className="mt-2 h-2" />
          <p className="text-xs text-muted-foreground mt-2">{t.home.stats.fuelHint}</p>
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-card/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t.home.stats.fleetStatus.toUpperCase()}
          </CardTitle>
          <Shield className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">5/8 ACTIVE</div>
          <Progress value={62} className="mt-2 h-2" />
          <p className="text-xs text-muted-foreground mt-2">{t.home.stats.fleetHint}</p>
        </CardContent>
      </Card>
    </div>
  )
}
