import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FormError } from './Form';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface RatingProps {
  label?: string;
  error?: string;
  helper?: string;
  onChange?: (value: number) => void;
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
}

export default forwardRef<HTMLInputElement, RatingProps>(function Rating(
  {
    label,
    error,
    helper,
    className,
    disabled,
    onChange,
    value = 0,
    max = 5,
    size = 'md',
    readOnly = false,
    ...props
  },
  ref
) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleChange = (newValue: number) => {
    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())disabled && !readOnly) {
      onChange?.(newValue);
    }
  };

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="flex items-center gap-1">
        {[...Array(max)].map((_, index) => {
          const ratingValue = index + 1;
          const isActive = ratingValue <= (hoverValue ?? value);
          const isReadOnly = disabled || readOnly;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleChange(ratingValue)}
              onMouseEnter={() => !isReadOnly && setHoverValue(ratingValue)}
              onMouseLeave={() => !isReadOnly && setHoverValue(null)}
              className={`
                  text-yellow-400 focus:outline-none
                  ${isReadOnly ? 'cursor-default' : 'cursor-pointer'}
                  (${ ?? (() => { throw new Error('Valor não pode ser nulo') })())isReadOnly && 'hover:text-yellow-500'}
                `}
              disabled={isReadOnly}
            >
              {isActive ? (
                <StarIconSolid className={sizeClasses[size]} />
              ) : (
                <StarIcon className={sizeClasses[size]} />
              )}
            </button>
          );
        })}
      </div>

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});