import { forwardRef } from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circular' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'away' | 'busy';
  fallback?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { src, alt, size = 'md', variant = 'circular', status, fallback, icon, className, ...props },
  ref
) {
  const sizeClasses = {
    xs: {
      container: 'h-6 w-6',
      text: 'text-xs',
      status: 'h-1.5 w-1.5',
      ring: 'ring-1',
    },
    sm: {
      container: 'h-8 w-8',
      text: 'text-sm',
      status: 'h-2 w-2',
      ring: 'ring-1',
    },
    md: {
      container: 'h-10 w-10',
      text: 'text-base',
      status: 'h-2.5 w-2.5',
      ring: 'ring-2',
    },
    lg: {
      container: 'h-12 w-12',
      text: 'text-lg',
      status: 'h-3 w-3',
      ring: 'ring-2',
    },
    xl: {
      container: 'h-14 w-14',
      text: 'text-xl',
      status: 'h-3.5 w-3.5',
      ring: 'ring-2',
    },
    '2xl': {
      container: 'h-16 w-16',
      text: 'text-2xl',
      status: 'h-4 w-4',
      ring: 'ring-2',
    },
  };

  const variantClasses = {
    circular: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const statusClasses = {
    online: 'bg-success-500',
    offline: 'bg-gray-400',
    away: 'bg-warning-500',
    busy: 'bg-error-500',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      ref={ref}
      className={`
          relative inline-flex items-center justify-center
          ${sizeClasses[size].container}
          ${variantClasses[variant]}
          ${className}
        `}
      {...props}
    >
      {src ? (
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt || ''}
            fill
            className={`
                object-cover
                ${variantClasses[variant]}
              `}
          />
        </div>
      ) : fallback ? (
        <span
          className={`
              flex h-full w-full items-center justify-center
              bg-gray-100 font-medium text-gray-600
              ${sizeClasses[size].text}
              ${variantClasses[variant]}
            `}
        >
          {getInitials(fallback)}
        </span>
      ) : (
        <span
          className={`
              flex h-full w-full items-center justify-center
              bg-gray-100 text-gray-400
              ${sizeClasses[size].text}
              ${variantClasses[variant]}
            `}
        >
          {icon || (
            <svg
              className="h-1/2 w-1/2"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          )}
        </span>
      )}

      {status && (
        <span
          className={`
              absolute bottom-0 right-0
              ${sizeClasses[size].status}
              ${statusClasses[status]}
              ${sizeClasses[size].ring}
              ring-white
              ${status === 'online' ? 'animate-ping' : ''}
            `}
        />
      )}
    </div>
  );
});
