import { useCourseProgress } from './useCourseProgress';
import { useAchievementUnlock } from './useAchievementUnlock';
import { useEffect } from 'react';

export function useLessonCountAchievements() {
  const { progress } = useCourseProgress();
  const { checkAndUnlockAchievement } = useAchievementUnlock();

  useEffect(() => {
    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())progress) return;

    const completedLessons = progress.completedLessons.length;

    if (completedLessons >= 10) {
      checkAndUnlockAchievement('Estudante Dedicado');
    }

    if (completedLessons >= 25) {
      checkAndUnlockAchievement('Estudante Avançado');
    }

    if (completedLessons >= 50) {
      checkAndUnlockAchievement('Mestre do Conhecimento');
    }

    if (completedLessons >= 100) {
      checkAndUnlockAchievement('Sábio');
    }
  }, [progress, checkAndUnlockAchievement]);
}