// src/components/boss/BossSelection/index.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Skull, Star, ArrowRight } from 'lucide-react';
import { useBoss } from '../../../contexts/BossContext';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';

const BossSelection = ({ onSelect, className = '', ...props }) => {
  const { currentBoss, availableBosses = [], advanceToBoss } = useBoss();
  const [selectedBoss, setSelectedBoss] = useState(null);

  // Verificar se um boss está bloqueado
  const isBossLocked = (boss) => {
    // Bosses de nível mais alto que o atual + 1 estão bloqueados
    return boss.level > currentBoss.level + 1;
  };

  // Selecionar um boss
  const handleSelectBoss = (boss) => {
    if (isBossLocked(boss)) return;
    setSelectedBoss(boss);
  };

  // Confirmar a seleção
  const handleConfirmSelection = () => {
    if (!selectedBoss) return;
    
    advanceToBoss(selectedBoss.id);
    
    if (onSelect) {
      onSelect(selectedBoss);
    }
  };

  return (
    <Card className={className} {...props}>
      <h3 className="text-lg font-bold mb-4">Selecionar Boss</h3>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Boss Atual</h4>
        <div className="p-3 bg-primary-50 rounded-lg flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-danger-500 mr-2" />
            <span>{currentBoss.name}</span>
          </div>
          <Badge variant="primary">Nível {currentBoss.level}</Badge>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Bosses Disponíveis</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {availableBosses.map((boss) => {
            const isLocked = isBossLocked(boss);
            const isSelected = selectedBoss && selectedBoss.id === boss.id;
            
            return (
              <motion.div
                key={boss.id}
                whileHover={!isLocked ? { scale: 1.02 } : {}}
                className={`p-3 rounded-lg border cursor-pointer ${
                  isLocked 
                    ? 'border-neutral-200 bg-neutral-50 opacity-60' 
                    : isSelected
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-neutral-200 hover:border-primary-200 hover:bg-primary-50'
                }`}
                onClick={() => handleSelectBoss(boss)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {isLocked ? (
                      <Skull className="w-4 h-4 text-neutral-400 mr-2" />
                    ) : (
                      <Shield className="w-4 h-4 text-danger-500 mr-2" />
                    )}
                    <span className={isLocked ? 'text-neutral-400' : ''}>{boss.name}</span>
                  </div>
                  <Badge variant={isLocked ? 'neutral' : 'primary'}>Nível {boss.level}</Badge>
                </div>
                
                {isLocked && (
                  <div className="text-xs text-neutral-500 mt-2">
                    Derrote o Boss atual para desbloquear
                  </div>
                )}
                
                {boss.rewards && boss.rewards.length > 0 && !isLocked && (
                  <div className="flex items-center mt-2">
                    <Star className="w-3 h-3 text-warning-500 mr-1" />
                    <span className="text-xs text-warning-600">
                      {boss.rewards.length} recompensas disponíveis
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <Button
        disabled={!selectedBoss}
        onClick={handleConfirmSelection}
        className="w-full"
        icon={<ArrowRight className="w-4 h-4" />}
        iconPosition="right"
      >
        Avançar para Boss Selecionado
      </Button>
    </Card>
  );
};

export default BossSelection;