"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

export function WalletButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnect = async () => {
    // TODO: Implementar conexión con Solana Wallet
    // Usar @solana/wallet-adapter-react y @solana/wallet-adapter-wallets
    //
    // Ejemplo de implementación:
    // import { useWallet } from '@solana/wallet-adapter-react'
    // const { connect, publicKey } = useWallet()
    // await connect()
    // setWalletAddress(publicKey.toString())

    // Simulación para demo
    const mockAddress = "Hx7k...9mPq"
    setWalletAddress(mockAddress)
    setIsConnected(true)

    console.log("[v0] Wallet connection would happen here")
  }

  const handleDisconnect = () => {
    // TODO: Implementar desconexión
    // const { disconnect } = useWallet()
    // await disconnect()

    setIsConnected(false)
    setWalletAddress("")
  }

  if (isConnected) {
    return (
      <Button
        variant="outline"
        onClick={handleDisconnect}
        className="gap-2 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50"
      >
        <Wallet className="w-4 h-4" />
        <span className="font-mono">{walletAddress}</span>
      </Button>
    )
  }

  return (
    <Button onClick={handleConnect} className="gap-2 bg-primary hover:bg-primary/80">
      <Wallet className="w-4 h-4" />
      Conectar Wallet
    </Button>
  )
}
