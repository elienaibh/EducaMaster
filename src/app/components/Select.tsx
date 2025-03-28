import { forwardRef, SelectHTMLAttributes, useState, useRef, useEffect } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { FormError } from './Form';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  label?: string;
  error?: string;
  helper?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    error,
    helper,
    options,
    value,
    onChange,
    placeholder = 'Selecione uma opção',
    disabled,
    className,
    ...props
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div ref={selectRef} className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
              relative w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm
              focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm
              ${error ? 'border-red-300' : ''}
              ${disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer'}
              ${className}
            `}
        >
          <span className="block truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className={`h-5 w-5 text-gray-400 ${isOpen ? 'transform rotate-180' : ''}`}
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                disabled={option.disabled}
                className={`
                    relative w-full cursor-pointer select-none py-2 pl-3 pr-9
                    ${option.value === value ? 'bg-primary-100 text-primary-900' : 'text-gray-900'}
                    ${option.disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'}
                  `}
              >
                <span className="block truncate">{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});
