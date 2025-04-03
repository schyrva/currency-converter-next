import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  title?: string;
  message: string;
}

export function ErrorDisplay({ title = 'Error', message }: ErrorDisplayProps) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start gap-3">
      <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />

      <div>
        <p className="font-medium">{title}</p>
        <p>{message}</p>
      </div>
    </div>
  );
}
