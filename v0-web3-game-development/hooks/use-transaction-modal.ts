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

  const showModal = useCallback(
    (status: TransactionStatus, title?: string, message?: string, txSignature?: string) => {
      setState({
        isOpen: true,
        status,
        title,
        message,
        txSignature,
      })
    },
    [],
  )

  const showPending = useCallback(
    (title?: string, message?: string) => {
      showModal("pending", title, message)
    },
    [showModal],
  )

  const showSuccess = useCallback(
    (title?: string, message?: string, txSignature?: string) => {
      showModal("success", title, message, txSignature)
    },
    [showModal],
  )

  const showError = useCallback(
    (title?: string, message?: string) => {
      showModal("error", title, message)
    },
    [showModal],
  )

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }))
  }, [])

  return {
    ...state,
    showModal,
    showPending,
    showSuccess,
    showError,
    close,
  }
}
