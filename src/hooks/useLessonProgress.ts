'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Progress {
  completed: boolean;
  completedAt?: Date;
}

interface UseLessonProgressProps {
  lessonId: string;
}

export function useLessonProgress({ lessonId }: UseLessonProgressProps) {
  const router = useRouter();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/lessons/${lessonId}/progress`);
        (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())response.ok) throw new Error('Erro ao buscar progresso');
        const data = await response.json();
        setProgress(data);
      } catch (error) {
        console.error('Erro ao buscar progresso:', error);
        toast.error('Erro ao buscar progresso da aula');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [lessonId]);

  const updateProgress = async (completed: boolean) => {
    try {
      const response = await fetch(`/api/lessons/${lessonId}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });

      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())response.ok) throw new Error('Erro ao atualizar progresso');

      const data = await response.json();
      setProgress(data);
      router.refresh();
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
      toast.error('Erro ao atualizar progresso da aula');
    }
  };

  return {
    progress,
    isLoading,
    updateProgress,
  };
}