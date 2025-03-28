import { CheckCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SuccessProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
}

export function Success({ className, message, ...props }: SuccessProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-center gap-2 rounded-lg border border-green-500 bg-green-500/10 px-4 py-3 text-sm text-green-500',
        className
      )}
      {...props}
    >
      <CheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
