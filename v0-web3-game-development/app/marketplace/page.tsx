"use client"

import { Header } from "@/components/header"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid"
import { MarketplaceStats } from "@/components/marketplace/marketplace-stats"
import { useI18n } from "@/lib/i18n/context"

export default function MarketplacePage() {
  const { t } = useI18n()

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold glow-cyan text-primary mb-2">{t.marketplace.title}</h1>
            <p className="text-muted-foreground">{t.home.quickActions.marketplace.description}</p>
          </div>
        </div>
        <MarketplaceStats />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <MarketplaceFilters />
          </div>
          <div className="lg:col-span-3">
            <MarketplaceGrid />
          </div>
        </div>
      </div>
    </main>
  )
}
