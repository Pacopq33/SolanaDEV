"use client"

import { useState } from "react"
import type { MarketplaceListing } from "@/lib/solana/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Shield, Fuel, Sparkles, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MarketplaceCardProps {
  listing: MarketplaceListing
}

export function MarketplaceCard({ listing }: MarketplaceCardProps) {
  const { toast } = useToast()
  const [buying, setBuying] = useState(false)

  const rarityColors = {
    Common: "bg-gray-500/20 text-gray-300 border-gray-500/50",
    Rare: "bg-blue-500/20 text-blue-300 border-blue-500/50",
    Epic: "bg-purple-500/20 text-purple-300 border-purple-500/50",
    Legendary: "bg-orange-500/20 text-orange-300 border-orange-500/50",
  }

  const handleBuy = async () => {
    setBuying(true)
    // Simulate purchase transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Purchase Successful!",
      description: `You bought ${listing.asset.name} for ${listing.price} SOL`,
    })
    setBuying(false)
  }

  return (
    <Card className="border-primary/30 bg-card/30 backdrop-blur hologram overflow-hidden group hover:border-primary/50 transition-all">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
        <img
          src={listing.asset.image || "/placeholder.svg"}
          alt={listing.asset.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {listing.asset.type === "ship" && listing.asset.rarity && (
            <Badge className={rarityColors[listing.asset.rarity]}>{listing.asset.rarity}</Badge>
          )}
          {listing.asset.type === "drone" && (
            <Badge className="bg-secondary/20 text-secondary border-secondary/50">{listing.asset.droneType}</Badge>
          )}
        </div>
        {listing.asset.type === "ship" && listing.asset.level && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-background/80 text-foreground border-primary/50">LVL {listing.asset.level}</Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <h3 className="text-lg font-bold text-primary">{listing.asset.name}</h3>
        <p className="text-xs text-muted-foreground font-mono">Seller: {listing.seller.slice(0, 8)}...</p>
      </CardHeader>

      <CardContent className="space-y-3">
        {listing.asset.type === "ship" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-primary" />
                <span className="text-muted-foreground">Mining Power</span>
              </div>
              <span className="font-bold text-primary">{listing.asset.miningPower} MP</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-3 w-3 text-accent" />
                <span className="text-muted-foreground">Durability</span>
              </div>
              <span className="font-bold">
                {listing.asset.durability}/{listing.asset.maxDurability}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Fuel className="h-3 w-3 text-secondary" />
                <span className="text-muted-foreground">Fuel Efficiency</span>
              </div>
              <span className="font-bold text-secondary">{listing.asset.fuelEfficiency}%</span>
            </div>
            {listing.asset.specialTrait && (
              <div className="flex items-center gap-2 text-sm pt-2 border-t border-border/50">
                <Sparkles className="h-3 w-3 text-accent" />
                <span className="text-accent text-xs">{listing.asset.specialTrait}</span>
              </div>
            )}
          </div>
        )}

        {listing.asset.type === "drone" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bonus</span>
              <span className="font-bold text-primary">+{listing.asset.bonus}%</span>
            </div>
            <p className="text-xs text-muted-foreground">{listing.asset.description}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
        <div>
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="text-2xl font-bold text-primary glow-cyan">{listing.price} SOL</p>
        </div>
        <Button
          onClick={handleBuy}
          disabled={buying}
          className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow font-bold"
        >
          {buying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Buying...
            </>
          ) : (
            "BUY NOW"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
