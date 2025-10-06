import type React from "react"
import type { Metadata } from "next"
import { Orbitron } from "next/font/google"
import "./globals.css"
import { SolanaProvider } from "@/components/providers/solana-provider"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "GalaxyMiner - Solana Space Mining Game",
  description: "Web3 space mining game on Solana blockchain",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${orbitron.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        <SolanaProvider>
          <div className="scanline pointer-events-none fixed inset-0 z-50" />
          {children}
        </SolanaProvider>
      </body>
    </html>
  )
}
