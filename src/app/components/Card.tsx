import { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  clickable?: boolean;
}

export default forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = 'default',
    size = 'md',
    padding = 'md',
    hover = false,
    clickable = false,
    className,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantClasses = {
    default: 'bg-white shadow-sm',
    outline: 'border border-gray-200 bg-white',
    elevated: 'bg-white shadow-lg',
  };

  const hoverClasses = hover ? 'transition-shadow duration-200 hover:shadow-md' : '';

  const clickableClasses = clickable
    ? 'cursor-pointer transition-all duration-200 hover:scale-[1.02]'
    : '';

  return (
    <div
      ref={ref}
      className={`
          ${sizeClasses[size]}
          ${paddingClasses[padding]}
          ${variantClasses[variant]}
          ${hoverClasses}
          ${clickableClasses}
          ${className}
        `}
      {...props}
    />
  );
});

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={`border-b border-gray-200 pb-4 ${className}`}>{children}</div>;
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={`py-4 ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={`border-t border-gray-200 pt-4 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>;
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}
