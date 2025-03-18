// src/components/boss/BossLevel/index.jsx
import React from 'react';
import { Trophy, Star, Shield } from 'lucide-react';
import { useBoss } from '../../../contexts/BossContext';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';

const BossLevel = ({ className = '', ...props }) => {
  const { currentBoss, bossesDefeated = [] } = useBoss();

  // Determinar classe de dificuldade baseada no nível
  const getDifficultyClass = (level) => {
    if (level <= 2) return 'text-success-500';
    if (level <= 5) return 'text-warning-500';
    return 'text-danger-500';
  };

  // Determinar texto de dificuldade baseada no nível
  const getDifficultyText = (level) => {
    if (level <= 2) return 'Fácil';
    if (level <= 5) return 'Médio';
    return 'Difícil';
  };

  return (
    <Card className={className} {...props}>
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <Trophy className="w-5 h-5 text-warning-500 mr-2" />
        Progresso de Boss
      </h3>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-primary-500 mr-2" />
            <span className="font-medium">Boss Atual:</span>
          </div>
          <Badge variant="primary">Nível {currentBoss.level}</Badge>
        </div>
        <div className="p-3 bg-primary-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">{currentBoss.name}</span>
            <span className={`${getDifficultyClass(currentBoss.level)} font-medium`}>
              {getDifficultyText(currentBoss.level)}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Bosses Derrotados</h4>
        {bossesDefeated.length > 0 ? (
          <div className="space-y-2">
            {bossesDefeated.map((boss, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-neutral-50 rounded-lg">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-warning-500 mr-2" />
                  <span>{boss.name}</span>
                </div>
                <Badge variant="success">Nível {boss.level}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-4 bg-neutral-50 rounded-lg text-neutral-500">
            Você ainda não derrotou nenhum Boss.
            Continue estudando para progredir!
          </div>
        )}
      </div>
    </Card>
  );
};

export default BossLevel;