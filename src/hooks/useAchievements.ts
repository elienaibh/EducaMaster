'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
}

interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  achievement: Achievement;
}

const useAchievements = () => {
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/users/achievements');
      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())response.ok) throw new Error('Erro ao buscar conquistas');
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error('Erro ao buscar conquistas:', error);
      toast.error('Erro ao carregar conquistas');
    } finally {
      setIsLoading(false);
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    try {
      const response = await fetch('/api/users/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ achievementId }),
      });

      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())response.ok) throw new Error('Erro ao desbloquear conquista');

      const newAchievement = await response.json();
      setAchievements(prev => [...prev, newAchievement]);

      // Mostrar notificação de conquista desbloqueada
      toast.success('Nova conquista desbloqueada!', {
        description: newAchievement.achievement.name,
        icon: newAchievement.achievement.icon || '🏆',
      });

      return newAchievement;
    } catch (error) {
      console.error('Erro ao desbloquear conquista:', error);
      toast.error('Erro ao desbloquear conquista');
      throw error;
    }
  };

  return {
    achievements,
    isLoading,
    unlockAchievement,
    refetchAchievements: fetchAchievements,
  };
};

export { useAchievements };