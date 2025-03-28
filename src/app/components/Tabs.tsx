import { forwardRef, useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export default forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    tabs,
    defaultTab,
    onChange,
    variant = 'default',
    size = 'md',
    fullWidth = false,
    className,
    ...props
  },
  ref
) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const variantClasses = {
    default: 'border-b border-gray-200',
    pills: 'rounded-lg bg-gray-100 p-1',
    underline: 'border-b border-gray-200',
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const tabClasses = {
    default: {
      base: 'border-b-2 border-transparent px-1 pb-4 pt-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
      active: 'border-primary-500 text-primary-600',
    },
    pills: {
      base: 'rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-white hover:text-gray-700',
      active: 'bg-white text-primary-600 shadow',
    },
    underline: {
      base: 'border-b-2 border-transparent px-1 pb-4 pt-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700',
      active: 'border-primary-500 text-primary-600',
    },
  };

  return (
    <div ref={ref} className={className} {...props}>
      <div className={variantClasses[variant]}>
        <nav
          className={`
              -mb-px flex space-x-8
              ${fullWidth ? 'w-full' : ''}
            `}
          aria-label="Tabs"
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`
                  ${sizeClasses[size]}
                  ${tabClasses[variant].base}
                  ${activeTab === tab.id ? tabClasses[variant].active : ''}
                  ${tab.disabled ? 'cursor-not-allowed opacity-50' : ''}
                  ${fullWidth ? 'flex-1' : ''}
                `}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              disabled={tab.disabled}
              aria-current={activeTab === tab.id ? 'page' : 'false'}
            >
              <div className="flex items-center justify-center space-x-2">
                {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-4">{tabs.find(tab => tab.id === activeTab)?.content}</div>
    </div>
  );
});
