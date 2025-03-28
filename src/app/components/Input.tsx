import { forwardRef, InputHTMLAttributes } from 'react';
import { FormError } from './Form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, helper, icon, className, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">{icon}</div>
          </div>
        )}

        <input
          ref={ref}
          className={`
              block w-full rounded-md border-gray-300 shadow-sm
              focus:border-primary-500 focus:ring-primary-500 sm:text-sm
              ${icon ? 'pl-10' : 'pl-3'}
              ${error ? 'border-red-300' : ''}
              ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
              ${className}
            `}
          {...props}
        />
      </div>

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});
