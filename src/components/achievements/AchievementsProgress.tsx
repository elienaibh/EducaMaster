'use client';

import { useAchievements } from '@/hooks/useAchievements';
import { useAchievementTypes } from '@/hooks/useAchievementTypes';
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';

export function AchievementsProgress() {
  const { achievements } = useAchievements();
  const { achievementTypes } = useAchievementTypes();

  const totalAchievements = achievementTypes.length;
  const unlockedAchievements = achievements.length;
  const progress = (unlockedAchievements / totalAchievements) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <span className="font-medium">Conquistas</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {unlockedAchievements} de {totalAchievements}
        </span>
      </div>
      <Progress value={progress} />
    </div>
  );
}
