import { forwardRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
}

export default forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  { value, onChange, minDate, maxDate, disabled = false, className, ...props },
  ref
) {
  const [currentDate, setCurrentDate] = useState(value || new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    if (disabled) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())value) return false;
    return (
      date.getDate() === value.getDate() &&
      date.getMonth() === value.getMonth() &&
      date.getFullYear() === value.getFullYear()
    );
  };

  const handleDateClick = (date: Date) => {
    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())isDateDisabled(date)) {
      onChange?.(date);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div
      ref={ref}
      className={`
          w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-sm
          ${className}
        `}
      {...props}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={disabled}
          className="rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
        </button>
        <span className="text-sm font-medium text-gray-900">
          {currentDate.toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          disabled={disabled}
          className="rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map(day => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const isDisabled = isDateDisabled(date);
          const isSelected = isDateSelected(date);

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDateClick(date)}
              disabled={isDisabled}
              className={`
                  rounded-full p-2 text-sm
                  ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                  ${
                    isSelected
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
});