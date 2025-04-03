// Currency-related types

export interface Currency {
  code: string;
  name: string;
}

export interface CurrencyRate {
  code: string;
  rate: number;
}

// API response types
export interface CurrencyApiResponse {
  success: boolean;
  terms?: string;
  privacy?: string;
  currencies: Record<string, string>;
  error?: {
    code: number;
    info: string;
  };
}

export interface RatesApiResponse {
  success: boolean;
  terms?: string;
  privacy?: string;
  source?: string;
  quotes?: Record<string, number>;
  error?: {
    code: number;
    info: string;
  };
}
