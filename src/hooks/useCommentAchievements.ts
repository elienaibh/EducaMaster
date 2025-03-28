import { useAchievementUnlock } from './useAchievementUnlock';
import { useEffect } from 'react';

export function useCommentAchievements(commentCount: number) {
  const { checkAndUnlockAchievement } = useAchievementUnlock();

  useEffect(() => {
    if (commentCount >= 5) {
      checkAndUnlockAchievement('Comentarista');
    }

    if (commentCount >= 20) {
      checkAndUnlockAchievement('Super Comentarista');
    }

    if (commentCount >= 50) {
      checkAndUnlockAchievement('Mestre dos Comentários');
    }
  }, [commentCount, checkAndUnlockAchievement]);
}
