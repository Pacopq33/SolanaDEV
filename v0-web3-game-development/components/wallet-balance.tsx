"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useEffect, useState } from "react"
import { Coins, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WalletBalance() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!publicKey) {
      setBalance(null)
      return
    }

    const getBalance = async () => {
      setLoading(true)
      try {
        const bal = await connection.getBalance(publicKey)
        setBalance(bal / LAMPORTS_PER_SOL)
      } catch (error) {
        console.error("Error fetching balance:", error)
      } finally {
        setLoading(false)
      }
    }

    getBalance()

    // Refresh balance every 10 seconds
    const interval = setInterval(getBalance, 10000)
    return () => clearInterval(interval)
  }, [publicKey, connection])

  if (!publicKey) {
    return (
      <Card className="border-primary/30 bg-card/50 backdrop-blur border-glow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">WALLET</CardTitle>
          <Coins className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-muted-foreground">Not Connected</div>
          <p className="text-xs text-muted-foreground mt-2">Connect your wallet to start</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/30 bg-card/50 backdrop-blur border-glow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">SOL BALANCE</CardTitle>
        <Coins className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold text-primary glow-cyan">{balance?.toFixed(4) ?? "0.0000"} SOL</div>
            <p className="text-xs text-muted-foreground mt-2 font-mono">{publicKey.toBase58().slice(0, 20)}...</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
