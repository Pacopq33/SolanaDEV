"use client"

import { useState } from "react"
import { Rocket, ShoppingCart, Map, Wrench, Coins, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useToast } from "@/hooks/use-toast"

export function QuickActions() {
  const { t } = useI18n()
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const { toast } = useToast()
  const [airdropLoading, setAirdropLoading] = useState(false)

  const handleAirdrop = async () => {
    if (!publicKey) {
      toast({
        title: t.home.quickActions.devnet.title,
        description: t.home.quickActions.devnet.requiresWallet,
        variant: "destructive",
      })
      return
    }

    try {
      setAirdropLoading(true)
      const latestBlockhash = await connection.getLatestBlockhash()
      const signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL)
      await connection.confirmTransaction({ signature, ...latestBlockhash }, "confirmed")

      toast({
        title: t.home.quickActions.devnet.success,
      })
    } catch (error) {
      console.error("Devnet airdrop error", error)
      toast({
        title: t.home.quickActions.devnet.error,
        variant: "destructive",
      })
    } finally {
      setAirdropLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-primary/30 bg-card/30 backdrop-blur hologram">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/20 border border-primary/50">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-primary">{t.home.quickActions.expedition.title.toUpperCase()}</CardTitle>
              <CardDescription>{t.home.quickActions.expedition.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{t.home.quickActions.expedition.description}</p>
          <Link href="/planets">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-glow font-bold">
              {t.home.quickActions.expedition.cta.toUpperCase()}
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-secondary/30 bg-card/30 backdrop-blur hologram">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-secondary/20 border border-secondary/50">
              <ShoppingCart className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <CardTitle className="text-secondary">{t.home.quickActions.marketplace.title.toUpperCase()}</CardTitle>
              <CardDescription>{t.home.quickActions.marketplace.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{t.home.quickActions.marketplace.description}</p>
          <Link href="/marketplace">
            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 border-glow-magenta font-bold">
              {t.home.quickActions.marketplace.cta.toUpperCase()}
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-accent/30 bg-card/30 backdrop-blur hologram">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-accent/20 border border-accent/50">
              <Map className="h-6 w-6 text-accent" />
            </div>
            <div>
              <CardTitle className="text-accent">{t.home.quickActions.planets.title.toUpperCase()}</CardTitle>
              <CardDescription>{t.home.quickActions.planets.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{t.home.quickActions.planets.description}</p>
          <Link href="/planets">
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              {t.home.quickActions.planets.cta.toUpperCase()}
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-card/30 backdrop-blur hologram">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/20 border border-primary/50">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground">{t.home.quickActions.fleet.title.toUpperCase()}</CardTitle>
              <CardDescription>{t.home.quickActions.fleet.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{t.home.quickActions.fleet.description}</p>
          <Link href="/fleet">
            <Button variant="outline" className="w-full border-primary/50 hover:bg-primary/10 font-bold bg-transparent">
              {t.home.quickActions.fleet.cta.toUpperCase()}
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-card/30 backdrop-blur hologram md:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/50">
              <Coins className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <CardTitle className="text-green-400">{t.home.quickActions.tokens.title.toUpperCase()}</CardTitle>
              <CardDescription>{t.home.quickActions.tokens.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{t.home.quickActions.tokens.description}</p>
          <Link href="/tokens">
            <Button className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 font-bold">
              {t.home.quickActions.tokens.cta.toUpperCase()}
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-card/30 backdrop-blur hologram md:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/20 border border-primary/50">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-primary">{t.home.quickActions.devnet.title.toUpperCase()}</CardTitle>
              <CardDescription>{t.home.quickActions.devnet.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{t.home.quickActions.devnet.description}</p>
          <Button
            onClick={handleAirdrop}
            disabled={airdropLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-glow font-bold"
          >
            {airdropLoading ? `${t.common.loading}` : t.home.quickActions.devnet.cta.toUpperCase()}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
