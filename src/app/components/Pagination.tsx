import { forwardRef, HTMLAttributes } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline';
  maxVisible?: number;
}

export default forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  {
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true,
    showPrevNext = true,
    size = 'md',
    variant = 'default',
    maxVisible = 5,
    className,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: {
      button: 'px-2.5 py-1.5 text-sm',
      icon: 'h-4 w-4',
    },
    md: {
      button: 'px-3 py-2 text-base',
      icon: 'h-5 w-5',
    },
    lg: {
      button: 'px-4 py-2.5 text-lg',
      icon: 'h-6 w-6',
    },
  };

  const variantClasses = {
    default: {
      base: 'bg-white text-gray-700 hover:bg-gray-50',
      active: 'bg-primary-600 text-white hover:bg-primary-700',
      disabled: 'bg-gray-100 text-gray-400 cursor-not-allowed',
    },
    outline: {
      base: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
      active: 'border-primary-500 bg-primary-50 text-primary-600 hover:bg-primary-100',
      disabled: 'border-gray-200 text-gray-400 cursor-not-allowed',
    },
  };

  const getPageNumbers = () => {
    const delta = Math.floor(maxVisible / 2);
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i = 0; i < range.length; i++) {
      if (l) {
        if (range[i] - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (range[i] - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(range[i]);
      l = range[i];
    }

    return rangeWithDots;
  };

  return (
    <nav
      ref={ref}
      className={`
          flex items-center justify-center space-x-1
          ${className}
        `}
      aria-label="Pagination"
      {...props}
    >
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`
              rounded-md ${sizeClasses[size].button}
              ${variantClasses[variant].base}
              ${currentPage === 1 ? variantClasses[variant].disabled : ''}
            `}
          aria-label="Primeira página"
        >
          <ChevronDoubleLeftIcon className={sizeClasses[size].icon} />
        </button>
      )}

      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
              rounded-md ${sizeClasses[size].button}
              ${variantClasses[variant].base}
              ${currentPage === 1 ? variantClasses[variant].disabled : ''}
            `}
          aria-label="Página anterior"
        >
          <ChevronLeftIcon className={sizeClasses[size].icon} />
        </button>
      )}

      {getPageNumbers().map((page, index) =>
        page === '...' ? (
          <span key={`dots-${index}`} className={`${sizeClasses[size].button} text-gray-500`}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`
                rounded-md ${sizeClasses[size].button}
                ${
                  currentPage === page
                    ? variantClasses[variant].active
                    : variantClasses[variant].base
                }
              `}
            aria-current={currentPage === page ? 'page' : 'false'}
          >
            {page}
          </button>
        )
      )}

      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
              rounded-md ${sizeClasses[size].button}
              ${variantClasses[variant].base}
              ${currentPage === totalPages ? variantClasses[variant].disabled : ''}
            `}
          aria-label="Próxima página"
        >
          <ChevronRightIcon className={sizeClasses[size].icon} />
        </button>
      )}

      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`
              rounded-md ${sizeClasses[size].button}
              ${variantClasses[variant].base}
              ${currentPage === totalPages ? variantClasses[variant].disabled : ''}
            `}
          aria-label="Última página"
        >
          <ChevronDoubleRightIcon className={sizeClasses[size].icon} />
        </button>
      )}
    </nav>
  );
});
