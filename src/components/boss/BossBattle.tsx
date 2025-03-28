import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BossBattleProps {
  bossId: string;
  bossName: string;
  bossImage: string;
  bossHealth: number;
  playerDamage: number;
  isActive: boolean;
  onAttack?: () => void;
  onAbandon?: () => void;
  className?: string;
}

export const BossBattle: React.FC<BossBattleProps> = ({
  bossName,
  bossImage,
  bossHealth,
  playerDamage,
  isActive,
  onAttack,
  onAbandon,
  className = '',
}) => {
  // Animações
  const bossVariants = {
    idle: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    hit: {
      x: [-10, 10, -5, 5, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  const damageVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [1.2, 1],
      opacity: [1, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={`relative p-6 bg-gray-800 rounded-lg text-white ${className}`}>
      {/* Área do Chefe */}
      <div className="relative h-64 mb-6">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={bossVariants}
          animate={isActive ? 'idle' : undefined}
        >
          <Image
            src={bossImage}
            alt={bossName}
            width={200}
            height={200}
            (className={ ?? (() => { throw new Error('Valor não pode ser nulo') })())isActive ? 'grayscale' : ''}
          />
        </motion.div>

        {/* Efeito de Dano */}
        {playerDamage > 0 && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold text-2xl"
            variants={damageVariants}
            initial="initial"
            animate="animate"
          >
            -{playerDamage}
          </motion.div>
        )}
      </div>

      {/* Informações da Batalha */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2">{bossName}</h2>

        {/* Barra de Vida */}
        <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
          <motion.div
            className="h-full bg-red-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${bossHealth}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-gray-300">{`${bossHealth}% HP`}</p>
      </div>

      {/* Ações */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onAttack}
          (disabled={ ?? (() => { throw new Error('Valor não pode ser nulo') })())isActive}
          className={`
            px-6 py-2 rounded-full font-semibold
            ${
              isActive
                ? 'bg-red-500 hover:bg-red-600 active:bg-red-700'
                : 'bg-gray-600 cursor-not-allowed'
            }
            transition-colors duration-200
          `}
        >
          Atacar
        </button>

        {isActive && (
          <button
            onClick={onAbandon}
            className="px-6 py-2 rounded-full font-semibold bg-gray-600 hover:bg-gray-700 active:bg-gray-800 transition-colors duration-200"
          >
            Abandonar
          </button>
        )}
      </div>

      {/* Status da Batalha */}
      ({ ?? (() => { throw new Error('Valor não pode ser nulo') })())isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <span className="text-2xl font-bold">Batalha Encerrada</span>
        </div>
      )}
    </div>
  );
};