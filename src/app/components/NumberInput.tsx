import { forwardRef, InputHTMLAttributes } from 'react';
import { FormError } from './Form';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  min?: number;
  max?: number;
  step?: number;
  showControls?: boolean;
}

export default forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    label,
    error,
    helper,
    min,
    max,
    step = 1,
    showControls = true,
    className,
    disabled,
    value,
    onChange,
    ...props
  },
  ref
) {
  const handleIncrement = () => {
    if (disabled) return;

    const currentValue = Number(value) || 0;
    const newValue = currentValue + step;

    if (max === undefined || newValue <= max) {
      onChange?.({
        target: {
          value: String(newValue),
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDecrement = () => {
    if (disabled) return;

    const currentValue = Number(value) || 0;
    const newValue = currentValue - step;

    if (min === undefined || newValue >= min) {
      onChange?.({
        target: {
          value: String(newValue),
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        <input
          ref={ref}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className={`
              block w-full rounded-md border-gray-300 shadow-sm
              focus:border-primary-500 focus:ring-primary-500 sm:text-sm
              ${showControls ? 'pr-8' : ''}
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
          disabled={disabled}
          {...props}
        />

        {showControls && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <div className="flex flex-col">
              <button
                type="button"
                onClick={handleIncrement}
                disabled={disabled || (max !== undefined && Number(value) >= max)}
                className={`
                    p-1 rounded-t-md hover:bg-gray-100
                    ${
                      disabled || (max !== undefined && Number(value) >= max)
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                    }
                  `}
              >
                <ChevronUpIcon className="h-4 w-4 text-gray-500" />
              </button>
              <button
                type="button"
                onClick={handleDecrement}
                disabled={disabled || (min !== undefined && Number(value) <= min)}
                className={`
                    p-1 rounded-b-md hover:bg-gray-100
                    ${
                      disabled || (min !== undefined && Number(value) <= min)
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                    }
                  `}
              >
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});
