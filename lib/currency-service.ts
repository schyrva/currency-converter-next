'use server';

import { API_BASE_URL, CACHE_EXPIRATION } from '@/constants/api';
import type { CurrencyApiResponse, RatesApiResponse } from '@/types/currency';

const API_KEY = process.env.CURRENCY_API_KEY;

let cachedCurrencies: Record<string, string> | null = null;
const ratesCache: Record<string, { rates: Record<string, number>; timestamp: number }> = {};

export async function getCurrencies(): Promise<Record<string, string>> {
  if (cachedCurrencies) {
    return cachedCurrencies;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/list?access_key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: CurrencyApiResponse = await response.json();

    if (!data.success) {
      console.error('API returned error:', data.error);
      throw new Error(data.error?.info || 'Failed to fetch currencies');
    }

    if (!data.currencies || Object.keys(data.currencies).length === 0) {
      throw new Error('No currencies returned from API');
    }

    cachedCurrencies = data.currencies;
    return data.currencies;
  } catch (error) {
    console.error('Error fetching currencies:', error);
    throw error;
  }
}

export async function getRates(baseCurrency: string): Promise<Record<string, number>> {
  const cacheKey = baseCurrency;
  const cachedResult = ratesCache[cacheKey];

  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_EXPIRATION) {
    return cachedResult.rates;
  }

  try {
    const url = `${API_BASE_URL}/live?access_key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: RatesApiResponse = await response.json();

    if (!data.success) {
      console.error('API returned error:', data.error);
      throw new Error(data.error?.info || 'Failed to fetch rates');
    }

    if (!data.quotes || Object.keys(data.quotes).length === 0) {
      throw new Error('No quotes returned from API');
    }

    const formattedRates: Record<string, number> = {};
    for (const [key, value] of Object.entries(data.quotes)) {
      formattedRates[key.substring(3)] = value;
    }

    if (baseCurrency === 'USD') {
      formattedRates['USD'] = 1;

      ratesCache[cacheKey] = {
        rates: formattedRates,
        timestamp: Date.now(),
      };

      return formattedRates;
    }

    const usdToBaseKey = `USD${baseCurrency}`;
    const usdToBase = data.quotes[usdToBaseKey];

    if (!usdToBase) {
      throw new Error(`Rate for USD to ${baseCurrency} not found`);
    }

    const convertedRates: Record<string, number> = {};
    for (const [key, value] of Object.entries(data.quotes)) {
      const currency = key.substring(3);
      convertedRates[currency] = value / usdToBase;
    }

    convertedRates['USD'] = 1 / usdToBase;
    convertedRates[baseCurrency] = 1;

    ratesCache[cacheKey] = {
      rates: convertedRates,
      timestamp: Date.now(),
    };

    return convertedRates;
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
}

export async function convertCurrency(
  fromCurrency: string,
  toCurrency: string,
  amount: number
): Promise<number> {
  try {
    const rates = await getRates(fromCurrency);

    const rate = rates[toCurrency];

    if (!rate) {
      throw new Error(`Rate for ${toCurrency} not found`);
    }

    return amount * rate;
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
}
