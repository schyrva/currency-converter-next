'use client';

import type { Currency } from '@/types/currency';

interface CurrencySelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  currencies: Currency[];
  className?: string;
}

export function CurrencySelect({
  id,
  label,
  value,
  onChange,
  currencies,
  className = '',
}: CurrencySelectProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code} - {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
}
