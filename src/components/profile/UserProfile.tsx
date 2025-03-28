import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserProgress } from '../progress/UserProgress';
import { MascotProfile } from '../mascot/MascotProfile';
import { AchievementList } from '../achievements/AchievementList';

interface UserStats {
  id: string;
  name: string;
  avatar: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  studyStreak: number;
  coursesCompleted: number;
  totalQuizzesTaken: number;
  quizAverage: number;
  totalStudyTime: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  joinedAt: string;
  lastActive: string;
}

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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  isUnlocked: boolean;
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
}

interface UserProfileProps {
  user: UserStats;
  mascot: MascotStats;
  achievements: Achievement[];
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  mascot,
  achievements,
  className = '',
}) => {
  // Formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={`space-y-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Cabeçalho do Perfil */}
      <motion.div className="bg-white rounded-lg shadow-lg p-6" variants={itemVariants}>
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 relative">
              <Image src={user.avatar} alt={user.name} layout="fill" className="rounded-full" />
            </div>
            {/* Indicador de Nível */}
            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
              {user.level}
            </div>
          </div>

          {/* Informações do Usuário */}
          <div className="flex-grow">
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="mr-2">🎓</span>
                Membro desde {formatDate(user.joinedAt)}
              </div>
              <div>
                <span className="mr-2">⏱️</span>
                Ativo pela última vez em {formatDate(user.lastActive)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da Esquerda: Mascote */}
        <motion.div variants={itemVariants}>
          <MascotProfile stats={mascot} className="h-full" />
        </motion.div>

        {/* Coluna do Meio: Progresso */}
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <UserProgress
            stats={{
              totalExperience: user.experience,
              level: user.level,
              experienceToNextLevel: user.experienceToNextLevel,
              currentExperience: user.experience % user.experienceToNextLevel,
              studyStreak: user.studyStreak,
              coursesCompleted: user.coursesCompleted,
              totalQuizzesTaken: user.totalQuizzesTaken,
              quizAverage: user.quizAverage,
              totalStudyTime: user.totalStudyTime,
              achievementsUnlocked: user.achievementsUnlocked,
              totalAchievements: user.totalAchievements,
            }}
          />
        </motion.div>

        {/* Conquistas */}
        <motion.div className="lg:col-span-3" variants={itemVariants}>
          <AchievementList achievements={achievements} />
        </motion.div>
      </div>
    </motion.div>
  );
};
