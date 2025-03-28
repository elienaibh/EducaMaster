import { forwardRef, InputHTMLAttributes } from 'react';
import { FormError } from './Form';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helper?: string;
}

export default forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { label, error, helper, className, ...props },
  ref
) {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <button
          type="button"
          role="switch"
          aria-checked={props.checked}
          onClick={() =>
            props.onChange?.({
              target: { checked: !props.checked },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
              transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              ${props.checked ? 'bg-primary-600' : 'bg-gray-200'}
              ${props.disabled ? 'cursor-not-allowed opacity-50' : ''}
              ${error ? 'bg-red-200' : ''}
              ${className}
            `}
        >
          <span
            className={`
                pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
                transition duration-200 ease-in-out
                ${props.checked ? 'translate-x-5' : 'translate-x-0'}
                ${error ? 'bg-red-100' : ''}
              `}
          />
        </button>
      </div>
      <div className="ml-3">
        {label && (
          <label
            htmlFor={props.id}
            className={`
                text-sm font-medium text-gray-700
                ${props.disabled ? 'cursor-not-allowed opacity-50' : ''}
                ${error ? 'text-red-500' : ''}
              `}
          >
            {label}
          </label>
        )}
      </div>
    </div>
  );
});
