import { forwardRef, HTMLAttributes, useEffect, useState } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  description?: string;
  showIcon?: boolean;
  showClose?: boolean;
  onClose?: () => void;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  size?: 'sm' | 'md' | 'lg';
}

export default forwardRef<HTMLDivElement, ToastProps>(function Toast(
  {
    type = 'info',
    title,
    description,
    showIcon = true,
    showClose = true,
    onClose,
    duration = 5000,
    position = 'top-right',
    size = 'md',
    className,
    ...props
  },
  ref
) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const sizeClasses = {
    sm: {
      container: 'p-3',
      icon: 'h-4 w-4',
      title: 'text-sm',
      description: 'text-xs',
    },
    md: {
      container: 'p-4',
      icon: 'h-5 w-5',
      title: 'text-base',
      description: 'text-sm',
    },
    lg: {
      container: 'p-6',
      icon: 'h-6 w-6',
      title: 'text-lg',
      description: 'text-base',
    },
  };

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  const typeClasses = {
    success: {
      container: 'bg-green-50 text-green-800',
      icon: 'text-green-400',
    },
    error: {
      container: 'bg-red-50 text-red-800',
      icon: 'text-red-400',
    },
    warning: {
      container: 'bg-yellow-50 text-yellow-800',
      icon: 'text-yellow-400',
    },
    info: {
      container: 'bg-blue-50 text-blue-800',
      icon: 'text-blue-400',
    },
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className={sizeClasses[size].icon} />;
      case 'error':
        return <XCircleIcon className={sizeClasses[size].icon} />;
      case 'warning':
        return <ExclamationCircleIcon className={sizeClasses[size].icon} />;
      case 'info':
      default:
        return <InformationCircleIcon className={sizeClasses[size].icon} />;
    }
  };

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())isVisible) return null;

  return (
    <div
      ref={ref}
      role="alert"
      className={`
          fixed z-50 flex items-start space-x-3 rounded-lg shadow-lg
          ${sizeClasses[size].container}
          ${typeClasses[type].container}
          ${positionClasses[position]}
          ${className}
        `}
      {...props}
    >
      {showIcon && <div className={`flex-shrink-0 ${typeClasses[type].icon}`}>{getIcon()}</div>}

      <div className="flex-1">
        {title && (
          <div
            className={`
                font-medium
                ${sizeClasses[size].title}
              `}
          >
            {title}
          </div>
        )}
        {description && (
          <div
            className={`
                mt-1
                ${sizeClasses[size].description}
              `}
          >
            {description}
          </div>
        )}
      </div>

      {showClose && onClose && (
        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className={`
              flex-shrink-0
              ${typeClasses[type].icon}
              hover:opacity-75
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              rounded-md
            `}
        >
          <XMarkIcon className={sizeClasses[size].icon} />
        </button>
      )}
    </div>
  );
});