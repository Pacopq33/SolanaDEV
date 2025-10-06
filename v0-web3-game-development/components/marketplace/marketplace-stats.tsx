"use client"

import { TrendingUp, ShoppingBag, Users, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MarketplaceStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-primary/30 bg-card/50 backdrop-blur border-glow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">TOTAL VOLUME</CardTitle>
          <DollarSign className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary glow-cyan">2,847 SOL</div>
          <p className="text-xs text-muted-foreground mt-2">+18% from last week</p>
        </CardContent>
      </Card>

      <Card className="border-secondary/30 bg-card/50 backdrop-blur border-glow-magenta">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">LISTINGS</CardTitle>
          <ShoppingBag className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary glow-magenta">1,234</div>
          <p className="text-xs text-muted-foreground mt-2">Active listings</p>
        </CardContent>
      </Card>

      <Card className="border-accent/30 bg-card/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">FLOOR PRICE</CardTitle>
          <TrendingUp className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent glow-green">0.85 SOL</div>
          <p className="text-xs text-muted-foreground mt-2">Common ships</p>
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-card/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">TRADERS</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">892</div>
          <p className="text-xs text-muted-foreground mt-2">Active in 24h</p>
        </CardContent>
      </Card>
    </div>
  )
}
