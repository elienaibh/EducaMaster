import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface RankingUser {
  id: string;
  name: string;
  avatar: string;
  level: number;
  experience: number;
  rank: number;
  studyStreak: number;
  achievementsCount: number;
  isCurrentUser?: boolean;
}

interface GlobalRankingProps {
  users: RankingUser[];
  currentUserRank?: RankingUser;
  className?: string;
}

export const GlobalRanking: React.FC<GlobalRankingProps> = ({
  users,
  currentUserRank,
  className = '',
}) => {
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
      <h2 className="text-2xl font-bold mb-6">Ranking Global</h2>

      {/* Lista de Usuários */}
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {users.map(user => (
          <motion.div
            key={user.id}
            className={`
              flex items-center p-4 rounded-lg
              ${user.isCurrentUser ? 'bg-blue-50 ring-2 ring-blue-500' : 'bg-gray-50'}
              ${user.rank <= 3 ? 'bg-yellow-50' : ''}
              transition-colors duration-200
            `}
            variants={itemVariants}
          >
            {/* Posição no Ranking */}
            <div className="flex-shrink-0 w-12 text-center">
              {user.rank <= 3 ? (
                <span className="text-2xl">
                  {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                </span>
              ) : (
                <span className="text-gray-500 font-semibold">{user.rank}º</span>
              )}
            </div>

            {/* Avatar e Nome */}
            <div className="flex items-center gap-4 flex-grow">
              <div className="relative w-12 h-12">
                <Image src={user.avatar} alt={user.name} layout="fill" className="rounded-full" />
                {/* Indicador de Nível */}
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {user.level}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.experience.toLocaleString()} XP</p>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="flex gap-6 flex-shrink-0">
              {/* Sequência */}
              <div className="text-center">
                <div className="text-sm text-gray-500">🔥 Sequência</div>
                <div className="font-semibold">{user.studyStreak} dias</div>
              </div>

              {/* Conquistas */}
              <div className="text-center">
                <div className="text-sm text-gray-500">🏆 Conquistas</div>
                <div className="font-semibold">{user.achievementsCount}</div>
              </div>
            </div>
          </motion.div>
        ))}

        {users.length === 0 && (
          <div className="text-center text-gray-500 py-8">Nenhum usuário encontrado</div>
        )}
      </motion.div>

      {/* Posição do Usuário Atual (se não estiver no top) */}
      {currentUserRank && !users.find(u => u.id === currentUserRank.id) && (
        <>
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-200" />
            <span className="px-4 text-sm text-gray-500">Sua Posição</span>
            <div className="flex-grow border-t border-gray-200" />
          </div>

          <motion.div
            className="flex items-center p-4 rounded-lg bg-blue-50 ring-2 ring-blue-500"
            variants={itemVariants}
            initial="hidden"
            animate="show"
          >
            {/* Posição no Ranking */}
            <div className="flex-shrink-0 w-12 text-center">
              <span className="text-gray-500 font-semibold">{currentUserRank.rank}º</span>
            </div>

            {/* Avatar e Nome */}
            <div className="flex items-center gap-4 flex-grow">
              <div className="relative w-12 h-12">
                <Image
                  src={currentUserRank.avatar}
                  alt={currentUserRank.name}
                  layout="fill"
                  className="rounded-full"
                />
                {/* Indicador de Nível */}
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {currentUserRank.level}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">{currentUserRank.name}</h3>
                <p className="text-sm text-gray-600">
                  {currentUserRank.experience.toLocaleString()} XP
                </p>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="flex gap-6 flex-shrink-0">
              {/* Sequência */}
              <div className="text-center">
                <div className="text-sm text-gray-500">🔥 Sequência</div>
                <div className="font-semibold">{currentUserRank.studyStreak} dias</div>
              </div>

              {/* Conquistas */}
              <div className="text-center">
                <div className="text-sm text-gray-500">🏆 Conquistas</div>
                <div className="font-semibold">{currentUserRank.achievementsCount}</div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};
