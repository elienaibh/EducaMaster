import { forwardRef, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { FormError } from './Form';

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  label?: string;
  error?: string;
  helper?: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  {
    label,
    error,
    helper,
    options,
    value,
    onChange,
    placeholder = 'Selecione uma opção',
    disabled = false,
    className,
    ...props
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        triggerRef.current &&
        ( ?? (() => { throw new Error('Valor não pode ser nulo') })())dropdownRef.current.contains(event.target as Node) &&
        ( ?? (() => { throw new Error('Valor não pode ser nulo') })())triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && triggerRef.current && dropdownRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let x = triggerRect.left + scrollX;
      let y = triggerRect.bottom + scrollY + 4;

      if (y + dropdownRect.height > window.innerHeight + scrollY) {
        y = triggerRect.top + scrollY - dropdownRect.height - 4;
      }

      setCoords({ x, y });
    }
  }, [isOpen]);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        <div
          ref={triggerRef}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
              flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-primary-500
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
          {...props}
        >
          <div className="flex items-center space-x-2">
            {selectedOption?.icon && (
              <span className="h-5 w-5 text-gray-400">{selectedOption.icon}</span>
            )}
            <span className="text-sm text-gray-900">{selectedOption?.label || placeholder}</span>
          </div>
          <ChevronDownIcon
            className={`
                h-5 w-5 text-gray-400 transition-transform duration-200
                ${isOpen ? 'rotate-180' : ''}
              `}
          />
        </div>
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-50 w-full max-w-xs rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
            style={{
              left: coords.x,
              top: coords.y,
            }}
          >
            {options.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())option.disabled) {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }
                }}
                className={`
                    flex w-full items-center space-x-2 px-4 py-2 text-left text-sm
                    ${option.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-100'}
                    ${option.value === value ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}
                  `}
                disabled={option.disabled}
              >
                {option.icon && <span className="h-5 w-5 text-gray-400">{option.icon}</span>}
                <span>{option.label}</span>
              </button>
            ))}
          </div>,
          document.body
        )}

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});