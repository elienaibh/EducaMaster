import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Reward {
  type: 'xp' | 'item' | 'achievement' | 'currency';
  amount?: number;
  name: string;
  description: string;
  icon: string;
}

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewards: Reward[];
  title?: string;
  className?: string;
}

export const RewardModal: React.FC<RewardModalProps> = ({
  isOpen,
  onClose,
  rewards,
  title = 'Parabéns!',
  className = '',
}) => {
  // Animações
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
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
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const rewardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    }),
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
            className={`relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 ${className}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Confetes */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <span className="text-4xl">🎉</span>
            </div>

            {/* Título */}
            <h2 className="text-2xl font-bold text-center mb-6 mt-2">{title}</h2>

            {/* Lista de Recompensas */}
            <div className="space-y-4">
              {rewards.map((reward, index) => (
                <motion.div
                  key={`${reward.type}-${index}`}
                  className="flex items-center p-4 bg-gray-50 rounded-lg"
                  variants={rewardVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Ícone */}
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-2xl">
                    {reward.icon}
                  </div>

                  {/* Informações */}
                  <div className="ml-4 flex-grow">
                    <h3 className="font-semibold">
                      {reward.amount ? `${reward.amount}x ` : ''}
                      {reward.name}
                    </h3>
                    <p className="text-sm text-gray-600">{reward.description}</p>
                  </div>

                  {/* Indicador de Tipo */}
                  <div className="flex-shrink-0 ml-4">
                    <span
                      className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${
                        reward.type === 'xp'
                          ? 'bg-blue-100 text-blue-800'
                          : reward.type === 'item'
                            ? 'bg-purple-100 text-purple-800'
                            : reward.type === 'achievement'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                      }
                    `}
                    >
                      {reward.type.toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Botão de Fechar */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200"
              >
                Continuar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
