"use client"

import { useState, useEffect, useCallback } from "react"
import { getRates } from "@/lib/currency-service"
import type { CurrencyRate } from "@/types/currency"

export function useCurrencyRates(baseCurrency: string) {
  const [rates, setRates] = useState<CurrencyRate[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRates = useCallback(async (currency: string) => {
    setIsLoading(true)
    setError(null)
    setRates([])

    try {
      const ratesData = await getRates(currency)
      const formattedRates = Object.entries(ratesData).map(([code, rate]) => ({ code, rate }))
      setRates(formattedRates)
    } catch (err) {
      console.error("Error fetching rates:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch currency rates")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRates(baseCurrency)
  }, [baseCurrency, fetchRates])

  return { rates, isLoading, error, refetch: fetchRates }
}

