"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface TransactionLoaderProps {
  isOpen: boolean
  onClose: () => void
  type: "success" | "error" | "loading"
  title: string
  message: string
  amount?: number
  currency?: string
}

export function TransactionLoader({ isOpen, onClose, type, title, message, amount, currency }: TransactionLoaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isOpen && type === "loading") {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isOpen, type])

  useEffect(() => {
    if (type !== "loading" && isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [type, isOpen, onClose])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-2 border-primary/20">
        <div className="flex flex-col items-center justify-center py-8 px-4">
          {/* Icon */}
          <div className="mb-6 relative">
            {type === "loading" && (
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-primary/20 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>
                {/* Orbiting particles */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2 animate-pulse" />
                </div>
                <div className="absolute inset-0 animate-spin-slow-reverse">
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-accent rounded-full -translate-x-1/2 animate-pulse" />
                </div>
              </div>
            )}

            {type === "success" && (
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-scale-in">
                  <CheckCircle2 className="w-16 h-16 text-primary animate-bounce-once" />
                </div>
                {/* Success particles */}
                <div className="absolute inset-0 animate-ping opacity-75">
                  <div className="w-24 h-24 rounded-full border-4 border-primary" />
                </div>
              </div>
            )}

            {type === "error" && (
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-destructive/20 flex items-center justify-center animate-scale-in">
                  <XCircle className="w-16 h-16 text-destructive animate-shake" />
                </div>
                <div className="absolute inset-0 animate-ping opacity-75">
                  <div className="w-24 h-24 rounded-full border-4 border-destructive" />
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground mb-2 text-center">{title}</h3>

          {/* Message */}
          <p className="text-muted-foreground text-center mb-4">{message}</p>

          {/* Amount Display */}
          {amount !== undefined && currency && (
            <div className="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg">
              <span className="text-sm text-muted-foreground">{currency}</span>
              <span className="text-2xl font-bold text-primary">
                {type === "success" ? "+" : ""}
                {amount}
              </span>
            </div>
          )}

          {/* Progress Bar for Loading */}
          {type === "loading" && (
            <div className="w-full mt-6">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary via-accent to-primary animate-shimmer bg-[length:200%_100%] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">Procesando transacción...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
