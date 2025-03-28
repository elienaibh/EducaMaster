import { forwardRef, InputHTMLAttributes } from 'react';
import { FormError } from './Form';

interface RangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
}

export default forwardRef<HTMLInputElement, RangeInputProps>(function RangeInput(
  {
    label,
    error,
    helper,
    min = 0,
    max = 100,
    step = 1,
    showValue = true,
    className,
    disabled,
    value,
    ...props
  },
  ref
) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          className={`
              block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
              ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              ${error ? 'bg-red-200' : ''}
              ${className}
            `}
          disabled={disabled}
          {...props}
        />

        {showValue && <div className="mt-2 text-sm text-gray-600">Valor: {value}</div>}
      </div>

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});
