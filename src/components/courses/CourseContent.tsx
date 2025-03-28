import { Course, Lesson } from '@prisma/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { Progress } from '@/components/ui/progress';

interface CourseContentProps {
  course: Course & {
    lessons: Lesson[];
  };
  isEnrolled: boolean;
}

export function CourseContent({ course, isEnrolled }: CourseContentProps) {
  const { progress, isLoading: isLoadingProgress } = useCourseProgress({
    courseId: course.id,
  });

  return (
    <Card className="p-6">
      {/* Progresso do Curso */}
      {isEnrolled && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Progresso do Curso</h3>
            <span className="text-sm text-muted-foreground">
              {progress?.completedLessons} de {progress?.totalLessons} aulas concluídas
            </span>
          </div>
          <Progress value={progress?.percentage || 0} className="h-2" />
        </div>
      )}

      {/* Lista de Aulas */}
      <div className="space-y-4">
        {course.lessons.map(lesson => {
          const isCompleted = progress?.progress.find(p => p.lessonId === lesson.id)?.completed;

          return (
            <div
              key={lesson.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-4">
                {isEnrolled ? (
                  <CheckCircle
                    className={`h-5 w-5 ${
                      isCompleted ? 'text-green-500' : 'text-muted-foreground'
                    }`}
                  />
                ) : (
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <h3 className="font-medium">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                </div>
              </div>
              {isEnrolled ? (
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/cursos/${course.id}/aulas/${lesson.id}`}>Assistir</Link>
                </Button>
              ) : (
                <Button variant="ghost" size="sm" disabled>
                  Bloqueado
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
