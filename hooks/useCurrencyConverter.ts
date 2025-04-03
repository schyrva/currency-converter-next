"use client"

import { useState, useCallback } from "react"
import { convertCurrency } from "@/lib/currency-service"

interface UseCurrencyConverterProps {
  initialAmount?: number
  initialFromCurrency?: string
  initialToCurrency?: string
}

export function useCurrencyConverter({
  initialAmount = 1,
  initialFromCurrency = "USD",
  initialToCurrency = "EUR",
}: UseCurrencyConverterProps = {}) {
  const [amount, setAmount] = useState<number>(initialAmount)
  const [fromCurrency, setFromCurrency] = useState<string>(initialFromCurrency)
  const [toCurrency, setToCurrency] = useState<string>(initialToCurrency)
  const [result, setResult] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const convert = useCallback(async () => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const convertedAmount = await convertCurrency(fromCurrency, toCurrency, amount)
      setResult(convertedAmount)
    } catch (err) {
      console.error("Error converting currency:", err)
      setError(err instanceof Error ? err.message : "Failed to convert currency")
    } finally {
      setIsLoading(false)
    }
  }, [amount, fromCurrency, toCurrency])

  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult(null)
  }, [fromCurrency, toCurrency])

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    isLoading,
    error,
    convert,
    swapCurrencies,
  }
}

