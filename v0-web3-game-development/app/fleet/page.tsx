import { Header } from "@/components/header"
import { FleetManager } from "@/components/fleet/fleet-manager"
import { MintSection } from "@/components/fleet/mint-section"

export default function FleetPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold glow-cyan text-primary mb-2">FLEET HANGAR</h1>
            <p className="text-muted-foreground">Manage your spaceships and drones</p>
          </div>
        </div>
        <MintSection />
        <FleetManager />
      </div>
    </main>
  )
}
