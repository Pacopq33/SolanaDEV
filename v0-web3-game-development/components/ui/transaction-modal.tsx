"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, Loader2, Sparkles, Zap, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

export type TransactionStatus = "pending" | "success" | "error"

interface TransactionModalProps {
  isOpen: boolean
  status: TransactionStatus
  title?: string
  message?: string
  txSignature?: string
  onClose?: () => void
}

export function TransactionModal({ isOpen, status, title, message, txSignature, onClose }: TransactionModalProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (status === "success" && isOpen) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }))
      setParticles(newParticles)

      const timer = setTimeout(() => {
        onClose?.()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [status, isOpen, onClose])

  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          icon: Loader2,
          iconColor: "text-cyan-400",
          bgGradient: "from-cyan-500/10 via-blue-500/10 to-purple-500/10",
          borderColor: "border-cyan-400/60",
          glowColor: "shadow-[0_0_60px_rgba(0,255,255,0.6)]",
          title: title || "PROCESSING TRANSACTION",
          message: message || "Please wait while we process your transaction on Solana...",
        }
      case "success":
        return {
          icon: CheckCircle2,
          iconColor: "text-green-400",
          bgGradient: "from-green-500/10 via-emerald-500/10 to-cyan-500/10",
          borderColor: "border-green-400/60",
          glowColor: "shadow-[0_0_60px_rgba(0,255,150,0.7)]",
          title: title || "TRANSACTION SUCCESSFUL!",
          message: message || "Your transaction has been confirmed on the blockchain.",
        }
      case "error":
        return {
          icon: XCircle,
          iconColor: "text-red-400",
          bgGradient: "from-red-500/10 via-orange-500/10 to-pink-500/10",
          borderColor: "border-red-400/60",
          glowColor: "shadow-[0_0_60px_rgba(255,50,100,0.6)]",
          title: title || "TRANSACTION FAILED",
          message: message || "Something went wrong. Please try again.",
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
            onClick={status !== "pending" ? onClose : undefined}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateX: -90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateX: 90 }}
              transition={{ type: "spring", duration: 0.6 }}
              className={cn(
                "relative w-full max-w-md pointer-events-auto",
                "bg-gradient-to-br from-black/80 via-black/70 to-black/80",
                config.bgGradient,
                "border-2",
                config.borderColor,
                config.glowColor,
                "rounded-2xl p-8 overflow-hidden",
              )}
            >
              <div className="absolute inset-0 opacity-30">
                <div className="grid-pattern w-full h-full" />
              </div>

              {status === "success" && (
                <div className="absolute inset-0 pointer-events-none">
                  {particles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      initial={{ x: "50%", y: "50%", scale: 0, opacity: 1 }}
                      animate={{
                        x: `${particle.x}%`,
                        y: `${particle.y}%`,
                        scale: [0, 1, 0],
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_rgba(0,255,150,0.8)]"
                    />
                  ))}
                </div>
              )}

              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <motion.div
                  animate={
                    status === "pending"
                      ? { rotate: 360 }
                      : status === "success"
                        ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                        : { scale: [1, 0.9, 1], x: [-5, 5, -5, 5, 0] }
                  }
                  transition={
                    status === "pending"
                      ? { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
                      : { duration: 0.5 }
                  }
                  className={cn("p-6 rounded-full border-4", config.borderColor, "bg-black/60 backdrop-blur")}
                >
                  <Icon className={cn("w-16 h-16", config.iconColor)} strokeWidth={2.5} />
                </motion.div>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={cn("text-2xl font-bold tracking-wider", config.iconColor)}
                >
                  {config.title}
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-foreground/80 text-sm leading-relaxed"
                >
                  {config.message}
                </motion.p>

                {txSignature && status === "success" && (
                  <motion.a
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    href={`https://solscan.io/tx/${txSignature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline font-mono break-all"
                  >
                    View on Solscan
                  </motion.a>
                )}

                {status === "success" && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute top-4 right-4 text-green-400/40"
                    >
                      <Sparkles className="w-8 h-8" />
                    </motion.div>
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute bottom-4 left-4 text-cyan-400/40"
                    >
                      <Zap className="w-6 h-6" />
                    </motion.div>
                    <motion.div
                      animate={{ y: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="absolute top-1/2 right-8 text-emerald-400/40"
                    >
                      <Rocket className="w-10 h-10" />
                    </motion.div>
                  </>
                )}
              </div>

              {status === "pending" && (
                <motion.div
                  animate={{ y: ["0%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
                />
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
