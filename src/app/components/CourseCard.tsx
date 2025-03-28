import Image from 'next/image';
import Link from 'next/link';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/cursos/${course.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48">
          <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={course.instructor.image || '/default-avatar.png'}
                alt={course.instructor.name}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
              <span className="text-sm text-gray-600">{course.instructor.name}</span>
            </div>
            {course.price && (
              <span className="text-sm font-semibold text-primary">
                R$ {course.price.toFixed(2)}
              </span>
            )}
          </div>
          {course.tags && course.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {course.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
