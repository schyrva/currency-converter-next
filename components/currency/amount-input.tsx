'use client';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function AmountInput({ value, onChange, className = '' }: AmountInputProps) {
  return (
    <div className={className}>
      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
        Amount
      </label>

      <input
        id="amount"
        type="number"
        min="0.01"
        step="0.01"
        value={value}
        onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent"
      />
    </div>
  );
}
