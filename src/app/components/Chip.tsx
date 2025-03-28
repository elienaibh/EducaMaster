import { forwardRef } from 'react';

interface ChipProps {
  label: string;
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info';
  variant?: 'filled' | 'outlined' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  onDelete?: () => void;
  disabled?: boolean;
  className?: string;
}

export default forwardRef<HTMLDivElement, ChipProps>(function Chip(
  {
    label,
    color = 'primary',
    variant = 'filled',
    size = 'md',
    icon,
    onDelete,
    disabled = false,
    className,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const variantClasses = {
    filled: {
      primary: 'bg-primary-100 text-primary-800',
      success: 'bg-success-100 text-success-800',
      error: 'bg-error-100 text-error-800',
      warning: 'bg-warning-100 text-warning-800',
      info: 'bg-info-100 text-info-800',
    },
    outlined: {
      primary: 'border border-primary-200 text-primary-800',
      success: 'border border-success-200 text-success-800',
      error: 'border border-error-200 text-error-800',
      warning: 'border border-warning-200 text-warning-800',
      info: 'border border-info-200 text-info-800',
    },
    soft: {
      primary: 'bg-primary-50 text-primary-700',
      success: 'bg-success-50 text-success-700',
      error: 'bg-error-50 text-error-700',
      warning: 'bg-warning-50 text-warning-700',
      info: 'bg-info-50 text-info-700',
    },
  };

  return (
    <div
      ref={ref}
      className={`
          inline-flex items-center gap-1 rounded-full font-medium
          ${sizeClasses[size]}
          ${variantClasses[variant][color]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
      {onDelete && !disabled && (
        <button
          type="button"
          className="ml-1 rounded-full p-0.5 hover:bg-current hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2"
          onClick={onDelete}
        >
          <span className="sr-only">Remover</span>
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
});
