import { Course, Lesson } from '@prisma/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface LessonSidebarProps {
  course: Course & {
    lessons: Lesson[];
  };
  currentLessonId: string;
}

async function getProgress(courseId: string) {
  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session?.user) {
    return {};
  }

  const progress = await prisma.progress.findMany({
    where: {
      userId: session.user.id,
      courseId,
    },
    select: {
      lessonId: true,
      completed: true,
    },
  });

  return progress.reduce(
    (acc, curr) => {
      acc[curr.lessonId] = curr.completed;
      return acc;
    },
    {} as Record<string, boolean>
  );
}

export async function LessonSidebar({ course, currentLessonId }: LessonSidebarProps) {
  const progress = await getProgress(course.id);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Conteúdo do Curso</h2>
      <div className="space-y-2">
        {course.lessons.map(lesson => {
          const isCompleted = progress[lesson.id];
          const isCurrent = lesson.id === currentLessonId;

          return (
            <Button
              key={lesson.id}
              asChild
              variant={isCurrent ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-2 h-auto py-2 px-4"
            >
              <Link href={`/cursos/${course.id}/aulas/${lesson.id}`}>
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <PlayCircle className="h-4 w-4" />
                )}
                <span className="text-left truncate">{lesson.title}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}