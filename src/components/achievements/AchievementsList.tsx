'use client';

import { Card } from '@/components/ui/card';
import { useAchievements } from '@/hooks/useAchievements';
import { Trophy } from 'lucide-react';

export function AchievementsList() {
  const { achievements, isLoading } = useAchievements();

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <p>Carregando conquistas...</p>
        </div>
      </Card>
    );
  }

  if (achievements.length === 0) {
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
      <h3 className="font-medium mb-4">Suas Conquistas</h3>
      <div className="space-y-4">
        {achievements.map(achievement => (
          <div key={achievement.id} className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{achievement.achievement.name}</h4>
              <p className="text-sm text-muted-foreground">{achievement.achievement.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Desbloqueada em {achievement.unlockedAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}