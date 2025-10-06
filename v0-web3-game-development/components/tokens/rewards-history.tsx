"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, Clock } from "lucide-react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useMockRewards } from "@/hooks/use-mock-rewards"

export function RewardsHistory() {
  const { connected } = useWallet()
  const { rewards } = useMockRewards()

  if (!connected) {
    return (
      <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-4 glow-green">Rewards History</h3>
        <p className="text-muted-foreground text-center py-8">Connect wallet to view rewards</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-4 glow-green">Rewards History</h3>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-3">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    reward.type === "expedition"
                      ? "bg-cyan-500/20"
                      : reward.type === "staking"
                        ? "bg-purple-500/20"
                        : "bg-green-500/20"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium capitalize">{reward.type} Reward</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {reward.timestamp}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-400">+{reward.amount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{reward.token}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
