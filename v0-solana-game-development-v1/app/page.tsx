"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { StatsPanel } from "@/components/stats-panel"
import { WalletButton } from "@/components/wallet-button"
import { UpgradeModal } from "@/components/upgrade-modal"
import { WorldsExplorer } from "@/components/worlds-explorer"
import { FleetDashboard } from "@/components/fleet-dashboard"
import { Marketplace } from "@/components/marketplace"
import { MintStation } from "@/components/mint-station"
import { EvolutionStation } from "@/components/evolution-station"
import { Pickaxe, Zap, TrendingUp, Rocket, ShoppingCart, Sparkles, ArrowUpCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface Miner {
  id: string
  name: string
  level: number
  power: number
  efficiency: number
  status: "idle" | "mining" | "resting" | "exploring"
  image: string
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic"
}

export interface Ship {
  id: string
  name: string
  level: number
  capacity: number
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic"
}

export default function Home() {
  const [solBalance, setSolBalance] = useState(0)
  const [crystalBalance, setCrystalBalance] = useState(1000)
  const [sworkBalance, setSworkBalance] = useState(500)
  const [shipGas, setShipGas] = useState(100)
  const [shipLevel, setShipLevel] = useState(1)
  const [miners, setMiners] = useState<Miner[]>([
    {
      id: "1",
      name: "Miner Alpha",
      level: 1,
      power: 10,
      efficiency: 85,
      status: "idle",
      image: "/futuristic-robot-miner-blue.jpg",
      rarity: "common",
    },
    {
      id: "2",
      name: "Miner Beta",
      level: 3,
      power: 25,
      efficiency: 92,
      status: "idle",
      image: "/futuristic-robot-miner-purple.jpg",
      rarity: "rare",
    },
    {
      id: "3",
      name: "Miner Gamma",
      level: 5,
      power: 50,
      efficiency: 95,
      status: "idle",
      image: "/futuristic-robot-miner-gold.jpg",
      rarity: "epic",
    },
  ])
  const [ships, setShips] = useState<Ship[]>([
    {
      id: "ship-1",
      name: "Nave Inicial",
      level: 1,
      capacity: 5,
      rarity: "common",
    },
  ])
  const [selectedMiner, setSelectedMiner] = useState<Miner | null>(null)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [totalMiningPower, setTotalMiningPower] = useState(0)

  // Calculate total mining power
  useEffect(() => {
    const activePower = miners.filter((m) => m.status === "mining").reduce((sum, m) => sum + m.power, 0)
    setTotalMiningPower(activePower)
  }, [miners])

  const handleStartMining = (minerId: string) => {
    setMiners((prev) => prev.map((m) => (m.id === minerId ? { ...m, status: "mining" } : m)))
  }

  const handleStopMining = (minerId: string) => {
    setMiners((prev) => prev.map((m) => (m.id === minerId ? { ...m, status: "idle" } : m)))
  }

  const handleUpgrade = (minerId: string) => {
    const miner = miners.find((m) => m.id === minerId)
    if (miner) {
      setSelectedMiner(miner)
      setIsUpgradeModalOpen(true)
    }
  }

  const confirmUpgrade = () => {
    if (!selectedMiner) return

    const upgradeCost = selectedMiner.level * 100
    if (crystalBalance >= upgradeCost) {
      setMiners((prev) =>
        prev.map((m) =>
          m.id === selectedMiner.id
            ? {
                ...m,
                level: m.level + 1,
                power: Math.floor(m.power * 1.5),
                efficiency: Math.min(99, m.efficiency + 1),
              }
            : m,
        ),
      )
      setCrystalBalance((prev) => prev - upgradeCost)
      setIsUpgradeModalOpen(false)
      setSelectedMiner(null)
    }
  }

  const handleUpgradeShip = () => {
    const upgradeCost = shipLevel * 500
    if (crystalBalance >= upgradeCost && shipLevel < 5) {
      setShipLevel((prev) => prev + 1)
      setCrystalBalance((prev) => prev - upgradeCost)
    }
  }

  const handleExplore = (worldId: string, gasCost: number, winRate: number, reward: number) => {
    if (shipGas < gasCost) {
      return { success: false, message: "Gas insuficiente" }
    }

    setShipGas((prev) => prev - gasCost)

    const randomValue = Math.random() * 100
    const won = randomValue <= winRate

    if (won) {
      setSworkBalance((prev) => prev + reward)
      return { success: true, won: true, reward }
    } else {
      return { success: true, won: false, reward: 0 }
    }
  }

  const handleBuyGas = (amount: number) => {
    const cost = amount * 2 // 2 SWORK por unidad de gas
    if (sworkBalance >= cost) {
      setShipGas((prev) => prev + amount)
      setSworkBalance((prev) => prev - cost)
      return true
    }
    return false
  }

  const handleBuyMiner = (miner: Omit<Miner, "id">, price: number) => {
    if (sworkBalance >= price) {
      const newMiner = {
        ...miner,
        id: Date.now().toString(),
      }
      setMiners((prev) => [...prev, newMiner])
      setSworkBalance((prev) => prev - price)
      return true
    }
    return false
  }

  const handleSellMiner = (minerId: string, price: number) => {
    setMiners((prev) => prev.filter((m) => m.id !== minerId))
    setSworkBalance((prev) => prev + price)
  }

  const handleSellShip = (shipId: string, price: number) => {
    setShips((prev) => prev.filter((s) => s.id !== shipId))
    setSworkBalance((prev) => prev + price)
  }

  const handleBuyShip = (level: number, price: number) => {
    if (sworkBalance >= price && level > shipLevel) {
      setShipLevel(level)
      setSworkBalance((prev) => prev - price)
      return true
    }
    return false
  }

  const handleAddSwork = () => {
    setSworkBalance((prev) => prev + 1000)
  }

  const handleMintWorker = (worker: Omit<Miner, "id">) => {
    if (sworkBalance >= 150) {
      const newWorker = {
        ...worker,
        id: Date.now().toString(),
      }
      setMiners((prev) => [...prev, newWorker])
      setSworkBalance((prev) => prev - 150)
      return true
    }
    return false
  }

  const handleMintShip = (ship: Omit<Ship, "id">) => {
    if (sworkBalance >= 300) {
      const newShip = {
        ...ship,
        id: Date.now().toString(),
      }
      setShips((prev) => [...prev, newShip])
      setSworkBalance((prev) => prev - 300)
      return true
    }
    return false
  }

  const handleEvolveWorker = (workerId: string, cost: number) => {
    if (sworkBalance >= cost) {
      setMiners((prev) =>
        prev.map((m) => {
          if (m.id === workerId) {
            const newLevel = m.level + 1
            const newPower = Math.floor(m.power * 1.5)
            const rarityOrder: Array<"common" | "rare" | "epic" | "legendary" | "mythic"> = [
              "common",
              "rare",
              "epic",
              "legendary",
              "mythic",
            ]
            const currentIndex = rarityOrder.indexOf(m.rarity)
            const newRarity = rarityOrder[Math.min(currentIndex + 1, rarityOrder.length - 1)]

            return {
              ...m,
              level: newLevel,
              power: newPower,
              efficiency: Math.min(99, m.efficiency + 1),
              rarity: newRarity,
            }
          }
          return m
        }),
      )
      setSworkBalance((prev) => prev - cost)
      return true
    }
    return false
  }

  const handleEvolveShip = (shipId: string, cost: number) => {
    if (sworkBalance >= cost) {
      setShips((prev) =>
        prev.map((s) => {
          if (s.id === shipId) {
            const newLevel = s.level + 1
            const newCapacity = s.capacity + 2
            const rarityOrder: Array<"common" | "rare" | "epic" | "legendary" | "mythic"> = [
              "common",
              "rare",
              "epic",
              "legendary",
              "mythic",
            ]
            const currentIndex = rarityOrder.indexOf(s.rarity)
            const newRarity = rarityOrder[Math.min(currentIndex + 1, rarityOrder.length - 1)]

            return {
              ...s,
              level: newLevel,
              capacity: newCapacity,
              rarity: newRarity,
            }
          }
          return s
        }),
      )
      setSworkBalance((prev) => prev - cost)
      const evolvedShip = ships.find((s) => s.id === shipId)
      if (evolvedShip && evolvedShip.level + 1 > shipLevel) {
        setShipLevel(evolvedShip.level + 1)
      }
      return true
    }
    return false
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center animate-neon-pulse">
                <Pickaxe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">SolanaMines</h1>
                <p className="text-xs text-secondary">Explore. Upgrade. Earn.</p>
              </div>
            </div>
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Panel */}
        <StatsPanel
          solBalance={solBalance}
          crystalBalance={crystalBalance}
          sworkBalance={sworkBalance}
          shipGas={shipGas}
          totalMiningPower={totalMiningPower}
          activeMiners={miners.filter((m) => m.status === "mining").length}
          shipLevel={shipLevel}
          onAddSwork={handleAddSwork}
        />

        <Tabs defaultValue="worlds" className="mt-8">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5 bg-card border border-border">
            <TabsTrigger value="worlds" className="gap-2">
              <Rocket className="w-4 h-4" />
              Explorar
            </TabsTrigger>
            <TabsTrigger value="fleet" className="gap-2">
              <Zap className="w-4 h-4" />
              Flota
            </TabsTrigger>
            <TabsTrigger value="mint" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Mintear
            </TabsTrigger>
            <TabsTrigger value="evolution" className="gap-2">
              <ArrowUpCircle className="w-4 h-4" />
              Evolución
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="gap-2">
              <ShoppingCart className="w-4 h-4" />
              Marketplace
            </TabsTrigger>
          </TabsList>

          <TabsContent value="worlds" className="mt-8">
            <WorldsExplorer shipLevel={shipLevel} miners={miners} shipGas={shipGas} onExplore={handleExplore} />
          </TabsContent>

          <TabsContent value="fleet" className="mt-8">
            <FleetDashboard
              miners={miners}
              shipLevel={shipLevel}
              shipGas={shipGas}
              sworkBalance={sworkBalance}
              onBuyGas={handleBuyGas}
            />
          </TabsContent>

          <TabsContent value="mint" className="mt-8">
            <MintStation sworkBalance={sworkBalance} onMintWorker={handleMintWorker} onMintShip={handleMintShip} />
          </TabsContent>

          <TabsContent value="evolution" className="mt-8">
            <EvolutionStation
              miners={miners}
              ships={ships}
              sworkBalance={sworkBalance}
              onEvolveWorker={handleEvolveWorker}
              onEvolveShip={handleEvolveShip}
            />
          </TabsContent>

          <TabsContent value="marketplace" className="mt-8">
            <Marketplace
              sworkBalance={sworkBalance}
              currentShipLevel={shipLevel}
              ownedMiners={miners}
              ownedShips={ships}
              onBuyMiner={handleBuyMiner}
              onSellMiner={handleSellMiner}
              onSellShip={handleSellShip}
              onBuyShip={handleBuyShip}
            />
          </TabsContent>
        </Tabs>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Explora Mundos</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Descubre 5 mundos únicos y gana tokens SWORK con cada exploración exitosa
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-secondary/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Mejora tu Flota</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Aumenta el nivel de tu nave y trabajadores para acceder a mundos de mayor tier
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card border-border hover:border-accent/50 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Marketplace</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Compra y vende trabajadores y naves para optimizar tu estrategia de exploración
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => {
          setIsUpgradeModalOpen(false)
          setSelectedMiner(null)
        }}
        miner={selectedMiner}
        crystalBalance={crystalBalance}
        onConfirm={confirmUpgrade}
      />
    </div>
  )
}
