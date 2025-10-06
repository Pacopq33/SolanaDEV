"use client"

import { Rocket } from "lucide-react"
import { WalletButton } from "@/components/wallet-button"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { LanguageSelector } from "@/components/language-selector"

export function Header() {
  const { t } = useI18n()

  return (
    <header className="border-b border-primary/20 bg-card/50 backdrop-blur-xl sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <Rocket className="h-8 w-8 text-primary glow-cyan" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold glow-cyan text-primary">GALAXYMINER</h1>
              <p className="text-xs text-muted-foreground font-mono">SOLANA NETWORK</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              {t.nav.home.toUpperCase()}
            </Link>
            <Link href="/fleet" className="text-sm font-medium hover:text-primary transition-colors">
              {t.nav.fleet.toUpperCase()}
            </Link>
            <Link href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
              {t.nav.marketplace.toUpperCase()}
            </Link>
            <Link href="/planets" className="text-sm font-medium hover:text-primary transition-colors">
              {t.nav.planets.toUpperCase()}
            </Link>
            <Link href="/tokens" className="text-sm font-medium hover:text-primary transition-colors">
              {t.nav.tokens.toUpperCase()}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  )
}
