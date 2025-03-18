// src/components/boss/BossAttack/index.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Award, Sword, Shield } from 'lucide-react';
import { useBoss } from '../../../contexts/BossContext';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

const BossAttack = ({ onAttack, className = '', ...props }) => {
  const { currentBoss, damageBoss, isBossDefeated } = useBoss();
  const [lastDamage, setLastDamage] = useState(0);
  const [attackAnimation, setAttackAnimation] = useState(false);

  // Tipos de ataque com dano variável
  const attackTypes = [
    { id: 'quiz', name: 'Quiz Completo', icon: <Sword className="w-4 h-4" />, minDamage: 80, maxDamage: 120 },
    { id: 'flashcard', name: 'Flashcards', icon: <Zap className="w-4 h-4" />, minDamage: 40, maxDamage: 70 },
    { id: 'programming', name: 'Programação', icon: <Shield className="w-4 h-4" />, minDamage: 100, maxDamage: 150 },
  ];

  const handleAttack = (attackType) => {
    if (isBossDefeated) return;

    // Calcula o dano baseado no tipo de ataque
    const { minDamage, maxDamage } = attackTypes.find(type => type.id === attackType);
    const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
    
    // Ativa a animação
    setAttackAnimation(true);
    setTimeout(() => setAttackAnimation(false), 600);
    
    // Causa o dano ao Boss
    damageBoss(damage, attackType);
    setLastDamage(damage);
    
    // Callback externo
    if (onAttack) {
      onAttack({ type: attackType, damage });
    }
  };

  return (
    <Card className={className} {...props}>
      <h3 className="text-lg font-bold mb-4">Atacar o Boss</h3>
      
      <div className="space-y-3">
        {attackTypes.map((attackType) => (
          <Button
            key={attackType.id}
            variant="outline"
            className="w-full justify-between"
            onClick={() => handleAttack(attackType.id)}
            disabled={isBossDefeated}
          >
            <div className="flex items-center">
              {attackType.icon}
              <span className="ml-2">{attackType.name}</span>
            </div>
            <span className="text-xs text-neutral-500">
              {attackType.minDamage}-{attackType.maxDamage} dano
            </span>
          </Button>
        ))}
      </div>
      
      {lastDamage > 0 && (
        <motion.div
          className="mt-4 p-3 bg-success-50 rounded-lg text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-success-700 font-medium">
            Você causou <span className="font-bold">{lastDamage}</span> de dano ao Boss!
          </p>
        </motion.div>
      )}
      
      {isBossDefeated && (
        <div className="mt-4 p-3 bg-primary-50 rounded-lg text-center">
          <Award className="w-6 h-6 text-warning-500 mx-auto mb-2" />
          <h4 className="font-bold text-primary-700 mb-1">Boss Derrotado!</h4>
          <p className="text-sm text-primary-600">Parabéns! Confira suas recompensas.</p>
        </div>
      )}
    </Card>
  );
};

export default BossAttack;