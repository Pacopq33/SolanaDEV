"use client"

import { Rocket, ShoppingCart, Map, Wrench, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-primary/30 bg-card/30 backdrop-blur hologram">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/20 border border-primary/50">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-primary">START EXPEDITION</CardTitle>
              <CardDescription>Deploy your fleet to mine resources</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Select a planet and send your ships on a mining expedition. Higher tier planets offer better rewards but
            require stronger fleets.
          </p>
          <Link href="/planets">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-glow font-bold">
              LAUNCH EXPEDITION
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
              <CardTitle className="text-secondary">MARKETPLACE</CardTitle>
              <CardDescription>Trade ships and drones</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Buy and sell NFT spaceships and drones. Build the ultimate fleet or cash out your rare finds.
          </p>
          <Link href="/marketplace">
            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 border-glow-magenta font-bold">
              BROWSE MARKET
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
              <CardTitle className="text-accent">EXPLORE PLANETS</CardTitle>
              <CardDescription>Discover new mining locations</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Explore 5 unique planetary systems from Tier 1 to Tier 5. Each tier requires specific ship levels and offers
            unique rewards.
          </p>
          <Link href="/planets">
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
              VIEW GALAXY MAP
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
              <CardTitle className="text-foreground">UPGRADE & REPAIR</CardTitle>
              <CardDescription>Maintain your fleet</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Repair damaged ships and upgrade their capabilities. Spend $DST tokens to enhance mining power and
            durability.
          </p>
          <Link href="/fleet">
            <Button variant="outline" className="w-full border-primary/50 hover:bg-primary/10 font-bold bg-transparent">
              MANAGE FLEET
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
              <CardTitle className="text-green-400">TOKEN ECONOMY</CardTitle>
              <CardDescription>Manage $GXY and $DST tokens</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Stake $GXY tokens to earn passive rewards, view your token balances, and track your earnings from
            expeditions and marketplace sales.
          </p>
          <Link href="/tokens">
            <Button className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 font-bold">
              VIEW TOKENS
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
