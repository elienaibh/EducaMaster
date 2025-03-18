// src/components/boss/BossCard/index.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Zap } from 'lucide-react';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';
import ProgressBar from '../../ui/ProgressBar';

const BossCard = ({ 
  boss, 
  onAttack, 
  className = '' 
}) => {
  const [animation, setAnimation] = useState(false);
  const [lastDamage, setLastDamage] = useState(null);
  
  // Calcular porcentagem de vida
  const healthPercentage = Math.round((boss.currentHealth / boss.maxHealth) * 100);
  const isDefeated = boss.currentHealth <= 0;
  
  // Handler para atacar o Boss
  const handleAttack = () => {
    if (isDefeated || !onAttack) return;
    
    // Causar dano aleatório (40-80)
    const damage = Math.floor(Math.random() * 41) + 40;
    
    // Executar animação
    setAnimation(true);
    setTimeout(() => setAnimation(false), 500);
    
    // Atualizar último dano
    setLastDamage(damage);
    
    // Callback para o componente pai
    onAttack(damage);
  };
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="bg-primary-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <motion.div
              animate={animation ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Shield className="w-5 h-5 text-danger-500 mr-2" />
            </motion.div>
            <h3 className="font-bold text-lg">{boss.name}</h3>
          </div>
          <Badge variant="danger">Boss</Badge>
        </div>
        
        <p className="text-sm text-neutral-600 mb-4">
          {boss.description || 'Derrote o boss respondendo corretamente às questões e flashcards.'}
        </p>
        
        {/* Barra de vida do Boss */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>HP</span>
            <span>{boss.currentHealth} / {boss.maxHealth}</span>
          </div>
          <motion.div
            animate={animation ? { scale: [1, 0.95, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <ProgressBar 
              value={healthPercentage} 
              max={100}
              color="boss"
              animated
            />
          </motion.div>
        </div>
        
        {/* Mensagem de último ataque */}
        {lastDamage && !isDefeated && (
          <motion.div 
            className="mb-4 p-2 bg-warning-100 rounded-lg text-center text-sm text-warning-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Você causou <span className="font-bold">{lastDamage}</span> de dano ao Boss!
          </motion.div>
        )}
        
        {/* Status do Boss (derrotado ou ativo) */}
        {isDefeated ? (
          <div className="bg-success-100 p-3 rounded-lg text-center mb-4">
            <Award className="w-6 h-6 text-success-600 mx-auto mb-1" />
            <h4 className="font-bold text-success-800">Boss Derrotado!</h4>
            <p className="text-sm text-success-700">Parabéns! Você derrotou o Boss e ganhou recompensas.</p>
          </div>
        ) : (
          <Button 
            variant="danger" 
            className="w-full mb-4"
            onClick={handleAttack}
            icon={<Zap className="w-4 h-4" />}
          >
            Atacar Boss
          </Button>
        )}
        
        {/* Recompensas */}
        {boss.rewards && boss.rewards.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Award className="w-4 h-4 mr-1 text-warning-500" />
              Recompensas
            </h4>
            <div className="flex flex-wrap gap-2">
              {boss.rewards.map((reward, index) => (
                <div 
                  key={index}
                  className={`px-2 py-1 rounded-lg text-xs flex items-center ${
                    isDefeated ? 'bg-warning-100 text-warning-800' : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {reward.name || reward.type}
                  {reward.value && ` (+${reward.value})`}
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