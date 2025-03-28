import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface RankingEntry {
  userId: string;
  userName: string;
  userAvatar: string;
  completionTime: number;
  damageDealt: number;
  rank: number;
}

interface BossRankingProps {
  bossId: string;
  bossName: string;
  entries: RankingEntry[];
  className?: string;
}

export const BossRanking: React.FC<BossRankingProps> = ({ bossName, entries, className = '' }) => {
  // Formatar tempo de conclusão
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-6 text-center">Ranking: {bossName}</h2>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {entries.map(entry => (
          <motion.div
            key={entry.userId}
            className={`
              flex items-center p-4 rounded-lg
              ${entry.rank <= 3 ? 'bg-yellow-50' : 'bg-gray-50'}
              transition-colors duration-200
            `}
            variants={itemVariants}
          >
            {/* Posição no Ranking */}
            <div className="flex-shrink-0 w-8 text-center">
              {entry.rank <= 3 ? (
                <span className="text-2xl">
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                </span>
              ) : (
                <span className="text-gray-500 font-semibold">{entry.rank}º</span>
              )}
            </div>

            {/* Avatar do Usuário */}
            <div className="flex-shrink-0 ml-4">
              <Image
                src={entry.userAvatar}
                alt={entry.userName}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>

            {/* Informações do Usuário */}
            <div className="ml-4 flex-grow">
              <h3 className="font-semibold">{entry.userName}</h3>
              <div className="text-sm text-gray-500">
                Dano Total: {entry.damageDealt.toLocaleString()}
              </div>
            </div>

            {/* Tempo de Conclusão */}
            <div className="flex-shrink-0 text-right">
              <div className="text-sm text-gray-500">Tempo</div>
              <div className="font-mono">{formatTime(entry.completionTime)}</div>
            </div>
          </motion.div>
        ))}

        {entries.length === 0 && (
          <div className="text-center text-gray-500 py-8">Nenhuma batalha concluída ainda</div>
        )}
      </motion.div>
    </div>
  );
};
