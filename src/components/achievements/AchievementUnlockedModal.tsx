import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface AchievementUnlockedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: string;
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
  rewards?: {
    type: 'xp' | 'item' | 'currency';
    amount: number;
    name: string;
    icon?: string;
  }[];
  className?: string;
}

export const AchievementUnlockedModal: React.FC<AchievementUnlockedModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  rarity,
  rewards,
  className = '',
}) => {
  // Determinar cor baseada na raridade
  const getRarityColor = () => {
    switch (rarity) {
      case 'comum':
        return {
          bg: 'from-gray-400 to-gray-300',
          text: 'text-gray-800',
          border: 'border-gray-300',
        };
      case 'raro':
        return {
          bg: 'from-blue-400 to-blue-300',
          text: 'text-blue-800',
          border: 'border-blue-300',
        };
      case 'épico':
        return {
          bg: 'from-purple-400 to-purple-300',
          text: 'text-purple-800',
          border: 'border-purple-300',
        };
      case 'lendário':
        return {
          bg: 'from-yellow-400 to-yellow-300',
          text: 'text-yellow-800',
          border: 'border-yellow-300',
        };
      default:
        return {
          bg: 'from-gray-400 to-gray-300',
          text: 'text-gray-800',
          border: 'border-gray-300',
        };
    }
  };

  // Animações
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
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
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 200,
      },
    },
  };

  const rewardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.5,
      },
    }),
  };

  const colors = getRarityColor();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay com confete */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 overflow-hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          >
            {/* Efeito de Confete */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="confetti-piece" />
              <div className="confetti-piece" />
              <div className="confetti-piece" />
              <div className="confetti-piece" />
              <div className="confetti-piece" />
              <div className="confetti-piece" />
              <div className="confetti-piece" />
              <div className="confetti-piece" />
              <div className="confetti-piece" />
              <div className="confetti-piece" />
            </div>
          </motion.div>

          {/* Modal */}
          <motion.div
            className={`relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden ${className}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Cabeçalho com Gradiente */}
            <div className={`bg-gradient-to-b ${colors.bg} p-8 text-center`}>
              {/* Ícone */}
              <motion.div className="relative w-24 h-24 mx-auto mb-4" variants={iconVariants}>
                <Image
                  src={icon}
                  alt={title}
                  layout="fill"
                  objectFit="contain"
                  className="drop-shadow-lg"
                />
              </motion.div>

              {/* Título e Descrição */}
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-gray-700">{description}</p>

              {/* Indicador de Raridade */}
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-4 ${colors.text} bg-white bg-opacity-50`}
              >
                {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
              </div>
            </div>

            {/* Recompensas */}
            {rewards && rewards.length > 0 && (
              <div className="p-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Recompensas</h3>
                <div className="space-y-3">
                  {rewards.map((reward, index) => (
                    <motion.div
                      key={`${reward.type}-${index}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      variants={rewardVariants}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                    >
                      {/* Ícone da Recompensa */}
                      <div className="w-10 h-10 flex items-center justify-center text-2xl">
                        {reward.icon ? (
                          <Image src={reward.icon} alt={reward.name} width={40} height={40} />
                        ) : reward.type === 'xp' ? (
                          '⭐'
                        ) : reward.type === 'currency' ? (
                          '💰'
                        ) : (
                          '🎁'
                        )}
                      </div>

                      {/* Detalhes da Recompensa */}
                      <div className="flex-grow">
                        <p className="font-medium">
                          {reward.amount}x {reward.name}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Botão de Fechar */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200"
              >
                Continuar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        @keyframes confetti-slow {
          0% {
            transform: translate3d(0, 0, 0) rotateX(0) rotateY(0);
          }
          100% {
            transform: translate3d(25px, 105vh, 0) rotateX(360deg) rotateY(180deg);
          }
        }

        @keyframes confetti-medium {
          0% {
            transform: translate3d(0, 0, 0) rotateX(0) rotateY(0);
          }
          100% {
            transform: translate3d(100px, 105vh, 0) rotateX(100deg) rotateY(360deg);
          }
        }

        @keyframes confetti-fast {
          0% {
            transform: translate3d(0, 0, 0) rotateX(0) rotateY(0);
          }
          100% {
            transform: translate3d(-50px, 105vh, 0) rotateX(10deg) rotateY(250deg);
          }
        }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 30px;
          background: #ffd300;
          top: 0;
          opacity: 0;
        }

        .confetti-piece:nth-child(1) {
          left: 7%;
          transform-origin: 50% 50%;
          animation: confetti-slow 2.5s linear infinite;
          background-color: #ffcf00;
        }

        .confetti-piece:nth-child(2) {
          left: 14%;
          transform-origin: 50% 50%;
          animation: confetti-medium 2.5s linear infinite;
          animation-delay: 1.5s;
          background-color: #00ff00;
        }

        .confetti-piece:nth-child(3) {
          left: 21%;
          transform-origin: 50% 50%;
          animation: confetti-slow 2.5s linear infinite;
          animation-delay: 2.5s;
          background-color: #ff0000;
        }

        .confetti-piece:nth-child(4) {
          left: 28%;
          transform-origin: 50% 50%;
          animation: confetti-medium 2.5s linear infinite;
          animation-delay: 3.5s;
          background-color: #0000ff;
        }

        .confetti-piece:nth-child(5) {
          left: 35%;
          transform-origin: 50% 50%;
          animation: confetti-slow 2.5s linear infinite;
          animation-delay: 4.5s;
          background-color: #ff00ff;
        }

        .confetti-piece:nth-child(6) {
          left: 42%;
          transform-origin: 50% 50%;
          animation: confetti-medium 2.5s linear infinite;
          animation-delay: 5.5s;
          background-color: #00ffff;
        }

        .confetti-piece:nth-child(7) {
          left: 49%;
          transform-origin: 50% 50%;
          animation: confetti-slow 2.5s linear infinite;
          animation-delay: 6.5s;
          background-color: #ffff00;
        }

        .confetti-piece:nth-child(8) {
          left: 56%;
          transform-origin: 50% 50%;
          animation: confetti-medium 2.5s linear infinite;
          animation-delay: 7.5s;
          background-color: #ff8800;
        }

        .confetti-piece:nth-child(9) {
          left: 63%;
          transform-origin: 50% 50%;
          animation: confetti-slow 2.5s linear infinite;
          animation-delay: 8.5s;
          background-color: #ff0088;
        }

        .confetti-piece:nth-child(10) {
          left: 70%;
          transform-origin: 50% 50%;
          animation: confetti-medium 2.5s linear infinite;
          animation-delay: 9.5s;
          background-color: #8800ff;
        }
      `}</style>
    </AnimatePresence>
  );
};
