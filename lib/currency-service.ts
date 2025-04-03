"use server"

import { API_BASE_URL, CACHE_EXPIRATION } from "@/constants/api"
import type { CurrencyApiResponse, RatesApiResponse } from "@/types/currency"

// Get the API key from environment variables
const API_KEY = process.env.CURRENCY_API_KEY

// Cache the currencies and rates to avoid unnecessary API calls
let cachedCurrencies: Record<string, string> | null = null
const ratesCache: Record<string, { rates: Record<string, number>; timestamp: number }> = {}

/**
 * Fetches the list of available currencies
 */
export async function getCurrencies(): Promise<Record<string, string>> {
  // Return cached currencies if available
  if (cachedCurrencies) {
    return cachedCurrencies
  }

  try {
    const response = await fetch(`${API_BASE_URL}/list?access_key=${API_KEY}`)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data: CurrencyApiResponse = await response.json()

    if (!data.success) {
      console.error("API returned error:", data.error)
      throw new Error(data.error?.info || "Failed to fetch currencies")
    }

    if (!data.currencies || Object.keys(data.currencies).length === 0) {
      throw new Error("No currencies returned from API")
    }

    // Cache the currencies
    cachedCurrencies = data.currencies
    return data.currencies
  } catch (error) {
    console.error("Error fetching currencies:", error)
    throw error
  }
}

/**
 * Fetches exchange rates for a base currency
 */
export async function getRates(baseCurrency: string): Promise<Record<string, number>> {
  // Check if we have a valid cached result
  const cacheKey = baseCurrency
  const cachedResult = ratesCache[cacheKey]

  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_EXPIRATION) {
    return cachedResult.rates
  }

  try {
    // CurrencyLayer free plan only supports USD as base currency
    // For other base currencies, we need to convert the rates
    const url = `${API_BASE_URL}/live?access_key=${API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data: RatesApiResponse = await response.json()

    // Check if the API returned an error
    if (!data.success) {
      console.error("API returned error:", data.error)
      throw new Error(data.error?.info || "Failed to fetch rates")
    }

    // Check if quotes exist in the response
    if (!data.quotes || Object.keys(data.quotes).length === 0) {
      throw new Error("No quotes returned from API")
    }

    // Format the rates to remove the source currency prefix
    const formattedRates: Record<string, number> = {}
    for (const [key, value] of Object.entries(data.quotes)) {
      // The key format is typically "USDJPY" for USD to JPY rate
      formattedRates[key.substring(3)] = value
    }

    // If base currency is USD, return the rates directly
    if (baseCurrency === "USD") {
      // Add USD to USD rate (always 1)
      formattedRates["USD"] = 1

      // Cache the result
      ratesCache[cacheKey] = {
        rates: formattedRates,
        timestamp: Date.now(),
      }

      return formattedRates
    }

    // If base currency is not USD, convert the rates
    // First, check if we have the rate from USD to the base currency
    const usdToBaseKey = `USD${baseCurrency}`
    const usdToBase = data.quotes[usdToBaseKey]

    if (!usdToBase) {
      throw new Error(`Rate for USD to ${baseCurrency} not found`)
    }

    // Convert all rates to the new base currency
    const convertedRates: Record<string, number> = {}
    for (const [key, value] of Object.entries(data.quotes)) {
      const currency = key.substring(3)
      convertedRates[currency] = value / usdToBase
    }

    // Add the rate for the base currency to USD
    convertedRates["USD"] = 1 / usdToBase
    // Add the rate for the base currency to itself (always 1)
    convertedRates[baseCurrency] = 1

    // Cache the result
    ratesCache[cacheKey] = {
      rates: convertedRates,
      timestamp: Date.now(),
    }

    return convertedRates
  } catch (error) {
    console.error("Error fetching rates:", error)
    throw error
  }
}

/**
 * Converts an amount from one currency to another
 */
export async function convertCurrency(fromCurrency: string, toCurrency: string, amount: number): Promise<number> {
  try {
    // Get the rates for the from currency
    const rates = await getRates(fromCurrency)

    // Get the rate for the to currency
    const rate = rates[toCurrency]

    if (!rate) {
      throw new Error(`Rate for ${toCurrency} not found`)
    }

    // Convert the amount
    return amount * rate
  } catch (error) {
    console.error("Error converting currency:", error)
    throw error
  }
}

