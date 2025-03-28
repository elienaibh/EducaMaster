import { forwardRef, HTMLAttributes } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface Step {
  id: string;
  title: string;
  description?: string;
  status?: 'complete' | 'current' | 'upcoming';
  icon?: React.ReactNode;
}

interface StepsProps extends HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep?: number;
  onStepClick?: (stepId: string) => void;
  variant?: 'default' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  showConnectors?: boolean;
}

export default forwardRef<HTMLDivElement, StepsProps>(function Steps(
  {
    steps,
    currentStep = 0,
    onStepClick,
    variant = 'default',
    size = 'md',
    showConnectors = true,
    className,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: {
      container: 'space-x-2',
      step: 'px-3 py-1.5',
      icon: 'h-4 w-4',
      title: 'text-sm',
      description: 'text-xs',
    },
    md: {
      container: 'space-x-4',
      step: 'px-4 py-2',
      icon: 'h-5 w-5',
      title: 'text-base',
      description: 'text-sm',
    },
    lg: {
      container: 'space-x-6',
      step: 'px-6 py-3',
      icon: 'h-6 w-6',
      title: 'text-lg',
      description: 'text-base',
    },
  };

  const variantClasses = {
    default: {
      container: 'flex items-center justify-between',
      step: 'flex items-center',
      connector: 'h-0.5 flex-1 bg-gray-200',
    },
    vertical: {
      container: 'flex flex-col space-y-4',
      step: 'flex items-start',
      connector: 'w-0.5 h-8 bg-gray-200 ml-4',
    },
  };

  const getStepStatus = (index: number): Step['status'] => {
    if (index < currentStep) return 'complete';
    if (index === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status: Step['status'] = 'upcoming') => {
    const baseClasses = 'rounded-full flex items-center justify-center';
    const statusClasses = {
      complete: 'bg-primary-600 text-white',
      current: 'bg-primary-100 text-primary-600 border-2 border-primary-600',
      upcoming: 'bg-gray-100 text-gray-400 border-2 border-gray-300',
    };
    return `${baseClasses} ${statusClasses[status]}`;
  };

  return (
    <div
      ref={ref}
      className={`
          ${variantClasses[variant].container}
          ${sizeClasses[size].container}
          ${className}
        `}
      {...props}
    >
      {steps.map((step, index) => (
        <div key={step.id} className="flex-1">
          <div
            className={`
                ${variantClasses[variant].step}
                ${sizeClasses[size].step}
                ${onStepClick ? 'cursor-pointer' : ''}
              `}
            onClick={() => onStepClick?.(step.id)}
          >
            <div className={getStepClasses(getStepStatus(index))}>
              {step.status === 'complete' ? (
                <CheckIcon className={sizeClasses[size].icon} />
              ) : (
                step.icon || <span className={sizeClasses[size].title}>{index + 1}</span>
              )}
            </div>

            <div className="ml-3">
              <div
                className={`
                    ${sizeClasses[size].title}
                    font-medium
                    ${getStepStatus(index) === 'upcoming' ? 'text-gray-400' : 'text-gray-900'}
                  `}
              >
                {step.title}
              </div>
              {step.description && (
                <div
                  className={`
                      ${sizeClasses[size].description}
                      ${getStepStatus(index) === 'upcoming' ? 'text-gray-400' : 'text-gray-500'}
                    `}
                >
                  {step.description}
                </div>
              )}
            </div>
          </div>

          {showConnectors && index < steps.length - 1 && (
            <div
              className={`
                  ${variantClasses[variant].connector}
                  ${getStepStatus(index) === 'complete' ? 'bg-primary-600' : 'bg-gray-200'}
                `}
            />
          )}
        </div>
      ))}
    </div>
  );
});
