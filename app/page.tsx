import { getCurrencies } from "@/lib/currency-service"
import { CurrencyConverterForm } from "@/components/currency/currency-converter-form"
import { NavTabs } from "@/components/layout/nav-tabs"

export default async function Home() {
  const currenciesData = await getCurrencies()
  const currencies = Object.entries(currenciesData).map(([code, name]) => ({ code, name }))

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Currency Converter</h1>

      <NavTabs
        tabs={[
          { href: "/", label: "Converter", isActive: true },
          { href: "/rates", label: "Currency Rates", isActive: false },
        ]}
      />

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <CurrencyConverterForm currencies={currencies} />
      </div>
    </main>
  )
}

