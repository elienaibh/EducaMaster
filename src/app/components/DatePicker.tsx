import { forwardRef, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { FormError } from './Form';
import Calendar from './Calendar';

interface DatePickerProps {
  label?: string;
  error?: string;
  helper?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
}

export default forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    label,
    error,
    helper,
    value,
    onChange,
    minDate,
    maxDate,
    disabled = false,
    className,
    ...props
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        triggerRef.current &&
        ( ?? (() => { throw new Error('Valor não pode ser nulo') })())calendarRef.current.contains(event.target as Node) &&
        ( ?? (() => { throw new Error('Valor não pode ser nulo') })())triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && triggerRef.current && calendarRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const calendarRect = calendarRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      let x = triggerRect.left + scrollX;
      let y = triggerRect.bottom + scrollY + 4;

      if (y + calendarRect.height > window.innerHeight + scrollY) {
        y = triggerRect.top + scrollY - calendarRect.height - 4;
      }

      setCoords({ x, y });
    }
  }, [isOpen]);

  const formatDate = (date?: Date) => {
    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())date) return '';
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <div className="relative">
        <div
          ref={triggerRef}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
              flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-primary-500
              ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
          {...props}
        >
          <span className="text-sm text-gray-900">{formatDate(value)}</span>
          <CalendarIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={calendarRef}
            className="fixed z-50"
            style={{
              left: coords.x,
              top: coords.y,
            }}
          >
            <Calendar
              value={value}
              onChange={date => {
                onChange?.(date);
                setIsOpen(false);
              }}
              minDate={minDate}
              maxDate={maxDate}
              disabled={disabled}
            />
          </div>,
          document.body
        )}

      {error && <FormError message={error} />}
      {helper && !error && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
    </div>
  );
});