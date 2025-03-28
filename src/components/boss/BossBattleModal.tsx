import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BossBattle } from './BossBattle';

interface BossBattleModalProps {
  isOpen: boolean;
  onClose: () => void;
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

export const BossBattleModal: React.FC<BossBattleModalProps> = ({
  isOpen,
  onClose,
  bossId,
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
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={`relative bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full mx-4 overflow-hidden ${className}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Botão de Fechar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white opacity-75 hover:opacity-100 transition-opacity duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Conteúdo */}
            <div className="p-6">
              <BossBattle
                bossId={bossId}
                bossName={bossName}
                bossImage={bossImage}
                bossHealth={bossHealth}
                playerDamage={playerDamage}
                isActive={isActive}
                onAttack={onAttack}
                onAbandon={onAbandon}
              />
            </div>

            {/* Dicas */}
            <div className="bg-gray-800 p-4 border-t border-gray-700">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <span className="text-xl">💡</span>
                <h3 className="font-semibold">Dicas</h3>
              </div>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span>⚡</span>
                  Use itens de boost para aumentar seu dano
                </li>
                <li className="flex items-center gap-2">
                  <span>🎯</span>
                  Complete objetivos para causar dano ao chefe
                </li>
                <li className="flex items-center gap-2">
                  <span>⏱️</span>A batalha tem tempo limitado, use-o com sabedoria
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
