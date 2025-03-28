import { forwardRef } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
  disabled?: boolean;
}

interface StepperProps {
  steps: Step[];
  currentStep?: number;
  onStepClick?: (stepId: string) => void;
  variant?: 'default' | 'compact';
  orientation?: 'horizontal' | 'vertical';
  showConnectors?: boolean;
  className?: string;
}

export default forwardRef<HTMLDivElement, StepperProps>(function Stepper(
  {
    steps,
    currentStep = 0,
    onStepClick,
    variant = 'default',
    orientation = 'horizontal',
    showConnectors = true,
    className,
    ...props
  },
  ref
) {
  const getStepStatus = (index: number): Step['status'] => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'upcoming';
  };

  const statusClasses = {
    completed: {
      container: 'bg-primary-500 text-white',
      icon: 'text-primary-500',
      title: 'text-primary-500',
      description: 'text-primary-500',
    },
    current: {
      container: 'bg-primary-100 text-primary-500 border-2 border-primary-500',
      icon: 'text-primary-500',
      title: 'text-primary-500',
      description: 'text-primary-500',
    },
    upcoming: {
      container: 'bg-gray-100 text-gray-400 border-2 border-gray-300',
      icon: 'text-gray-400',
      title: 'text-gray-400',
      description: 'text-gray-400',
    },
  };

  const orientationClasses = {
    horizontal: 'flex-row space-x-4',
    vertical: 'flex-col space-y-4',
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
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const classes = statusClasses[status];

        return (
          <div
            key={step.id}
            className={`
                relative flex
                ${orientation === 'horizontal' ? 'flex-1' : ''}
              `}
          >
            <div
              className={`
                  flex items-center justify-center
                  ${orientation === 'horizontal' ? 'mr-4' : 'mb-4'}
                `}
            >
              <div
                className={`
                    relative z-10 flex h-8 w-8 items-center justify-center rounded-full
                    ${classes.container}
                  `}
              >
                {status === 'completed' ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  step.icon || <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
            </div>

            <div
              className={`
                  flex-1
                  ${orientation === 'vertical' ? 'pb-4' : ''}
                `}
            >
              <button
                type="button"
                className={`
                    text-left
                    ${step.disabled ? 'cursor-not-allowed opacity-50' : ''}
                    ${onStepClick ? 'cursor-pointer' : ''}
                  `}
                onClick={() => !step.disabled && onStepClick?.(step.id)}
                disabled={step.disabled}
              >
                <div
                  className={`
                      text-sm font-medium
                      ${classes.title}
                    `}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div
                    className={`
                        mt-1 text-xs
                        ${classes.description}
                      `}
                  >
                    {step.description}
                  </div>
                )}
              </button>
            </div>

            {showConnectors && index < steps.length - 1 && (
              <div
                className={`
                    absolute
                    ${
                      orientation === 'horizontal'
                        ? 'left-8 top-4 h-0.5 w-full bg-gray-200'
                        : 'left-4 top-8 h-full w-0.5 bg-gray-200'
                    }
                  `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
});
