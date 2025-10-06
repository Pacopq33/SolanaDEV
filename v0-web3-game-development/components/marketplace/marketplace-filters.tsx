"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SHIP_RARITIES, DRONE_TYPES } from "@/lib/solana/constants"

export function MarketplaceFilters() {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [assetType, setAssetType] = useState<"all" | "ships" | "drones">("all")

  const handleRarityToggle = (rarity: string) => {
    setSelectedRarities((prev) => (prev.includes(rarity) ? prev.filter((r) => r !== rarity) : [...prev, rarity]))
  }

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleReset = () => {
    setPriceRange([0, 100])
    setSelectedRarities([])
    setSelectedTypes([])
    setAssetType("all")
  }

  return (
    <Card className="border-primary/30 bg-card/30 backdrop-blur sticky top-24">
      <CardHeader>
        <CardTitle className="text-primary">FILTERS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Asset Type</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="all"
                checked={assetType === "all"}
                onCheckedChange={() => setAssetType("all")}
                className="border-primary/50"
              />
              <label htmlFor="all" className="text-sm cursor-pointer">
                All Assets
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ships"
                checked={assetType === "ships"}
                onCheckedChange={() => setAssetType("ships")}
                className="border-primary/50"
              />
              <label htmlFor="ships" className="text-sm cursor-pointer">
                Spaceships
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="drones"
                checked={assetType === "drones"}
                onCheckedChange={() => setAssetType("drones")}
                className="border-primary/50"
              />
              <label htmlFor="drones" className="text-sm cursor-pointer">
                Drones
              </label>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range (SOL)</Label>
          <div className="pt-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100}
              step={1}
              className="w-full"
              minStepsBetweenThumbs={1}
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{priceRange[0]} SOL</span>
              <span>{priceRange[1]} SOL</span>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {(assetType === "all" || assetType === "ships") && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Rarity</Label>
              <div className="space-y-2">
                {SHIP_RARITIES.map((rarity) => (
                  <div key={rarity} className="flex items-center space-x-2">
                    <Checkbox
                      id={rarity}
                      checked={selectedRarities.includes(rarity)}
                      onCheckedChange={() => handleRarityToggle(rarity)}
                      className="border-primary/50"
                    />
                    <label htmlFor={rarity} className="text-sm cursor-pointer">
                      {rarity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Separator className="bg-border/50" />
          </>
        )}

        {(assetType === "all" || assetType === "drones") && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Drone Type</Label>
              <div className="space-y-2">
                {DRONE_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={() => handleTypeToggle(type)}
                      className="border-primary/50"
                    />
                    <label htmlFor={type} className="text-sm cursor-pointer">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Separator className="bg-border/50" />
          </>
        )}

        <Button
          onClick={handleReset}
          variant="outline"
          className="w-full border-primary/50 hover:bg-primary/10 bg-transparent"
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}
