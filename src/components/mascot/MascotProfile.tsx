import React from 'react';
import { Lumi } from './Lumi';

interface MascotStats {
  level: number;
  experience: number;
  experienceToNextLevel: number;
  evolution: number;
  mood: number;
  energy: number;
  studyStreak: number;
  totalBattles: number;
  battlesWon: number;
}

interface MascotProfileProps {
  stats: MascotStats;
  onInteract?: () => void;
  className?: string;
}

export const MascotProfile: React.FC<MascotProfileProps> = ({
  stats,
  onInteract,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* Mascote */}
      <div className="flex justify-center mb-6">
        <Lumi
          level={stats.level}
          evolution={stats.evolution}
          mood={stats.mood}
          energy={stats.energy}
          onClick={onInteract}
        />
      </div>

      {/* Barra de Experiência */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Nível {stats.level}</span>
          <span>
            {stats.experience}/{stats.experienceToNextLevel} XP
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{
              width: `${(stats.experience / stats.experienceToNextLevel) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-4">
        {/* Sequência de Estudos */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📚</span>
            <h3 className="font-semibold">Sequência</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.studyStreak} dias</p>
        </div>

        {/* Batalhas */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⚔️</span>
            <h3 className="font-semibold">Batalhas</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {stats.battlesWon}/{stats.totalBattles}
          </p>
        </div>

        {/* Status do Mascote */}
        <div className="col-span-2 bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📊</span>
            <h3 className="font-semibold">Status</h3>
          </div>
          <div className="space-y-2">
            {/* Humor */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Humor</span>
                <span>{stats.mood}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-full bg-pink-400 rounded-full transition-all duration-300"
                  style={{ width: `${stats.mood}%` }}
                />
              </div>
            </div>

            {/* Energia */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Energia</span>
                <span>{stats.energy}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                  style={{ width: `${stats.energy}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
