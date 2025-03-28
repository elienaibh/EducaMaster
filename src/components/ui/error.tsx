import { AlertCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
}

export function Error({ className, message, ...props }: ErrorProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-center gap-2 rounded-lg border border-destructive bg-destructive/10 px-4 py-3 text-sm text-destructive',
        className
      )}
      {...props}
    >
      <AlertCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
