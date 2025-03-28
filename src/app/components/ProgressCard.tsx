import { Progress } from '../types';
import Button from './Button';
import Image from 'next/image';

interface ProgressCardProps {
  progress: Progress;
  onContinue?: (progress: Progress) => void;
}

export default function ProgressCard({ progress, onContinue }: ProgressCardProps) {
  const totalLessons = progress.course.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  );

  const completedLessons = progress.course.modules.reduce(
    (acc, module) =>
      acc +
      module.lessons.filter(lesson =>
        progress.course.students.some(
          student =>
            student.id === progress.user.id &&
            student.progress?.some(p => p.lesson.id === lesson.id && p.completed)
        )
      ).length,
    0
  );

  const progressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{progress.course.title}</h3>
            <p className="text-sm text-gray-500">{progress.course.instructor.name}</p>
          </div>

          <div className="flex-shrink-0 relative h-16 w-16">
            <Image
              src={progress.course.thumbnail}
              alt={progress.course.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Progresso</span>
            <span className="font-medium text-gray-900">{Math.round(progressPercentage)}%</span>
          </div>

          <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="mt-2 text-sm text-gray-500">
            {completedLessons} de {totalLessons} aulas concluídas
          </div>
        </div>

        <div className="mt-6">
          <Button variant="primary" className="w-full" onClick={() => onContinue?.(progress)}>
            Continuar Curso
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Última aula: {progress.lesson.title}</div>
          <div className="text-sm text-gray-500">
            Tempo gasto: {Math.round(progress.timeSpent / 60)} minutos
          </div>
        </div>
      </div>
    </div>
  );
}
