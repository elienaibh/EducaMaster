import { forwardRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string;
  allowMultiple?: boolean;
  variant?: 'default' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    items,
    defaultOpen,
    allowMultiple = false,
    variant = 'default',
    size = 'md',
    className,
    ...props
  },
  ref
) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen ? [defaultOpen] : []);

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      if (allowMultiple) {
        return prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      }
      return prev.includes(id) ? [] : [id];
    });
  };

  const sizeClasses = {
    sm: {
      title: 'text-sm py-2',
      content: 'text-sm py-2',
    },
    md: {
      title: 'text-base py-3',
      content: 'text-base py-3',
    },
    lg: {
      title: 'text-lg py-4',
      content: 'text-lg py-4',
    },
  };

  const variantClasses = {
    default: 'divide-y divide-gray-200',
    bordered: 'space-y-2',
  };

  return (
    <div
      ref={ref}
      className={`
          w-full
          ${variantClasses[variant]}
          ${className}
        `}
      {...props}
    >
      {items.map(item => (
        <div
          key={item.id}
          className={`
              ${variant === 'bordered' ? 'rounded-lg border border-gray-200' : ''}
              ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
          <button
            type="button"
            onClick={() => !item.disabled && toggleItem(item.id)}
            disabled={item.disabled}
            className={`
                flex w-full items-center justify-between px-4
                ${sizeClasses[size].title}
                ${item.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                ${variant === 'bordered' ? 'rounded-t-lg' : ''}
                ${openItems.includes(item.id) ? 'bg-gray-50' : ''}
              `}
          >
            <div className="flex items-center space-x-2">
              {item.icon && <span className="h-5 w-5 text-gray-400">{item.icon}</span>}
              <span className="font-medium text-gray-900">{item.title}</span>
            </div>
            <ChevronDownIcon
              className={`
                  h-5 w-5 text-gray-400 transition-transform duration-200
                  ${openItems.includes(item.id) ? 'rotate-180' : ''}
                `}
            />
          </button>
          {openItems.includes(item.id) && (
            <div
              className={`
                  px-4
                  ${sizeClasses[size].content}
                  ${variant === 'bordered' ? 'border-t border-gray-200' : ''}
                `}
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
});
