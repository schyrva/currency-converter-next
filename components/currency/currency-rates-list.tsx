import type { CurrencyRate } from '@/types/currency';

interface CurrencyRatesListProps {
  rates: CurrencyRate[];
  currencies: Record<string, string>;
  baseCurrency: string;
}

export function CurrencyRatesList({ rates, currencies, baseCurrency }: CurrencyRatesListProps) {
  if (rates.length === 0) {
    return <p className="text-gray-500 py-4">No currencies found.</p>;
  }

  return (
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
          {rates.map((rate) => (
            <tr key={rate.code} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {rate.code} - {currencies[rate.code] || rate.code}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                {rate.rate.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
