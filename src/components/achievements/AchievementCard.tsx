import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AchievementCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  isUnlocked: boolean;
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
  onClick?: () => void;
  className?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  icon,
  progress,
  isUnlocked,
  rarity,
  onClick,
  className = '',
}) => {
  // Cores baseadas na raridade
  const getRarityColor = () => {
    switch (rarity) {
      case 'comum':
        return 'bg-gray-100 border-gray-300';
      case 'raro':
        return 'bg-blue-100 border-blue-300';
      case 'épico':
        return 'bg-purple-100 border-purple-300';
      case 'lendário':
        return 'bg-yellow-100 border-yellow-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  // Animações
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className={`relative p-4 rounded-lg border-2 ${getRarityColor()} ${className}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Ícone */}
      <div className="flex justify-center mb-3">
        (<div className={`relative w-16 h-16 ${ ?? (() => { throw new Error('Valor não pode ser nulo') })())isUnlocked && 'grayscale'}`}>
          <Image
            src={icon}
            alt={title}
            layout="fill"
            objectFit="contain"
            className="drop-shadow-md"
          />
        </div>
      </div>

      {/* Título e Descrição */}
      <div className="text-center">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <motion.div
          className={`h-full rounded-full ${isUnlocked ? 'bg-green-500' : 'bg-blue-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Status */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span className="capitalize">{rarity}</span>
        <span>{`${progress}% ${isUnlocked ? 'Concluído' : 'Completo'}`}</span>
      </div>

      {/* Badge de Desbloqueado */}
      {isUnlocked && (
        <div className="absolute -top-2 -right-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-green-500 text-white p-1 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};