import { forwardRef, InputHTMLAttributes } from 'react';
import { FormError } from './Form';

interface ColorInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export default forwardRef<HTMLInputElement, ColorInputProps>(function ColorInput(
  { label, error, helper, className, disabled, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        <input
          ref={ref}
          type="color"
          className={`
              block w-full h-10 rounded-md border-gray-300 shadow-sm
              focus:border-primary-500 focus:ring-primary-500 sm:text-sm
              ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
          disabled={disabled}
          {...props}
        />
      </div>

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});
