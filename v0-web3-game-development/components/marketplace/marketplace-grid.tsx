"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { MarketplaceCard } from "./marketplace-card"
import { useMockMarketplace } from "@/hooks/use-mock-marketplace"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingBag } from "lucide-react"

export function MarketplaceGrid() {
  const { connected } = useWallet()
  const { listings, loading } = useMockMarketplace()
  const [sortBy, setSortBy] = useState("recent")

  if (!connected) {
    return (
      <Alert className="border-primary/30 bg-card/30">
        <ShoppingBag className="h-4 w-4" />
        <AlertDescription>Connect your wallet to browse the marketplace</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-48 rounded-lg border border-primary/30 bg-card/30 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-96 rounded-lg border border-primary/30 bg-card/30 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-bold text-foreground">{listings.length}</span> listings
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48 bg-background/50 border-primary/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Listed</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rarity">Rarity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <MarketplaceCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  )
}
