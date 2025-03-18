// src/components/boss/DamageLog/index.jsx
import React from 'react';
import { Clock, Zap, Shield, Sword, Award } from 'lucide-react';
import { useBoss } from '../../../contexts/BossContext';
import Card from '../../ui/Card';
import Badge from '../../ui/Badge';

const DamageLog = ({ maxEntries = 5, className = '', ...props }) => {
  const { damageHistory = [] } = useBoss();

  // Obter as últimas entradas do histórico
  const recentDamage = [...damageHistory]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, maxEntries);

  // Obter ícone baseado no tipo de dano
  const getDamageIcon = (source) => {
    switch (source) {
      case 'quiz':
        return <Sword className="w-4 h-4 text-primary-500" />;
      case 'flashcard':
        return <Zap className="w-4 h-4 text-secondary-500" />;
      case 'programming':
        return <Shield className="w-4 h-4 text-success-500" />;
      case 'language':
        return <Award className="w-4 h-4 text-warning-500" />;
      default:
        return <Zap className="w-4 h-4 text-neutral-500" />;
    }
  };

  // Formatar a data relativa (ex: "2 horas atrás")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'agora mesmo';
    if (diffMin < 60) return `${diffMin} min atrás`;
    if (diffHour < 24) return `${diffHour} h atrás`;
    if (diffDay < 7) return `${diffDay} dia${diffDay !== 1 ? 's' : ''} atrás`;
    
    return date.toLocaleDateString();
  };

  // Obter nome amigável para o tipo de dano
  const getDamageSourceName = (source) => {
    switch (source) {
      case 'quiz':
        return 'Quiz';
      case 'flashcard':
        return 'Flashcards';
      case 'programming':
        return 'Programação';
      case 'language':
        return 'Idiomas';
      case 'manual_attack':
        return 'Ataque Manual';
      default:
        return source;
    }
  };

  return (
    <Card className={className} {...props}>
      <h3 className="text-lg font-bold mb-4">Registro de Dano</h3>
      
      {recentDamage.length > 0 ? (
        <div className="space-y-3">
          {recentDamage.map((damage) => (
            <div key={damage.id} className="p-3 border rounded-lg border-neutral-200">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="mt-0.5 mr-3">{getDamageIcon(damage.source)}</div>
                  <div>
                    <p className="font-medium">
                      {getDamageSourceName(damage.source)}
                    </p>
                    <div className="flex items-center text-sm text-neutral-500 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{formatRelativeTime(damage.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="danger">-{damage.amount} HP</Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4 bg-neutral-50 rounded-lg text-neutral-500">
          Nenhum dano registrado recentemente.
          Complete quizzes, flashcards e desafios para causar dano ao Boss!
        </div>
      )}
      
      {damageHistory.length > maxEntries && (
        <div className="text-center mt-3">
          <Button variant="ghost" size="sm">
            Ver histórico completo
          </Button>
        </div>
      )}
    </Card>
  );
};

export default DamageLog;