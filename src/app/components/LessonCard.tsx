import { Lesson } from '../types';
import Button from './Button';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted?: boolean;
  onStart?: (lesson: Lesson) => void;
}

export default function LessonCard({ lesson, isCompleted = false, onStart }: LessonCardProps) {
  return (
    <div
      className={`relative rounded-lg border p-6 ${
        isCompleted ? 'border-primary-200 bg-primary-50' : 'border-gray-200 bg-white'
      }`}
    >
      {isCompleted && (
        <div className="absolute top-4 right-4">
          <svg
            className="h-6 w-6 text-primary-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      )}

      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div
            className={`rounded-lg p-3 ${
              lesson.type === 'video'
                ? 'bg-red-100'
                : lesson.type === 'quiz'
                  ? 'bg-yellow-100'
                  : 'bg-blue-100'
            }`}
          >
            <svg
              className={`h-6 w-6 ${
                lesson.type === 'video'
                  ? 'text-red-600'
                  : lesson.type === 'quiz'
                    ? 'text-yellow-600'
                    : 'text-blue-600'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {lesson.type === 'video' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              ) : lesson.type === 'quiz' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              )}
            </svg>
          </div>
        </div>

        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{lesson.description}</p>

          <div className="mt-4 flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {Math.round(lesson.duration / 60)} minutos
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant={isCompleted ? 'outline' : 'primary'}
          className="w-full"
          onClick={() => onStart?.(lesson)}
        >
          {isCompleted ? 'Rever Aula' : 'Iniciar Aula'}
        </Button>
      </div>
    </div>
  );
}
