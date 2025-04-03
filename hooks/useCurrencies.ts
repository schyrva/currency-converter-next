'use client';

import { useState, useEffect } from 'react';
import { getCurrencies } from '@/lib/currency-service';
import type { Currency } from '@/types/currency';

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const currenciesData = await getCurrencies();
        const formattedCurrencies = Object.entries(currenciesData).map(([code, name]) => ({
          code,
          name,
        }));
        setCurrencies(formattedCurrencies);
      } catch (err) {
        console.error('Error fetching currencies:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch currencies');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCurrencies();
  }, []);

  return { currencies, isLoading, error };
}
