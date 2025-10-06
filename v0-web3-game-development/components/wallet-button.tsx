"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Wallet, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useI18n } from "@/lib/i18n/context"

export function WalletButton() {
  const { publicKey, disconnect, connected } = useWallet()
  const { setVisible } = useWalletModal()
  const { t } = useI18n()

  const handleConnect = () => {
    setVisible(true)
  }

  const handleDisconnect = () => {
    disconnect()
  }

  if (!connected || !publicKey) {
    return (
      <Button
        onClick={handleConnect}
        className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow font-bold"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {t.common.connectWallet.toUpperCase()}
      </Button>
    )
  }

  const address = publicKey.toBase58()
  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 border-glow font-bold">
          <Wallet className="mr-2 h-4 w-4" />
          {shortAddress}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-card border-primary/30">
        <DropdownMenuLabel className="font-mono text-xs">{address}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          {t.common.disconnect}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
