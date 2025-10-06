"use client"

import { useState } from "react"

export function useMockTokenBalances() {
  const [gxyBalance, setGxyBalance] = useState(15420)
  const [dstBalance, setDstBalance] = useState(8750)
  const [gxyPrice] = useState(2.45)
  const [dstPrice] = useState(0.15)

  return {
    gxyBalance,
    dstBalance,
    gxyPrice,
    dstPrice,
  }
}
