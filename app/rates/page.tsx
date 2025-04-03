import { getCurrencies } from "@/lib/currency-service"
import { CurrencyRatesView } from "@/components/currency/currency-rates-view"
import { NavTabs } from "@/components/layout/nav-tabs"

export default async function RatesPage() {
  const currenciesData = await getCurrencies()
  const currencies = Object.entries(currenciesData).map(([code, name]) => ({ code, name }))

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Currency Rates</h1>

      <NavTabs
        tabs={[
          { href: "/", label: "Converter", isActive: false },
          { href: "/rates", label: "Currency Rates", isActive: true },
        ]}
      />

      <div className="bg-white rounded-lg shadow-md p-6">
        <CurrencyRatesView currencies={currencies} currenciesMap={currenciesData} />
      </div>
    </main>
  )
}

