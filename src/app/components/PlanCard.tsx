import { Plan } from '../types';
import Button from './Button';

interface PlanCardProps {
  plan: Plan;
  isPopular?: boolean;
  onSelect?: (plan: Plan) => void;
}

export default function PlanCard({ plan, isPopular = false, onSelect }: PlanCardProps) {
  return (
    <div
      className={`relative rounded-2xl border p-6 shadow-sm ${
        isPopular ? 'border-primary-500 shadow-primary-100' : 'border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-primary-600 px-3 py-1 text-sm font-medium text-white">
            Mais Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
        <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold text-gray-900">R$ {plan.price.toFixed(2)}</span>
          <span className="ml-1 text-sm text-gray-500">
            /{plan.interval === 'month' ? 'mês' : 'ano'}
          </span>
        </div>
      </div>

      <ul role="list" className="mt-8 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className="h-5 w-5 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-3 text-sm text-gray-500">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          variant={isPopular ? 'primary' : 'outline'}
          className="w-full"
          onClick={() => onSelect?.(plan)}
        >
          Selecionar Plano
        </Button>
      </div>
    </div>
  );
}
