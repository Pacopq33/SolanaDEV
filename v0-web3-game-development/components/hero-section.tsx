"use client"

import type React from "react"

import { Sparkles, TrendingUp, Users } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function HeroSection() {
  const { t } = useI18n()
  const stats = [
    { icon: <Sparkles className="h-5 w-5" />, label: t.home.metrics.minted, value: "12,847", color: "primary" as const },
    { icon: <TrendingUp className="h-5 w-5" />, label: t.home.metrics.dst, value: "2.4M", color: "secondary" as const },
    { icon: <Users className="h-5 w-5" />, label: t.home.metrics.miners, value: "3,521", color: "accent" as const },
  ]

  return (
    <section className="relative overflow-hidden rounded-lg border border-primary/30 bg-card/30 p-8 md:p-12">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-accent/50 bg-accent/10">
          <span className="text-accent text-sm font-bold glow-green">● {t.home.badge.toUpperCase()}</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
          <span className="glow-cyan text-primary">{t.home.title}</span>
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl text-pretty">
          {t.home.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} icon={stat.icon} label={stat.label} value={stat.value} color={stat.color} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: "primary" | "secondary" | "accent"
}) {
  const colorClasses = {
    primary: "border-primary/30 bg-primary/5 text-primary",
    secondary: "border-secondary/30 bg-secondary/5 text-secondary",
    accent: "border-accent/30 bg-accent/5 text-accent",
  }

  return (
    <div className={`rounded-lg border p-4 ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs font-mono text-muted-foreground uppercase">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
