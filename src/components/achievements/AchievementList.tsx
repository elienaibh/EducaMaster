import React from 'react';
import { motion } from 'framer-motion';
import { AchievementCard } from './AchievementCard';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  isUnlocked: boolean;
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
}

interface AchievementListProps {
  achievements: Achievement[];
  onAchievementClick?: (achievement: Achievement) => void;
  className?: string;
}

export const AchievementList: React.FC<AchievementListProps> = ({
  achievements,
  onAchievementClick,
  className = '',
}) => {
  // Ordenar conquistas: desbloqueadas primeiro, depois por raridade e progresso
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (a.isUnlocked !== b.isUnlocked) {
      return a.isUnlocked ? -1 : 1;
    }

    const rarityOrder = {
      lendário: 0,
      épico: 1,
      raro: 2,
      comum: 3,
    };

    if (a.rarity !== b.rarity) {
      return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    }

    return b.progress - a.progress;
  });

  // Animação para a lista
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {sortedAchievements.map(achievement => (
        <AchievementCard
          key={achievement.id}
          {...achievement}
          onClick={() => onAchievementClick?.(achievement)}
        />
      ))}
    </motion.div>
  );
};
