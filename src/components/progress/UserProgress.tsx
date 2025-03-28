import React from 'react';
import { motion } from 'framer-motion';

interface ProgressStats {
  totalExperience: number;
  level: number;
  experienceToNextLevel: number;
  currentExperience: number;
  studyStreak: number;
  coursesCompleted: number;
  totalQuizzesTaken: number;
  quizAverage: number;
  totalStudyTime: number;
  achievementsUnlocked: number;
  totalAchievements: number;
}

interface UserProgressProps {
  stats: ProgressStats;
  className?: string;
}

export const UserProgress: React.FC<UserProgressProps> = ({ stats, className = '' }) => {
  // Formatar tempo de estudo
  const formatStudyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  // Calcular porcentagem de conquistas
  const achievementPercentage = (stats.achievementsUnlocked / stats.totalAchievements) * 100;

  // Animações
  const progressVariants = {
    hidden: { width: 0 },
    visible: (width: number) => ({
      width: `${width}%`,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold mb-6">Seu Progresso</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nível e Experiência */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Nível {stats.level}</h3>
            <span className="text-sm text-gray-600">
              {stats.currentExperience}/{stats.experienceToNextLevel} XP
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              variants={progressVariants}
              initial="hidden"
              animate="visible"
              custom={(stats.currentExperience / stats.experienceToNextLevel) * 100}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            XP Total: {stats.totalExperience.toLocaleString()}
          </p>
        </div>

        {/* Sequência de Estudos */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🔥</span>
            <h3 className="font-semibold">Sequência de Estudos</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.studyStreak} dias</p>
          <p className="text-sm text-gray-600 mt-2">
            Tempo Total: {formatStudyTime(stats.totalStudyTime)}
          </p>
        </div>

        {/* Cursos */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📚</span>
            <h3 className="font-semibold">Cursos Concluídos</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">{stats.coursesCompleted}</p>
        </div>

        {/* Quizzes */}
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📝</span>
            <h3 className="font-semibold">Quizzes</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{stats.totalQuizzesTaken}</p>
          <p className="text-sm text-gray-600 mt-2">Média: {stats.quizAverage.toFixed(1)}%</p>
        </div>

        {/* Conquistas */}
        <div className="col-span-1 md:col-span-2 bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h3 className="font-semibold">Conquistas</h3>
            </div>
            <span className="text-sm text-gray-600">
              {stats.achievementsUnlocked}/{stats.totalAchievements}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-full bg-red-500 rounded-full"
              variants={progressVariants}
              initial="hidden"
              animate="visible"
              custom={achievementPercentage}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {achievementPercentage.toFixed(1)}% completado
          </p>
        </div>
      </div>
    </motion.div>
  );
};
