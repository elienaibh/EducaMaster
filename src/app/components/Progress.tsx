import { forwardRef } from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info';
  variant?: 'default' | 'striped' | 'animated';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export default forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    value,
    max = 100,
    color = 'primary',
    variant = 'default',
    size = 'md',
    showValue = false,
    className,
    ...props
  },
  ref
) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colorClasses = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    error: 'bg-error-500',
    warning: 'bg-warning-500',
    info: 'bg-info-500',
  };

  const sizeClasses = {
    sm: {
      container: 'h-1.5',
      bar: 'text-xs',
    },
    md: {
      container: 'h-2.5',
      bar: 'text-sm',
    },
    lg: {
      container: 'h-4',
      bar: 'text-base',
    },
  };

  const variantClasses = {
    default: '',
    striped: 'bg-stripes',
    animated: 'animate-pulse',
  };

  return (
    <div
      ref={ref}
      className={`
          relative overflow-hidden rounded-full bg-gray-200
          ${sizeClasses[size].container}
          ${className}
        `}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...props}
    >
      <div
        className={`
            flex h-full items-center justify-center rounded-full
            ${colorClasses[color]}
            ${variantClasses[variant]}
          `}
        style={{ width: `${percentage}%` }}
      >
        {showValue && (
          <span
            className={`
                font-medium text-white
                ${sizeClasses[size].bar}
              `}
          >
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
});
