// src/components/boss/BossRewards/index.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, TrendingUp } from 'lucide-react';
import { useBoss } from '../../../contexts/BossContext';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

const BossRewards = ({ onClaim, className = '', ...props }) => {
  const { currentBoss, isBossDefeated, advanceToBoss } = useBoss();
  
  // Se o Boss não foi derrotado, não mostra nada
  if (!isBossDefeated) {
    return null;
  }
  
  const handleClaimRewards = () => {
    // Lógica para atribuir recompensas ao usuário
    if (onClaim) {
      onClaim(currentBoss.rewards);
    }
    
    // Avançar para o próximo Boss
    advanceToBoss();
  };
  
  // Animação para as recompensas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <Card className={`${className} overflow-hidden`} {...props}>
      <div className="bg-warning-50 p-4 rounded-lg">
        <div className="text-center mb-6">
          <Award className="w-12 h-12 text-warning-500 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-warning-700">
            Recompensas Conquistadas!
          </h3>
          <p className="text-sm text-warning-600">
            Você derrotou {currentBoss.name} e ganhou:
          </p>
        </div>
        
        <motion.div 
          className="space-y-4 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {currentBoss.rewards.map((reward) => (
            <motion.div
              key={reward.id}
              className="bg-white p-3 rounded-lg flex items-center"
              variants={itemVariants}
            >
              {reward.type === 'badge' ? (
                <Award className="w-6 h-6 text-warning-500 mr-3" />
              ) : reward.type === 'xp' ? (
                <Star className="w-6 h-6 text-warning-500 mr-3" />
              ) : (
                <TrendingUp className="w-6 h-6 text-warning-500 mr-3" />
              )}
              
              <div>
                <h4 className="font-medium">{reward.name}</h4>
                {reward.type === 'xp' && (
                  <p className="text-sm text-neutral-600">+{reward.value} XP</p>
                )}
                {reward.description && (
                  <p className="text-xs text-neutral-500">{reward.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <Button
          variant="warning"
          className="w-full"
          onClick={handleClaimRewards}
        >
          Coletar Recompensas
        </Button>
      </div>
    </Card>
  );
};

export default BossRewards;