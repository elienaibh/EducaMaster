import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { RecentAchievements } from '@/components/achievements/RecentAchievements';
import { CourseCard } from '@/components/courses/CourseCard';
import { prisma } from '@/lib/prisma';

async function getCourses() {
  const courses = await prisma.course.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return courses;
}

export default async function HomePage() {
  const courses = await getCourses();

  return (
    <Container>
      <div className="py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-8">Cursos em Destaque</h1>
            <div className="grid gap-6 sm:grid-cols-2">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
          <div>
            <RecentAchievements />
          </div>
        </div>
      </div>
    </Container>
  );
}
