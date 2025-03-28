import { prisma } from '@/lib/prisma';
import { getCache, setCache, deleteCache, generateCacheKey } from '@/lib/redis';
import type { Course } from '.prisma/client';

const CACHE_TTL = 3600; // 1 hora em segundos

export async function getCourse(id: string): Promise<Course | null> {
  // Tenta buscar do cache primeiro
  const cacheKey = generateCacheKey('course', id);
  const cachedCourse = await getCache<Course>(cacheKey);

  if (cachedCourse) {
    return cachedCourse;
  }

  // Se não estiver no cache, busca do banco
  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (course) {
    // Salva no cache para próximas requisições
    await setCache(cacheKey, course, CACHE_TTL);
  }

  return course;
}

export async function listCourses(page = 1, limit = 10) {
  const cacheKey = generateCacheKey('courses', `page-${page}`, `limit-${limit}`);
  const cachedCourses = await getCache<{
    courses: Course[];
    total: number;
  }>(cacheKey);

  if (cachedCourses) {
    return cachedCourses;
  }

  const skip = (page - 1) * limit;

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.course.count(),
  ]);

  const result = { courses, total };
  await setCache(cacheKey, result, CACHE_TTL);

  return result;
}

export async function createCourse(data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) {
  const course = await prisma.course.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Invalida caches relacionados a listagens
  await deleteCache('courses:*');

  return course;
}

export async function updateCourse(id: string, data: Partial<Course>) {
  const course = await prisma.course.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });

  // Invalida caches específicos
  await deleteCache(generateCacheKey('course', id));
  await deleteCache('courses:*');

  return course;
}

export async function deleteCourse(id: string) {
  await prisma.course.delete({
    where: { id },
  });

  // Invalida caches
  await deleteCache(generateCacheKey('course', id));
  await deleteCache('courses:*');
}
