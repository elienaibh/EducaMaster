import { forwardRef, InputHTMLAttributes } from 'react';
import { FormError } from './Form';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  onClear?: () => void;
}

export default forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { label, error, helper, onClear, className, disabled, value, onChange, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>

        <input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          className={`
              block w-full rounded-md border-gray-300 shadow-sm
              pl-10 pr-10
              focus:border-primary-500 focus:ring-primary-500 sm:text-sm
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
          disabled={disabled}
          {...props}
        />

        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            disabled={disabled}
            className={`
                absolute inset-y-0 right-0 flex items-center pr-3
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
          >
            <XMarkIcon className="h-5 w-5 text-gray-400" />
          </button>
        )}
      </div>

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});
