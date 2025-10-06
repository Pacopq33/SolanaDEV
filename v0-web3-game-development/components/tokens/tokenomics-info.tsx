"use client"

import { Card } from "@/components/ui/card"
import { Coins, Users, Lock, TrendingUp } from "lucide-react"

export function TokenomicsInfo() {
  const tokenomics = [
    {
      icon: Coins,
      title: "$GXY - Governance Token",
      description: "Used for governance, staking, and premium features",
      supply: "100,000,000",
      color: "cyan",
    },
    {
      icon: TrendingUp,
      title: "$DST - Utility Token",
      description: "Earned from expeditions, used for in-game transactions",
      supply: "Unlimited",
      color: "green",
    },
    {
      icon: Lock,
      title: "Staking Rewards",
      description: "Stake $GXY to earn passive rewards and governance rights",
      supply: "15-25% APY",
      color: "purple",
    },
    {
      icon: Users,
      title: "Play-to-Earn",
      description: "Complete expeditions to earn $DST tokens",
      supply: "Variable",
      color: "orange",
    },
  ]

  return (
    <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
      <h3 className="text-2xl font-bold mb-6 glow-cyan">Tokenomics Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tokenomics.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              className="p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/20 transition-all"
            >
              <div className={`inline-flex p-3 rounded-lg bg-${item.color}-500/20 mb-3`}>
                <Icon className={`w-6 h-6 text-${item.color}-400`} />
              </div>
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
              <div className="pt-3 border-t border-primary/10">
                <p className="text-xs text-muted-foreground">Supply</p>
                <p className="font-bold text-primary">{item.supply}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
        <h4 className="font-bold mb-2">Token Distribution</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Play-to-Earn</p>
            <p className="font-bold text-cyan-400">40%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Staking Rewards</p>
            <p className="font-bold text-purple-400">25%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Team & Development</p>
            <p className="font-bold text-orange-400">20%</p>
          </div>
          <div>
            <p className="text-muted-foreground">Liquidity</p>
            <p className="font-bold text-green-400">15%</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
