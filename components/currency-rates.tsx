"use client"

import { useState, useEffect } from "react"
import { getRates } from "@/lib/currency-service"
import { Search, Loader2, AlertCircle } from "lucide-react"

interface CurrencyRatesProps {
  currencies: Record<string, string>
}

export function CurrencyRates({ currencies }: CurrencyRatesProps) {
  const [baseCurrency, setBaseCurrency] = useState<string>("USD")
  const [rates, setRates] = useState<Record<string, number> | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    fetchRates(baseCurrency)
  }, [baseCurrency])

  const fetchRates = async (currency: string) => {
    setIsLoading(true)
    setError(null)
    setRates(null)

    try {
      const ratesData = await getRates(currency)
      setRates(ratesData)
    } catch (err) {
      console.error("Error in component:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch currency rates.")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredRates = rates
    ? Object.entries(rates)
        .filter(
          ([code]) =>
            code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (currencies[code] && currencies[code].toLowerCase().includes(searchQuery.toLowerCase())),
        )
        .sort((a, b) => a[0].localeCompare(b[0]))
    : []

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Currency Rates</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="baseCurrency" className="block text-sm font-medium text-gray-700 mb-1">
            Base Currency
          </label>
          <select
            id="baseCurrency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          >
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search currency..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error fetching currency rates</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin h-8 w-8 text-slate-500" />
        </div>
      ) : rates ? (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">1 {baseCurrency} equals:</h3>

          {filteredRates.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Currency
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRates.map(([code, rate]) => (
                    <tr key={code} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {code} - {currencies[code] || code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {rate.toFixed(4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 py-4">No currencies found matching your search.</p>
          )}
        </div>
      ) : null}
    </div>
  )
}

