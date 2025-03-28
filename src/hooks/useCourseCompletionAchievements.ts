import { useEffect } from 'react';
import { useAchievementUnlock } from './useAchievementUnlock';

interface UseCourseCompletionAchievementsProps {
  completedCoursesCount: number;
}

export function useCourseCompletionAchievements({
  completedCoursesCount,
}: UseCourseCompletionAchievementsProps) {
  const { checkAndUnlockAchievement } = useAchievementUnlock();

  useEffect(() => {
    if (completedCoursesCount >= 1) {
      checkAndUnlockAchievement('Iniciante');
    }

    if (completedCoursesCount >= 3) {
      checkAndUnlockAchievement('Aprendiz');
    }

    if (completedCoursesCount >= 5) {
      checkAndUnlockAchievement('Especialista');
    }

    if (completedCoursesCount >= 10) {
      checkAndUnlockAchievement('Mestre');
    }
  }, [completedCoursesCount, checkAndUnlockAchievement]);
}
