import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { StatsOverview } from "@/components/stats-overview"
import { QuickActions } from "@/components/quick-actions"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <HeroSection />
        <StatsOverview />
        <QuickActions />
      </div>
    </main>
  )
}
