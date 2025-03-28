import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LumiProps {
  level: number;
  evolution: number;
  mood: number;
  energy: number;
  onClick?: () => void;
  className?: string;
}

export const Lumi: React.FC<LumiProps> = ({
  level,
  evolution,
  mood,
  energy,
  onClick,
  className = '',
}) => {
  // Determinar a imagem do Lumi baseado na evolução
  const getLumiImage = () => {
    switch (evolution) {
      case 1:
        return '/mascots/lumi-basic.png';
      case 2:
        return '/mascots/lumi-evolved.png';
      case 3:
        return '/mascots/lumi-master.png';
      default:
        return '/mascots/lumi-basic.png';
    }
  };

  // Determinar a expressão do Lumi baseado no humor
  const getLumiExpression = () => {
    if (mood >= 80) return '😊';
    if (mood >= 60) return '🙂';
    if (mood >= 40) return '😐';
    if (mood >= 20) return '😕';
    return '😢';
  };

  // Determinar a cor da aura baseado no nível
  const getAuraColor = () => {
    if (level >= 50) return 'rgba(255, 215, 0, 0.3)'; // Dourado
    if (level >= 30) return 'rgba(192, 192, 192, 0.3)'; // Prata
    if (level >= 10) return 'rgba(205, 127, 50, 0.3)'; // Bronze
    return 'transparent';
  };

  // Animações do Lumi
  const animations = {
    idle: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.9,
    },
  };

  return (
    <motion.div
      className={`relative flex flex-col items-center ${className}`}
      whileHover="hover"
      whileTap="tap"
      animate="idle"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Aura */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: getAuraColor(),
          filter: 'blur(10px)',
          zIndex: 0,
        }}
      />

      {/* Mascote */}
      <motion.div className="relative z-10" variants={animations}>
        <Image
          src={getLumiImage()}
          alt="Lumi"
          width={150}
          height={150}
          className="drop-shadow-lg"
        />
      </motion.div>

      {/* Status */}
      <div className="mt-2 text-center">
        <div className="text-2xl">{getLumiExpression()}</div>
        <div className="text-sm font-medium">Nível {level}</div>

        {/* Barras de Status */}
        <div className="mt-2 space-y-1">
          {/* Energia */}
          <div className="flex items-center gap-1">
            <span className="text-xs">⚡</span>
            <div className="w-20 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                style={{ width: `${energy}%` }}
              />
            </div>
          </div>

          {/* Humor */}
          <div className="flex items-center gap-1">
            <span className="text-xs">💖</span>
            <div className="w-20 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-pink-400 rounded-full transition-all duration-300"
                style={{ width: `${mood}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
