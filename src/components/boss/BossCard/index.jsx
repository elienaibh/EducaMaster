// src/components/boss/BossCard/index.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Award } from 'lucide-react';
import { useBoss } from '../../../contexts/BossContext';
import Button from '../../ui/Button';
import ProgressBar from '../../ui/ProgressBar';
import Badge from '../../ui/Badge';
import Card from '../../ui/Card';

const BossCard = ({ onAttack, className = '', ...props }) => {
  const { currentBoss, healthPercentage, isBossDefeated, damageBoss } = useBoss();

  const handleAttackClick = () => {
    // Simula um ataque básico (para testes)
    const damage = Math.floor(Math.random() * 50) + 50; // Dano entre 50-100
    damageBoss(damage, 'manual_attack');
    
    if (onAttack) {
      onAttack(damage);
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`} {...props}>
      <div className="bg-primary-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">{currentBoss.name}</h3>
          <Badge variant="danger">Boss</Badge>
        </div>
        
        <p className="text-sm text-neutral-600 mb-4">
          {currentBoss.description || 'Derrote o boss respondendo corretamente às questões e flashcards.'}
        </p>
        
        {/* Barra de vida do Boss */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center">
              <Shield className="w-4 h-4 mr-1 text-danger-500" />
              HP
            </span>
            <span>{currentBoss.currentHealth} / {currentBoss.maxHealth}</span>
          </div>
          <ProgressBar 
            value={healthPercentage} 
            max={100}
            color="boss"
            animated
          />
        </div>
        
        {/* Boss state (derrotado ou ativo) */}
        {isBossDefeated ? (
          <div className="bg-success-50 p-3 rounded-lg text-center mb-4">
            <h4 className="font-medium text-success-700 mb-2">Boss Derrotado!</h4>
            <p className="text-sm text-success-600">Parabéns! Você derrotou o Boss e ganhou recompensas.</p>
          </div>
        ) : (
          <Button 
            variant="danger" 
            className="w-full mb-4"
            onClick={handleAttackClick}
            icon={<Zap className="w-4 h-4" />}
          >
            Atacar boss
          </Button>
        )}
        
        {/* Recompensas */}
        {currentBoss.rewards && currentBoss.rewards.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Award className="w-4 h-4 mr-1 text-warning-500" />
              Recompensas
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentBoss.rewards.map((reward) => (
                <div 
                  key={reward.id} 
                  className={`px-2 py-1 rounded-lg text-xs flex items-center ${
                    isBossDefeated ? 'bg-warning-100 text-warning-800' : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {reward.name}
                  {reward.type === 'xp' && ` (+${reward.value} XP)`}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BossCard;