interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export default function StatCard({ value, label, className = '' }: StatCardProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-4xl font-bold text-primary-600 mb-2">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}
