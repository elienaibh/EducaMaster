import { forwardRef, InputHTMLAttributes } from 'react';
import { FormError } from './Form';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export default forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, error, helper, className, ...props },
  ref
) {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          ref={ref}
          type="radio"
          className={`
              h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300
              ${error ? 'border-red-300' : ''}
              ${props.disabled ? 'cursor-not-allowed opacity-50' : ''}
              ${className}
            `}
          {...props}
        />
      </div>
      <div className="ml-3">
        {label && (
          <label
            htmlFor={props.id}
            className={`
                text-sm font-medium text-gray-700
                ${props.disabled ? 'cursor-not-allowed opacity-50' : ''}
              `}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
});
