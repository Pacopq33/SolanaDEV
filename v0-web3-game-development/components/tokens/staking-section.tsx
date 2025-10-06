"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Unlock } from "lucide-react"
import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useMockStaking } from "@/hooks/use-mock-staking"

export function StakingSection() {
  const { connected } = useWallet()
  const { stakedAmount, pendingRewards, apy } = useMockStaking()
  const [stakeAmount, setStakeAmount] = useState("")
  const [isStaking, setIsStaking] = useState(false)

  const handleStake = async () => {
    if (!stakeAmount || Number.parseFloat(stakeAmount) <= 0) return
    setIsStaking(true)
    // Simulate staking transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsStaking(false)
    setStakeAmount("")
  }

  const handleUnstake = async () => {
    setIsStaking(true)
    // Simulate unstaking transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsStaking(false)
  }

  if (!connected) {
    return (
      <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-4 glow-cyan">$GXY Staking</h3>
        <p className="text-muted-foreground text-center py-8">Connect wallet to stake tokens</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-4 glow-cyan">$GXY Staking</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center p-4 rounded-lg bg-primary/5 border border-primary/10">
          <span className="text-sm text-muted-foreground">Staked Amount</span>
          <span className="font-bold text-cyan-400">{stakedAmount.toLocaleString()} $GXY</span>
        </div>

        <div className="flex justify-between items-center p-4 rounded-lg bg-primary/5 border border-primary/10">
          <span className="text-sm text-muted-foreground">Pending Rewards</span>
          <span className="font-bold text-green-400">{pendingRewards.toFixed(2)} $GXY</span>
        </div>

        <div className="flex justify-between items-center p-4 rounded-lg bg-primary/5 border border-primary/10">
          <span className="text-sm text-muted-foreground">APY</span>
          <span className="font-bold text-purple-400">{apy}%</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Amount to stake"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="flex-1 bg-background/50 border-primary/20"
          />
          <Button
            onClick={handleStake}
            disabled={isStaking || !stakeAmount}
            className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50"
          >
            <Lock className="w-4 h-4 mr-2" />
            Stake
          </Button>
        </div>

        <Button
          onClick={handleUnstake}
          disabled={isStaking || stakedAmount === 0}
          variant="outline"
          className="w-full border-primary/20 hover:bg-primary/10 bg-transparent"
        >
          <Unlock className="w-4 h-4 mr-2" />
          Unstake All
        </Button>
      </div>
    </Card>
  )
}
