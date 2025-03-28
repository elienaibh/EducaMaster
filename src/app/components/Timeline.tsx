import { forwardRef } from 'react';

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info';
  status?: 'completed' | 'current' | 'upcoming';
}

interface TimelineProps {
  items: TimelineItem[];
  variant?: 'default' | 'compact';
  orientation?: 'vertical' | 'horizontal';
  showConnectors?: boolean;
  className?: string;
}

export default forwardRef<HTMLDivElement, TimelineProps>(function Timeline(
  {
    items,
    variant = 'default',
    orientation = 'vertical',
    showConnectors = true,
    className,
    ...props
  },
  ref
) {
  const colorClasses = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    error: 'bg-error-500',
    warning: 'bg-warning-500',
    info: 'bg-info-500',
  };

  const statusClasses = {
    completed: 'bg-gray-200',
    current: 'animate-pulse',
    upcoming: 'bg-gray-200',
  };

  const orientationClasses = {
    vertical: 'flex-col space-y-4',
    horizontal: 'flex-row space-x-4',
  };

  const variantClasses = {
    default: 'p-4',
    compact: 'p-2',
  };

  return (
    <div
      ref={ref}
      className={`
          ${orientationClasses[orientation]}
          ${variantClasses[variant]}
          ${className}
        `}
      {...props}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`
              relative flex
              ${orientation === 'vertical' ? 'flex-row' : 'flex-col'}
            `}
        >
          <div
            className={`
                flex items-center justify-center
                ${orientation === 'vertical' ? 'mr-4' : 'mb-4'}
              `}
          >
            <div
              className={`
                  relative z-10 flex h-8 w-8 items-center justify-center rounded-full
                  ${colorClasses[item.color || 'primary']}
                  ${statusClasses[item.status || 'completed']}
                `}
            >
              {item.icon || <div className="h-2 w-2 rounded-full bg-white" />}
            </div>
          </div>

          <div
            className={`
                flex-1
                ${orientation === 'vertical' ? 'pb-4' : 'text-center'}
              `}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
              {item.date && <span className="text-xs text-gray-500">{item.date}</span>}
            </div>
            {item.description && <p className="mt-1 text-sm text-gray-500">{item.description}</p>}
          </div>

          {showConnectors && index < items.length - 1 && (
            <div
              className={`
                  absolute
                  ${
                    orientation === 'vertical'
                      ? 'left-4 top-8 h-full w-0.5 bg-gray-200'
                      : 'left-8 top-4 h-0.5 w-full bg-gray-200'
                  }
                `}
            />
          )}
        </div>
      ))}
    </div>
  );
});
