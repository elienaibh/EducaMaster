import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/config/auth';
import Container from '@/app/components/Container';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';
import Card from '@/app/components/Card';
import Button from '../components/Button';
import { Course, CourseCategory, CourseLevel } from '@/app/types';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cursos | EducaMaster AI',
  description: 'Explore nossa biblioteca de cursos e comece sua jornada de aprendizado hoje.',
};

interface Category {
  id: CourseCategory;
  name: string;
  count: number;
}

interface Level {
  id: CourseLevel;
  name: string;
}

const categories: Category[] = [
  { id: 'programming', name: 'Programação', count: 24 },
  { id: 'design', name: 'Design', count: 18 },
  { id: 'marketing', name: 'Marketing Digital', count: 12 },
  { id: 'business', name: 'Negócios', count: 15 },
  { id: 'data', name: 'Ciência de Dados', count: 9 },
  { id: 'languages', name: 'Idiomas', count: 6 },
];

const levels: Level[] = [
  { id: 'beginner', name: 'Iniciante' },
  { id: 'intermediate', name: 'Intermediário' },
  { id: 'advanced', name: 'Avançado' },
];

const courses: Course[] = [
  {
    id: '1',
    title: 'Desenvolvimento Web Fullstack',
    description: 'Aprenda a criar aplicações web completas com React, Node.js e MongoDB.',
    thumbnail: '/courses/web-dev.jpg',
    instructor: {
      id: '1',
      name: 'João Silva',
      image: '/instructors/joao.jpg',
    },
    modules: [],
    students: [],
    rating: 4.8,
    price: 299.99,
    category: 'programming',
    level: 'intermediate',
    tags: ['React', 'Node.js', 'MongoDB'],
    duration: '80h',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'UI/UX Design na Prática',
    description: 'Aprenda a criar interfaces modernas e experiências de usuário excepcionais.',
    thumbnail: '/courses/ui-ux.jpg',
    instructor: {
      id: '2',
      name: 'Maria Santos',
      image: '/instructors/maria.jpg',
    },
    modules: [],
    students: [],
    rating: 4.9,
    price: 399.99,
    category: 'design',
    level: 'beginner',
    tags: ['Figma', 'Adobe XD', 'Design Systems'],
    duration: '60h',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Marketing Digital Completo',
    description: 'Estratégias e táticas para alavancar sua presença online e gerar resultados.',
    thumbnail: '/courses/marketing.jpg',
    instructor: {
      id: '3',
      name: 'Pedro Oliveira',
      image: '/instructors/pedro.jpg',
    },
    modules: [],
    students: [],
    rating: 4.7,
    price: 449.99,
    category: 'marketing',
    level: 'beginner',
    tags: ['SEO', 'Redes Sociais', 'Google Ads'],
    duration: '40h',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Python para Ciência de Dados',
    description: 'Aprenda a analisar dados e criar modelos de machine learning com Python.',
    thumbnail: '/courses/python.jpg',
    instructor: {
      id: '4',
      name: 'Ana Costa',
      image: '/instructors/ana.jpg',
    },
    modules: [],
    students: [],
    rating: 4.9,
    price: 599.99,
    category: 'data',
    level: 'advanced',
    tags: ['Python', 'Pandas', 'Scikit-learn'],
    duration: '100h',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Gestão de Projetos Ágeis',
    description: 'Metodologias ágeis e ferramentas para gerenciar projetos de forma eficiente.',
    thumbnail: '/courses/agile.jpg',
    instructor: {
      id: '5',
      name: 'Carlos Lima',
      image: '/instructors/carlos.jpg',
    },
    modules: [],
    students: [],
    rating: 4.6,
    price: 349.99,
    category: 'business',
    level: 'intermediate',
    tags: ['Scrum', 'Kanban', 'Lean'],
    duration: '30h',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    title: 'Inglês para Negócios',
    description: 'Desenvolva suas habilidades em inglês com foco em ambiente corporativo.',
    thumbnail: '/courses/english.jpg',
    instructor: {
      id: '6',
      name: 'Laura Silva',
      image: '/instructors/laura.jpg',
    },
    modules: [],
    students: [],
    rating: 4.8,
    price: 299.99,
    category: 'languages',
    level: 'intermediate',
    tags: ['Business English', 'Presentations', 'Meetings'],
    duration: '50h',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Função para buscar cursos com filtros e paginação
async function getFilteredCourses({
  search = '',
  category = '',
  level = '',
  page = 1,
  limit = 9,
}: {
  search?: string;
  category?: string;
  level?: string;
  page?: number;
  limit?: number;
}): Promise<{ courses: Course[]; total: number }> {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredCourses = [...courses];

  // Aplicar filtros
  if (search) {
    const searchLower = search.toLowerCase();
    filteredCourses = filteredCourses.filter(
      course =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  if (category) {
    filteredCourses = filteredCourses.filter(
      course => course.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (level) {
    filteredCourses = filteredCourses.filter(
      course => course.level.toLowerCase() === level.toLowerCase()
    );
  }

  // Aplicar paginação
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedCourses = filteredCourses.slice(start, end);

  return {
    courses: paginatedCourses,
    total: filteredCourses.length,
  };
}

// Função para buscar cursos do banco de dados
async function getCoursesFromDB(searchParams: { [key: string]: string | string[] | undefined }) {
  const category = searchParams.category as string;
  const search = searchParams.search as string;
  const sort = searchParams.sort as string;

  const where = {
    published: true,
    ...(category && { category }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ],
    }),
  };

  const orderBy = {
    ...(sort === 'price-asc' && { price: 'asc' }),
    ...(sort === 'price-desc' && { price: 'desc' }),
    ...(sort === 'rating' && { averageRating: 'desc' }),
    ...(sort === 'newest' && { createdAt: 'desc' }),
  };

  const courses = await prisma.course.findMany({
    where,
    orderBy,
    include: {
      instructor: {
        select: {
          name: true,
        },
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
      price: true,
      published: true,
      category: true,
      instructor: true,
      _count: {
        select: {
          lessons: true,
          enrollments: true,
        },
      },
      averageRating: true,
    },
  });

  return courses;
}

export default async function CursosPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  const category = searchParams.category as string;
  const search = searchParams.search as string;
  const sort = searchParams.sort as string;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 9;

  const { courses, total } = await getFilteredCourses({
    search,
    category,
    page,
    limit,
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <Container>
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Cursos Disponíveis</h1>
            <SearchBar
              onSearch={query => {
                // A lógica de busca já está implementada no getFilteredCourses
                console.log('Searching for:', query);
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense fallback={<div>Carregando cursos...</div>}>
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}