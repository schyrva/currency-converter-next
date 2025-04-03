'use client';

import { useState } from 'react';
import { useCurrencyRates } from '@/hooks/useCurrencyRates';
import { useSearchFilter } from '@/hooks/useSearchFilter';
import { CurrencySelect } from './currency-select';
import { SearchInput } from '@/components/ui/search-input';
import { CurrencyRatesList } from './currency-rates-list';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { Currency, CurrencyRate } from '@/types/currency';

interface CurrencyRatesViewProps {
  currencies: Currency[];
  currenciesMap: Record<string, string>;
}

export function CurrencyRatesView({ currencies, currenciesMap }: CurrencyRatesViewProps) {
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const { rates, isLoading, error } = useCurrencyRates(baseCurrency);

  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredRates,
  } = useSearchFilter<CurrencyRate>(rates, (rate) => [rate.code, currenciesMap[rate.code] || '']);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Currency Rates</h2>

      <div className="space-y-4">
        <CurrencySelect
          id="baseCurrency"
          label="Base Currency"
          value={baseCurrency}
          onChange={setBaseCurrency}
          currencies={currencies}
        />

        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search currency..."
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" className="text-slate-500" />
        </div>
      ) : rates.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">1 {baseCurrency} equals:</h3>
          <CurrencyRatesList
            rates={filteredRates}
            currencies={currenciesMap}
            baseCurrency={baseCurrency}
          />
        </div>
      ) : null}
    </div>
  );
}
