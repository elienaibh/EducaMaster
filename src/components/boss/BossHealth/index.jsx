// src/components/boss/BossHealth/index.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Skull } from 'lucide-react';
import { useBoss } from '../../../contexts/BossContext';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';
import ProgressBar from '../../ui/ProgressBar';

const BossHealth = ({ className = '', compact = false, ...props }) => {
  const { currentBoss, healthPercentage, isBossDefeated } = useBoss();

  if (!currentBoss) return null;

  // Variante compacta (para uso em headers ou pequenos espaços)
  if (compact) {
    return (
      <div className={`flex items-center ${className}`} {...props}>
        <Shield className="w-4 h-4 text-danger-500 mr-2" />
        <div className="w-24 mr-2">
          <ProgressBar
            value={healthPercentage}
            max={100}
            color="boss"
            height="h-2"
          />
        </div>
        <span className="text-xs font-medium">
          {currentBoss.currentHealth}/{currentBoss.maxHealth} HP
        </span>
      </div>
    );
  }

  return (
    <Card className={`overflow-hidden ${className}`} {...props}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          {isBossDefeated ? (
            <Skull className="w-5 h-5 text-neutral-500 mr-2" />
          ) : (
            <Shield className="w-5 h-5 text-danger-500 mr-2" />
          )}
          <h3 className="font-bold text-lg">
            {currentBoss.name}
            {isBossDefeated && <span className="text-sm text-neutral-500 ml-2">(Derrotado)</span>}
          </h3>
        </div>
        <Badge variant="danger">Nível {currentBoss.level}</Badge>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>HP</span>
          <span>{currentBoss.currentHealth} / {currentBoss.maxHealth}</span>
        </div>
        <motion.div
          animate={isBossDefeated ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 2, repeat: isBossDefeated ? Infinity : 0 }}
        >
          <ProgressBar
            value={healthPercentage}
            max={100}
            color={isBossDefeated ? "neutral" : "boss"}
            animated={!isBossDefeated}
          />
        </motion.div>
      </div>

      {isBossDefeated ? (
        <div className="text-sm text-neutral-600 italic">
          Este Boss foi derrotado. Continue seus estudos para enfrentar novos desafios!
        </div>
      ) : (
        <div className="text-sm text-neutral-600">
          Derrote o Boss respondendo corretamente às questões e desafios!
        </div>
      )}
    </Card>
  );
};

export default BossHealth;