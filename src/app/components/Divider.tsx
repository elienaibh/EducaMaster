import { forwardRef } from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: 'gray' | 'primary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  textAlign?: 'left' | 'center' | 'right';
  className?: string;
}

export default forwardRef<HTMLDivElement, DividerProps>(function Divider(
  {
    orientation = 'horizontal',
    variant = 'solid',
    color = 'gray',
    size = 'md',
    text,
    textAlign = 'center',
    className,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: 'h-px',
    md: 'h-0.5',
    lg: 'h-1',
  };

  const variantClasses = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  const colorClasses = {
    gray: 'border-gray-200',
    primary: 'border-primary-500',
    success: 'border-success-500',
    error: 'border-error-500',
    warning: 'border-warning-500',
    info: 'border-info-500',
  };

  const textColorClasses = {
    gray: 'text-gray-500',
    primary: 'text-primary-500',
    success: 'text-success-500',
    error: 'text-error-500',
    warning: 'text-warning-500',
    info: 'text-info-500',
  };

  const textAlignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  if (orientation === 'vertical') {
    return (
      <div
        ref={ref}
        className={`
            relative mx-4 inline-block h-full w-px
            ${variantClasses[variant]}
            ${colorClasses[color]}
            ${className}
          `}
        {...props}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={`
          relative my-4
          ${className}
        `}
      {...props}
    >
      <div
        className={`
            absolute inset-0
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${colorClasses[color]}
          `}
      />
      {text && (
        <div
          className={`
              relative flex items-center
              ${textAlignClasses[textAlign]}
            `}
        >
          <span
            className={`
                bg-white px-4 text-sm
                ${textColorClasses[color]}
              `}
          >
            {text}
          </span>
        </div>
      )}
    </div>
  );
});
