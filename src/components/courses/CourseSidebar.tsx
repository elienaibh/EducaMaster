import { Course } from '@prisma/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

interface CourseSidebarProps {
  course: Course & {
    instructor: {
      id: string;
      name: string;
      image: string | null;
      bio: string | null;
    };
    enrollments: {
      userId: string;
    }[];
  };
  isEnrolled: boolean;
}

async function enrollInCourse(courseId: string) {
  'use server';

  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session?.user) {
    redirect('/login');
  }

  await prisma.enrollment.create({
    data: {
      userId: session.user.id,
      courseId,
    },
  });

  redirect(`/cursos/${courseId}`);
}

export function CourseSidebar({ course, isEnrolled }: CourseSidebarProps) {
  return (
    <Card className="p-6 space-y-6">
      {/* Preço e Botão de Matrícula */}
      <div className="space-y-4">
        <div className="text-3xl font-bold">
          {course.price === 0 ? 'Gratuito' : formatCurrency(course.price)}
        </div>
        ({ ?? (() => { throw new Error('Valor não pode ser nulo') })())isEnrolled && (
          <form action={enrollInCourse.bind(null, course.id)}>
            <Button className="w-full" size="lg">
              Matricular-se
            </Button>
          </form>
        )}
      </div>

      {/* Informações do Curso */}
      <div className="space-y-4">
        <h3 className="font-semibold">O que você aprenderá</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Acesso vitalício ao curso</li>
          <li>• Certificado de conclusão</li>
          <li>• Suporte do instrutor</li>
          <li>• Acesso em dispositivos móveis</li>
        </ul>
      </div>

      {/* Instrutor */}
      <div className="space-y-4">
        <h3 className="font-semibold">Instrutor</h3>
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <img
              src={course.instructor.image || '/placeholder-avatar.jpg'}
              alt={course.instructor.name}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{course.instructor.name}</div>
            {course.instructor.bio && (
              <p className="text-sm text-muted-foreground line-clamp-2">{course.instructor.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="space-y-4">
        <h3 className="font-semibold">Informações do Curso</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div>• {course.lessons.length} aulas</div>
          <div>• {course.enrollments.length} alunos matriculados</div>
          <div>• Nível: {course.level}</div>
          <div>• Categoria: {course.category}</div>
        </div>
      </div>
    </Card>
  );
}