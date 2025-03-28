import { forwardRef, TextareaHTMLAttributes } from 'react';
import { FormError } from './Form';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, helper, className, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <textarea
        ref={ref}
        className={`
            block w-full rounded-md border-gray-300 shadow-sm
            focus:border-primary-500 focus:ring-primary-500 sm:text-sm
            ${error ? 'border-red-300' : ''}
            ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
            ${className}
          `}
        {...props}
      />

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});
