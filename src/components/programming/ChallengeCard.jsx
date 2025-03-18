// src/components/programming/ChallengeCard.jsx
import React from 'react';
import { Code, Clock, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

const ChallengeCard = ({ 
  challenge, 
  onStart, 
  onContinue,
  className = '' 
}) => {
  // Renderizar badge de nível
  const renderLevelBadge = (level) => {
    switch (level.toLowerCase()) {
      case 'iniciante':
        return <Badge variant="success">{level}</Badge>;
      case 'intermediário':
        return <Badge variant="warning">{level}</Badge>;
      case 'avançado':
        return <Badge variant="danger">{level}</Badge>;
      default:
        return <Badge>{level}</Badge>;
    }
  };
  
  // Verificar se o desafio está bloqueado
  const isLocked = challenge.locked || false;
  
  // Iniciar ou continuar o desafio
  const handleAction = () => {
    if (isLocked) return;
    
    if (challenge.progress > 0 && challenge.progress < 100) {
      onContinue(challenge.id);
    } else {
      onStart(challenge.id);
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`h-full ${isLocked ? 'opacity-60' : ''} ${className}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{challenge.title}</h3>
            {renderLevelBadge(challenge.level)}
          </div>
          <p className="text-neutral-600 text-sm mt-2 mb-4">{challenge.description}</p>
          
          <div className="flex justify-between items-center text-sm text-neutral-500 mb-4">
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1" />
              <span>{challenge.points} pontos</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{challenge.estimatedTime}</span>
            </div>
          </div>
          
          {challenge.completed ? (
            <div className="mt-auto">
              <Badge variant="success" className="mb-2">Completado</Badge>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleAction}
              >
                Refazer desafio
              </Button>
            </div>
          ) : (
            <div className="mt-auto">
              {challenge.progress > 0 && (
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <ProgressBar value={challenge.progress} max={100} />
                </div>
              )}
              
              {isLocked ? (
                <div className="bg-neutral-100 p-3 rounded-lg text-center">
                  <p className="text-sm text-neutral-600 mb-2">
                    Complete os desafios anteriores para desbloquear
                  </p>
                  <Badge variant="neutral">Bloqueado</Badge>
                </div>
              ) : (
                <Button 
                  onClick={handleAction}
                  icon={<Code className="w-4 h-4" />}
                  className="w-full"
                >
                  {challenge.progress > 0 ? 'Continuar' : 'Iniciar desafio'}
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ChallengeCard;