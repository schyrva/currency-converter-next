import { getCurrencies } from '@/lib/currency-service';
import { CurrencyRatesView } from '@/components/currency/currency-rates-view';
import { NavTabs } from '@/components/layout/nav-tabs';

export default async function RatesPage() {
  const currenciesData = await getCurrencies();
  const currencies = Object.entries(currenciesData).map(([code, name]) => ({ code, name }));

  return (
    <main className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Currency Rates</h1>

      <div className="w-full max-w-2xl">
        <NavTabs
          tabs={[
            { href: '/', label: 'Converter', isActive: false },
            { href: '/rates', label: 'Currency Rates', isActive: true },
          ]}
        />

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <CurrencyRatesView currencies={currencies} currenciesMap={currenciesData} />
        </div>
      </div>
    </main>
  );
}
