import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Course } from '@prisma/client';

interface CourseCardProps {
  course: Course & {
    instructor: {
      name: string;
    };
    _count: {
      lessons: number;
      enrollments: number;
    };
    averageRating: number;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={course.thumbnail || '/placeholder-course.jpg'}
            alt={course.title}
            fill
            className="object-cover rounded-t-lg"
          />
          {course.isPublished && (
            <Badge className="absolute top-2 right-2" variant="secondary">
              Publicado
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{course.category}</Badge>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm">{course.averageRating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{course._count.lessons} aulas</span>
          <span>{course._count.enrollments} alunos</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Instrutor</span>
            <span className="font-medium">{course.instructor.name}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-muted-foreground">Preço</span>
            <span className="font-medium text-lg">
              {course.price === 0 ? 'Gratuito' : formatCurrency(course.price)}
            </span>
          </div>
        </div>
      </CardFooter>
      <div className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/cursos/${course.id}`}>Ver Curso</Link>
        </Button>
      </div>
    </Card>
  );
}
