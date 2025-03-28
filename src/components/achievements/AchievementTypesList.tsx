import { Card } from '@/components/ui/card';
import { useAchievementTypes } from '@/hooks/useAchievementTypes';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy } from 'lucide-react';

export function AchievementTypesList() {
  const { achievementTypes, isLoading } = useAchievementTypes();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (achievementTypes.length === 0) {
    return (
      <div className="text-center py-8">
        <Trophy className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Nenhum tipo de conquista cadastrado</h3>
        <p className="text-sm text-muted-foreground mt-2">
          (Adicione tipos de conquistas para começar a usar o sistema ?? (() => { throw new Error('Valor não pode ser nulo') })())
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievementTypes.map(type => (
        <Card key={type.id} className="p-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{type.name}</h3>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}