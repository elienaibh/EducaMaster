import { forwardRef, InputHTMLAttributes } from 'react';
import { FormError } from './Form';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helper?: string;
  indeterminate?: boolean;
}

export default forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, helper, indeterminate = false, className, disabled, ...props },
  ref
) {
  return (
    <div className="w-full">
      <label className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          className={`
              h-4 w-4 rounded border-gray-300
              text-primary-600 focus:ring-primary-500
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
          disabled={disabled}
          {...props}
        />
        {label && (
          <span
            className={`
                ml-2 text-sm
                ${disabled ? 'text-gray-500' : 'text-gray-700'}
                ${error ? 'text-red-500' : ''}
              `}
          >
            {label}
          </span>
        )}
      </label>

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});
