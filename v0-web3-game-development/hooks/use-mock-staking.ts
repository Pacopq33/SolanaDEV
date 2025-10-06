"use client"

import { useState } from "react"

export function useMockStaking() {
  const [stakedAmount] = useState(5000)
  const [pendingRewards] = useState(127.35)
  const [apy] = useState(18.5)

  return {
    stakedAmount,
    pendingRewards,
    apy,
  }
}
