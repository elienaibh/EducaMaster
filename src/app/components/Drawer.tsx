import { forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  title?: string;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  showCloseButton?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    isOpen,
    onClose,
    position = 'right',
    size = 'md',
    title,
    closeOnEscape = true,
    closeOnClickOutside = true,
    showCloseButton = true,
    children,
    className,
    ...props
  },
  ref
) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  };

  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
  };

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50"
      onClick={e => {
        if (closeOnClickOutside && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={ref}
        className={`
            fixed top-0 h-full w-full overflow-y-auto bg-white shadow-xl
            ${positionClasses[position]}
            ${sizeClasses[size]}
            ${className}
          `}
        {...props}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
            {showCloseButton && (
              <button
                type="button"
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                onClick={onClose}
              >
                <span className="sr-only">Fechar</span>
                <svg
                  className="h-6 w-6"
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
        )}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>,
    document.body
  );
});