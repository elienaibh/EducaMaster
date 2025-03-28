import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FormError } from './Form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  showToggle?: boolean;
}

export default forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { label, error, helper, showToggle = true, className, disabled, ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={`
              block w-full rounded-md border-gray-300 shadow-sm
              focus:border-primary-500 focus:ring-primary-500 sm:text-sm
              ${showToggle ? 'pr-10' : ''}
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
          disabled={disabled}
          {...props}
        />

        {showToggle && (
          <button
            type="button"
            (onClick={() => setShowPassword( ?? (() => { throw new Error('Valor não pode ser nulo') })())showPassword)}
            disabled={disabled}
            className={`
                absolute inset-y-0 right-0 flex items-center pr-3
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});