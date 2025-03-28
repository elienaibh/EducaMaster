import { forwardRef } from 'react';

interface SpinnerProps {
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'dots' | 'pulse';
  className?: string;
}

export default forwardRef<HTMLDivElement, SpinnerProps>(function Spinner(
  { color = 'primary', size = 'md', variant = 'default', className, ...props },
  ref
) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const colorClasses = {
    primary: 'text-primary-500',
    success: 'text-success-500',
    error: 'text-error-500',
    warning: 'text-warning-500',
    info: 'text-info-500',
  };

  const renderDefault = () => (
    <svg
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className={`
              h-2 w-2 animate-bounce rounded-full
              ${colorClasses[color]}
              ${i === 1 ? 'animation-delay-200' : i === 2 ? 'animation-delay-400' : ''}
            `}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className="relative">
      <div
        className={`
            absolute inset-0 animate-ping rounded-full
            ${colorClasses[color]}
            opacity-75
          `}
      />
      <div
        className={`
            relative rounded-full
            ${sizeClasses[size]}
            ${colorClasses[color]}
          `}
      />
    </div>
  );

  return (
    <div
      ref={ref}
      className={`
          inline-flex items-center justify-center
          ${className}
        `}
      role="status"
      aria-label="Carregando"
      {...props}
    >
      {variant === 'default' && renderDefault()}
      {variant === 'dots' && renderDots()}
      {variant === 'pulse' && renderPulse()}
    </div>
  );
});
