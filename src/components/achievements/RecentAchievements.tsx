'use client';

import { useAchievements } from '@/hooks/useAchievements';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

export function RecentAchievements() {
  const { achievements } = useAchievements();

  const recentAchievements = [...achievements]
    .sort((a, b) => b.unlockedAt.getTime() - a.unlockedAt.getTime())
    .slice(0, 3);

  if (recentAchievements.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <Trophy className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Nenhuma conquista ainda</h3>
          <p className="text-sm text-muted-foreground mt-2">
            (Complete cursos e aulas para desbloquear conquistas ?? (() => { throw new Error('Valor não pode ser nulo') })())
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="font-medium mb-4">Conquistas Recentes</h3>
      <div className="space-y-4">
        {recentAchievements.map(achievement => (
          <div key={achievement.id} className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{achievement.achievement.name}</h4>
              <p className="text-sm text-muted-foreground">{achievement.achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}