interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

export default function StatsCard({ title, value, icon, trend, description }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="rounded-lg bg-primary-100 p-3">{icon}</div>
        </div>

        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {trend && (
              <div className="ml-2 flex items-baseline text-sm">
                <span
                  className={`flex items-baseline ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  <svg
                    className={`h-4 w-4 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {trend.isPositive ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                      />
                    )}
                  </svg>
                  <span className="ml-1">{Math.abs(trend.value)}%</span>
                </span>
                <span className="ml-1 text-gray-500">vs mês anterior</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {description && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      )}
    </div>
  );
}
