"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShipGrid } from "./ship-grid"
import { DroneGrid } from "./drone-grid"

export function FleetManager() {
  const [activeTab, setActiveTab] = useState("ships")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-card/50 border border-primary/30">
          <TabsTrigger
            value="ships"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            SPACESHIPS
          </TabsTrigger>
          <TabsTrigger
            value="drones"
            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
          >
            DRONES
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ships" className="mt-6">
          <ShipGrid />
        </TabsContent>

        <TabsContent value="drones" className="mt-6">
          <DroneGrid />
        </TabsContent>
      </Tabs>
    </div>
  )
}
