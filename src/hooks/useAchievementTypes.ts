'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface AchievementType {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: string;
}

export function useAchievementTypes() {
  const [achievementTypes, setAchievementTypes] = useState<AchievementType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAchievementTypes();
  }, []);

  const fetchAchievementTypes = async () => {
    try {
      const response = await fetch('/api/achievement-types');
      if (!response.ok) {
        throw new Error('Erro ao buscar tipos de conquistas');
      }
      const data = await response.json();
      setAchievementTypes(data);
    } catch (error) {
      console.error('Erro ao buscar tipos de conquistas:', error);
      toast.error('Erro ao carregar tipos de conquistas');
    } finally {
      setIsLoading(false);
    }
  };

  const createAchievementType = async (data: Omit<AchievementType, 'id'>) => {
    try {
      const response = await fetch('/api/achievement-types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar tipo de conquista');
      }

      const newAchievementType = await response.json();
      setAchievementTypes(prev => [...prev, newAchievementType]);
      toast.success('Tipo de conquista criado com sucesso!');
      return newAchievementType;
    } catch (error) {
      console.error('Erro ao criar tipo de conquista:', error);
      toast.error('Erro ao criar tipo de conquista');
      throw error;
    }
  };

  return {
    achievementTypes,
    isLoading,
    createAchievementType,
  };
}
