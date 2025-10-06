"use client"

import { Card } from "@/components/ui/card"
import { Coins, TrendingUp, Wallet } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useMockTokenBalances } from "@/hooks/use-mock-token-balances"

export function TokenBalances() {
  const { connected } = useWallet()
  const { gxyBalance, dstBalance, gxyPrice, dstPrice } = useMockTokenBalances()

  if (!connected) {
    return (
      <Card className="p-8 text-center border-primary/20 bg-card/50 backdrop-blur-sm">
        <Wallet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Connect your wallet to view token balances</p>
      </Card>
    )
  }

  const totalValue = gxyBalance * gxyPrice + dstBalance * dstPrice

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 border-primary/20 bg-gradient-to-br from-cyan-500/10 to-transparent backdrop-blur-sm hover:border-primary/40 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-muted-foreground">$GXY Token</span>
          </div>
          <span className="text-xs text-cyan-400">${gxyPrice.toFixed(4)}</span>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold glow-cyan">{gxyBalance.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">${(gxyBalance * gxyPrice).toFixed(2)} USD</p>
        </div>
      </Card>

      <Card className="p-6 border-primary/20 bg-gradient-to-br from-green-500/10 to-transparent backdrop-blur-sm hover:border-primary/40 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-muted-foreground">$DST Token</span>
          </div>
          <span className="text-xs text-green-400">${dstPrice.toFixed(4)}</span>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold glow-green">{dstBalance.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">${(dstBalance * dstPrice).toFixed(2)} USD</p>
        </div>
      </Card>

      <Card className="p-6 border-primary/20 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-sm hover:border-primary/40 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-muted-foreground">Total Value</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold glow-purple">${totalValue.toFixed(2)}</p>
          <p className="text-sm text-green-400">+12.5% (24h)</p>
        </div>
      </Card>
    </div>
  )
}
