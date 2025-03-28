import { forwardRef, InputHTMLAttributes } from 'react';
import { FormError } from './Form';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export default forwardRef<HTMLInputElement, EmailInputProps>(function EmailInput(
  { label, error, helper, className, disabled, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>

        <input
          ref={ref}
          type="email"
          className={`
              block w-full rounded-md border-gray-300 shadow-sm
              pl-10
              focus:border-primary-500 focus:ring-primary-500 sm:text-sm
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
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
