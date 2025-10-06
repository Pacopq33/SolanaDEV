"use client"

import { Header } from "@/components/header"
import { TokenBalances } from "@/components/tokens/token-balances"
import { StakingSection } from "@/components/tokens/staking-section"
import { RewardsHistory } from "@/components/tokens/rewards-history"
import { TokenomicsInfo } from "@/components/tokens/tokenomics-info"
import { useI18n } from "@/lib/i18n/context"

export default function TokensPage() {
  const { t } = useI18n()

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold glow-cyan text-primary mb-2">{t.tokens.title}</h1>
            <p className="text-muted-foreground">{t.home.quickActions.tokens.description}</p>
          </div>
        </div>
        <TokenBalances />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StakingSection />
          <RewardsHistory />
        </div>
        <TokenomicsInfo />
      </div>
    </main>
  )
}
