"use client"

import { useState, useCallback } from "react"
import type { TransactionStatus } from "@/components/ui/transaction-modal"

interface TransactionModalState {
  isOpen: boolean
  status: TransactionStatus
  title?: string
  message?: string
  txSignature?: string
}

export function useTransactionModal() {
  const [state, setState] = useState<TransactionModalState>({
    isOpen: false,
    status: "pending",
  })

  const showPending = useCallback((title?: string, message?: string) => {
    setState({
      isOpen: true,
      status: "pending",
      title,
      message,
    })
  }, [])

  const showSuccess = useCallback((title?: string, message?: string, txSignature?: string) => {
    setState({
      isOpen: true,
      status: "success",
      title,
      message,
      txSignature,
    })
  }, [])

  const showError = useCallback((title?: string, message?: string) => {
    setState({
      isOpen: true,
      status: "error",
      title,
      message,
    })
  }, [])

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  return {
    ...state,
    showPending,
    showSuccess,
    showError,
    close,
  }
}
