'use client';

import { ArrowRightLeft } from 'lucide-react';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';
import { AmountInput } from './amount-input';
import { CurrencySelect } from './currency-select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { Currency } from '@/types/currency';

interface CurrencyConverterFormProps {
  currencies: Currency[];
}

export function CurrencyConverterForm({ currencies }: CurrencyConverterFormProps) {
  const {
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
  } = useCurrencyConverter();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convert Currency</h2>

      <div className="space-y-4">
        <AmountInput value={amount} onChange={setAmount} />

        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
          <CurrencySelect
            id="fromCurrency"
            label="From"
            value={fromCurrency}
            onChange={setFromCurrency}
            currencies={currencies}
          />

          <button
            onClick={swapCurrencies}
            className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors mt-6"
            aria-label="Swap currencies"
          >
            <ArrowRightLeft className="h-5 w-5" />
          </button>

          <CurrencySelect
            id="toCurrency"
            label="To"
            value={toCurrency}
            onChange={setToCurrency}
            currencies={currencies}
          />
        </div>

        <button
          onClick={convert}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-slate-800 text-white rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <LoadingSpinner size="sm" className="mr-2" />
              Converting...
            </span>
          ) : (
            'Convert'
          )}
        </button>
      </div>

      {result !== null && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-md">
          <p className="text-sm text-gray-500">Result:</p>
          <p className="text-2xl font-bold">
            {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
}
