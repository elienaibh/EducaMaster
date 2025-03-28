import { forwardRef, HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'soft';
  dot?: boolean;
}

export default forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { color = 'primary', size = 'md', variant = 'solid', dot = false, className, children, ...props },
  ref
) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const colorClasses = {
    primary: {
      solid: 'bg-primary-100 text-primary-800',
      outline: 'border border-primary-200 text-primary-800',
      soft: 'bg-primary-50 text-primary-700',
    },
    success: {
      solid: 'bg-green-100 text-green-800',
      outline: 'border border-green-200 text-green-800',
      soft: 'bg-green-50 text-green-700',
    },
    warning: {
      solid: 'bg-yellow-100 text-yellow-800',
      outline: 'border border-yellow-200 text-yellow-800',
      soft: 'bg-yellow-50 text-yellow-700',
    },
    error: {
      solid: 'bg-red-100 text-red-800',
      outline: 'border border-red-200 text-red-800',
      soft: 'bg-red-50 text-red-700',
    },
    info: {
      solid: 'bg-blue-100 text-blue-800',
      outline: 'border border-blue-200 text-blue-800',
      soft: 'bg-blue-50 text-blue-700',
    },
    gray: {
      solid: 'bg-gray-100 text-gray-800',
      outline: 'border border-gray-200 text-gray-800',
      soft: 'bg-gray-50 text-gray-700',
    },
  };

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      ref={ref}
      className={`
          inline-flex items-center rounded-full font-medium
          ${sizeClasses[size]}
          ${colorClasses[color][variant]}
          ${className}
        `}
      {...props}
    >
      {dot && (
        <span
          className={`
              rounded-full mr-1.5
              ${dotSizeClasses[size]}
              ${variant === 'solid' ? 'bg-current' : 'bg-current opacity-50'}
            `}
        />
      )}
      {children}
    </span>
  );
});
