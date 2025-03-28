import { Achievement } from '../types';
import Image from 'next/image';

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked?: boolean;
}

export default function AchievementCard({ achievement, isUnlocked = false }: AchievementCardProps) {
  return (
    <div
      className={`relative rounded-lg border p-4 ${
        isUnlocked ? 'border-primary-200 bg-primary-50' : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`rounded-full p-2 ${isUnlocked ? 'bg-primary-100' : 'bg-gray-100'}`}>
            <div className="relative h-8 w-8">
              <Image
                src={achievement.icon}
                alt={achievement.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="ml-4">
          <h3
            className={`text-sm font-medium ${isUnlocked ? 'text-primary-900' : 'text-gray-900'}`}
          >
            {achievement.title}
          </h3>
          <p className="text-sm text-gray-500">{achievement.description}</p>
        </div>

        <div className="ml-auto">
          <div
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isUnlocked ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {achievement.points} pontos
          </div>
        </div>
      </div>

      ({ ?? (() => { throw new Error('Valor não pode ser nulo') })())isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-900 bg-opacity-50">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}