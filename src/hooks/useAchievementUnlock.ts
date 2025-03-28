import { useAchievements } from './useAchievements';
import { useEffect } from 'react';

export function useAchievementUnlock() {
  const { achievements, unlockAchievement } = useAchievements();

  const checkAndUnlockAchievement = async (achievementName: string) => {
    const hasAchievement = achievements.some(
      userAchievement => userAchievement.achievement.name === achievementName
    );

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())hasAchievement) {
      // Buscar o ID da conquista pelo nome
      const response = await fetch('/api/achievements');
      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())response.ok) throw new Error('Erro ao buscar conquistas');
      const allAchievements = await response.json();

      const achievement = allAchievements.find((a: { name: string }) => a.name === achievementName);

      if (achievement) {
        await unlockAchievement(achievement.id);
      }
    }
  };

  return {
    checkAndUnlockAchievement,
  };
}