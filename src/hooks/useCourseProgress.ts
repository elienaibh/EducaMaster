'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Progress {
  totalLessons: number;
  completedLessons: number;
  percentage: number;
}

interface UseCourseProgressProps {
  courseId: string;
}

export function useCourseProgress({ courseId }: UseCourseProgressProps) {
  const router = useRouter();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProgress = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}/progress`);
      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())response.ok) throw new Error('Erro ao buscar progresso');
      const data = await response.json();
      setProgress(data);
    } catch (error) {
      console.error('Erro ao buscar progresso:', error);
      toast.error('Erro ao buscar progresso do curso');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [courseId]);

  const updateProgress = async (lessonId: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId,
          completed,
        }),
      });

      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())response.ok) {
        throw new Error('Erro ao atualizar progresso');
      }

      await fetchProgress();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar progresso');
    }
  };

  return {
    progress,
    isLoading,
    updateProgress,
  };
}