// src/components/boss/BossBattle/index.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, AlertTriangle, CheckCircle } from 'lucide-react';
import { useBoss } from '../../../contexts/BossContext';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import BossCard from '../BossCard';
import BossHealth from '../BossHealth';
import BossAttack from '../BossAttack';
import DamageLog from '../DamageLog';
import BossRewards from '../BossRewards';

const BossBattle = ({ onDefeat, onAttack, className = '', ...props }) => {
  const { 
    currentBoss, 
    isBossDefeated, 
    healthPercentage, 
    damageBoss 
  } = useBoss();
  
  const [showRewards, setShowRewards] = useState(false);
  const [recentDamage, setRecentDamage] = useState(null);
  const [defeatAnimation, setDefeatAnimation] = useState(false);

  // Efeito para mostrar recompensas quando o Boss é derrotado
  useEffect(() => {
    if (isBossDefeated) {
      setDefeatAnimation(true);
      
      // Após a animação de derrota, mostrar as recompensas
      const timer = setTimeout(() => {
        setShowRewards(true);
        setDefeatAnimation(false);
        
        if (onDefeat) {
          onDefeat(currentBoss);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isBossDefeated, currentBoss, onDefeat]);

  // Handler para ataque ao Boss
  const handleAttack = (attackInfo) => {
    setRecentDamage(attackInfo);
    
    // Limpar a mensagem após alguns segundos
    setTimeout(() => setRecentDamage(null), 3000);
    
    if (onAttack) {
      onAttack(attackInfo);
    }
  };

  // Handler para reivindicar as recompensas
  const handleClaimRewards = () => {
    setShowRewards(false);
  };

  // Animações
  const battleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  // Se estiver mostrando recompensas, renderizar apenas esse componente
  if (showRewards) {
    return (
      <BossRewards 
        onClaim={handleClaimRewards}
        className={className}
        {...props}
      />
    );
  }

  return (
    <div className={`space-y-6 ${className}`} {...props}>
      <motion.div
        variants={battleVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status do Boss */}
        <motion.div variants={itemVariants}>
          <BossHealth className="mb-6" />
        </motion.div>
        
        {/* Área de batalha */}
        <motion.div variants={itemVariants}>
          <Card className="mb-6 p-6 text-center">
            {defeatAnimation ? (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                <CheckCircle className="w-16 h-16 text-success-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-success-700">Boss Derrotado!</h2>
                <p className="text-success-600 mt-2">Preparando suas recompensas...</p>
              </motion.div>
            ) : isBossDefeated ? (
              <div>
                <Award className="w-16 h-16 text-warning-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold">Boss Derrotado!</h2>
                <p className="text-neutral-600 mt-2 mb-4">
                  Parabéns! Você derrotou o {currentBoss.name}.
                </p>
                <Button 
                  onClick={() => setShowRewards(true)}
                  icon={<Award className="w-4 h-4" />}
                >
                  Ver Recompensas
                </Button>
              </div>
            ) : (
              <div>
                <AnimatePresence>
                  {recentDamage && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mb-4 p-3 bg-success-50 rounded-lg inline-block"
                    >
                      <p className="text-success-700">
                        <strong>+{recentDamage.damage}</strong> de dano causado!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {healthPercentage < 30 ? (
                  <div className="mb-4">
                    <AlertTriangle className="w-8 h-8 text-warning-500 mx-auto mb-2" />
                    <p className="text-warning-600 font-medium">
                      O Boss está quase derrotado! Continue atacando!
                    </p>
                  </div>
                ) : (
                  <p className="text-neutral-600 mb-4">
                    Ataque o Boss com suas atividades de estudo!
                  </p>
                )}
                
                <BossAttack onAttack={handleAttack} />
              </div>
            )}
          </Card>
        </motion.div>
        
        {/* Histórico de dano */}
        {!isBossDefeated && (
          <motion.div variants={itemVariants}>
            <DamageLog maxEntries={3} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BossBattle;