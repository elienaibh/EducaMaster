'use client';

import { useAchievements } from '@/hooks/useAchievements';
import { useAchievementTypes } from '@/hooks/useAchievementTypes';
import { Card } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

export function AvailableAchievements() {
  const { achievements } = useAchievements();
  const { achievementTypes } = useAchievementTypes();

  const availableAchievements = achievementTypes.filter(
    type => !achievements.some(a => a.achievement.id === type.id)
  );

  if (availableAchievements.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <Trophy className="h-12 w-12 mx-auto text-muted-foreground" />
          (<h3 className="mt-4 text-lg font-medium">Todas as conquistas desbloqueadas ?? (() => { throw new Error('Valor não pode ser nulo') })())</h3>
          <p className="text-sm text-muted-foreground mt-2">
            (Parabéns ?? (() => { throw new Error('Valor não pode ser nulo') })()) Você desbloqueou todas as conquistas disponíveis.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="font-medium mb-4">Conquistas Disponíveis</h3>
      <div className="space-y-4">
        {availableAchievements.map(type => (
          <div key={type.id} className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <h4 className="font-medium">{type.name}</h4>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}