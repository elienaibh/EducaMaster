'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Medal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface RankingUser {
  id: string;
  name: string;
  image: string | null;
  points: number;
  position: number;
}

export function AchievementsRanking() {
  const [users, setUsers] = useState<RankingUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('/api/users/ranking');
        (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())response.ok) throw new Error('Erro ao buscar ranking');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao buscar ranking:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="font-medium mb-4">Ranking de Conquistas</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <Trophy className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Nenhum usuário no ranking</h3>
          <p className="text-sm text-muted-foreground mt-2">
            (Complete conquistas para aparecer no ranking ?? (() => { throw new Error('Valor não pode ser nulo') })())
          </p>
        </div>
      </Card>
    );
  }

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return position;
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-medium mb-4">Ranking de Conquistas</h3>
      <div className="space-y-4">
        {users.map(user => (
          <div key={user.id} className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg">
              {getMedalIcon(user.position)}
            </div>
            <div>
              <h4 className="font-medium">{user.name}</h4>
              <p className="text-sm text-muted-foreground">{user.points} pontos</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}