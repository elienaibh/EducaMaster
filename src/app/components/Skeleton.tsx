import { forwardRef } from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  size?: 'sm' | 'md' | 'lg';
  animation?: 'pulse' | 'wave' | 'shimmer';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { variant = 'text', size = 'md', animation = 'pulse', width, height, className, ...props },
  ref
) {
  const sizeClasses = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-6',
  };

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]',
    shimmer:
      'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]',
  };

  const style = {
    width: width || (variant === 'circular' ? '2rem' : '100%'),
    height: height || (variant === 'circular' ? '2rem' : sizeClasses[size]),
  };

  return (
    <div
      ref={ref}
      className={`
          bg-gray-200
          ${variantClasses[variant]}
          ${animationClasses[animation]}
          ${className}
        `}
      style={style}
      {...props}
    />
  );
});
