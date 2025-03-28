import { forwardRef } from 'react';

interface CircularProgressProps {
  value: number;
  max?: number;
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info';
  variant?: 'default' | 'striped' | 'animated';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  strokeWidth?: number;
  className?: string;
}

export default forwardRef<HTMLDivElement, CircularProgressProps>(function CircularProgress(
  {
    value,
    max = 100,
    color = 'primary',
    variant = 'default',
    size = 'md',
    showValue = true,
    strokeWidth = 4,
    className,
    ...props
  },
  ref
) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const sizeClasses = {
    sm: {
      container: 'w-8 h-8',
      text: 'text-xs',
    },
    md: {
      container: 'w-12 h-12',
      text: 'text-sm',
    },
    lg: {
      container: 'w-16 h-16',
      text: 'text-base',
    },
  };

  const colorClasses = {
    primary: 'text-primary-500',
    success: 'text-success-500',
    error: 'text-error-500',
    warning: 'text-warning-500',
    info: 'text-info-500',
  };

  const variantClasses = {
    default: '',
    striped: 'stroke-dasharray-4',
    animated: 'animate-spin',
  };

  return (
    <div
      ref={ref}
      className={`
          relative inline-flex items-center justify-center
          ${sizeClasses[size].container}
          ${className}
        `}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...props}
    >
      <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className={`
              ${colorClasses[color]}
              ${variantClasses[variant]}
              transition-all duration-300 ease-in-out
            `}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
      </svg>
      {showValue && (
        <div
          className={`
              absolute flex items-center justify-center
              ${sizeClasses[size].text}
              ${colorClasses[color]}
              font-medium
            `}
        >
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
});
