'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useAchievementUnlock } from '@/hooks/useAchievementUnlock';
import { useLessonCountAchievements } from '@/hooks/useLessonCountAchievements';
import { LessonComments } from './LessonComments';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string;
    image?: string;
  };
}

interface LessonContentProps {
  courseId: string;
  lessonId: string;
  title: string;
  content: string;
  videoUrl?: string;
  previousLessonId?: string;
  nextLessonId?: string;
}

export function LessonContent({
  courseId,
  lessonId,
  title,
  content,
  videoUrl,
  previousLessonId,
  nextLessonId,
}: LessonContentProps) {
  const router = useRouter();
  const { progress, isLoading: progressLoading, updateProgress } = useLessonProgress({ lessonId });
  const { progress: courseProgress } = useCourseProgress({ courseId });
  const { checkAndUnlockAchievement } = useAchievementUnlock();
  useLessonCountAchievements();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/lessons/${lessonId}/comments`);
        (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())response.ok) throw new Error('Erro ao buscar comentários');
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
    };

    fetchComments();
  }, [lessonId]);

  const handleComplete = async () => {
    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())progress?.completed) {
      await updateProgress(true);
      checkAndUnlockAchievement('FirstLesson');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{title}</h1>
        {progress?.completed && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span>Aula concluída</span>
          </div>
        )}
      </div>

      {videoUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src={videoUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <Card className="p-6">
        <div className="prose prose-sm max-w-none">{content}</div>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push(`/cursos/${courseId}/aulas/${previousLessonId}`)}
          (disabled={ ?? (() => { throw new Error('Valor não pode ser nulo') })())previousLessonId}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Aula anterior
        </Button>

        <div className="flex items-center gap-4">
          ({ ?? (() => { throw new Error('Valor não pode ser nulo') })())progress?.completed && <Button onClick={handleComplete}>Marcar como concluída</Button>}

          <Button
            variant="outline"
            onClick={() => router.push(`/cursos/${courseId}/aulas/${nextLessonId}`)}
            (disabled={ ?? (() => { throw new Error('Valor não pode ser nulo') })())nextLessonId}
          >
            Próxima aula
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <LessonComments lessonId={lessonId} comments={comments} />
    </div>
  );
}