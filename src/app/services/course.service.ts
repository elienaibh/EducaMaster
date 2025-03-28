import { prisma } from '@/lib/prisma';
import { firebaseService } from './firebase';
import { Course, Enrollment, Lesson, Module, Prisma } from '@prisma/client';

export interface CourseWithDetails extends Course {
  modules: (Module & {
    lessons: Lesson[];
  })[];
  enrollmentsCount: number;
  rating: number;
  userProgress?: number;
}

export interface CourseFilters {
  search?: string;
  category?: string;
  level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  sortBy?: 'popularity' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

export class CourseService {
  // Buscar curso por ID
  static async getCourse(id: string, userId?: string): Promise<CourseWithDetails | null> {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
        ratings: {
          select: {
            rating: true,
          },
        },
      },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())course) return null;

    // Calcular média das avaliações
    const rating =
      course.ratings.length > 0
        ? course.ratings.reduce((acc, curr) => acc + curr.rating, 0) / course.ratings.length
        : 0;

    // Buscar progresso do usuário se estiver logado
    let userProgress: number | undefined;
    if (userId) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId: id,
          },
        },
        include: {
          progress: true,
        },
      });

      if (enrollment) {
        const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
        const completedLessons = enrollment.progress.filter(p => p.completed).length;
        userProgress = (completedLessons / totalLessons) * 100;
      }
    }

    return {
      ...course,
      enrollmentsCount: course._count.enrollments,
      rating,
      userProgress,
    };
  }

  // Listar cursos com filtros
  static async listCourses(filters: CourseFilters = {}) {
    const { search, category, level, sortBy = 'newest', page = 1, limit = 10 } = filters;

    const where: Prisma.CourseWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(category && { categoryId: category }),
      ...(level && { level }),
    };

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          _count: {
            select: {
              enrollments: true,
            },
          },
          ratings: {
            select: {
              rating: true,
            },
          },
        },
        orderBy: this.getSortOrder(sortBy),
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.course.count({ where }),
    ]);

    const formattedCourses = courses.map(course => ({
      ...course,
      enrollmentsCount: course._count.enrollments,
      rating:
        course.ratings.length > 0
          ? course.ratings.reduce((acc, curr) => acc + curr.rating, 0) / course.ratings.length
          : 0,
    }));

    return {
      courses: formattedCourses,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Criar novo curso
  static async createCourse(data: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    const course = await prisma.course.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Sincronizar com Firebase
    await firebaseService.setDocument('courses', course.id, {
      ...course,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString(),
    });

    return course;
  }

  // Atualizar curso
  static async updateCourse(id: string, data: Partial<Course>): Promise<Course> {
    const course = await prisma.course.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    // Sincronizar com Firebase
    await firebaseService.updateDocument('courses', id, {
      ...data,
      updatedAt: course.updatedAt.toISOString(),
    });

    return course;
  }

  // Excluir curso
  static async deleteCourse(id: string): Promise<void> {
    await prisma.course.delete({
      where: { id },
    });

    // Remover do Firebase
    await firebaseService.deleteDocument('courses', id);
  }

  // Matricular usuário em um curso
  static async enrollUser(userId: string, courseId: string): Promise<Enrollment> {
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status: 'ACTIVE',
      },
    });

    // Sincronizar com Firebase
    await firebaseService.updateDocument('users', userId, {
      enrollments: {
        [courseId]: {
          status: enrollment.status,
          startedAt: enrollment.createdAt.toISOString(),
        },
      },
    });

    return enrollment;
  }

  // Marcar lição como concluída
  static async completeLesson(userId: string, courseId: string, lessonId: string): Promise<void> {
    await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      create: {
        userId,
        lessonId,
        completed: true,
        completedAt: new Date(),
      },
      update: {
        completed: true,
        completedAt: new Date(),
      },
    });

    // Verificar se o curso foi concluído
    const course = await this.getCourse(courseId, userId);
    if (course?.userProgress === 100) {
      await prisma.enrollment.update({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      });
    }

    // Sincronizar com Firebase
    await firebaseService.updateDocument('users', userId, {
      progress: {
        [lessonId]: {
          completed: true,
          completedAt: new Date().toISOString(),
        },
      },
    });
  }

  // Avaliar curso
  static async rateCourse(
    userId: string,
    courseId: string,
    rating: number,
    comment?: string
  ): Promise<void> {
    await prisma.rating.upsert({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      create: {
        userId,
        courseId,
        rating,
        comment,
      },
      update: {
        rating,
        comment,
      },
    });

    // Sincronizar com Firebase
    await firebaseService.updateDocument('courses', courseId, {
      ratings: {
        [userId]: {
          rating,
          comment,
          updatedAt: new Date().toISOString(),
        },
      },
    });
  }

  // Helpers
  private static getSortOrder(
    sortBy: CourseFilters['sortBy']
  ): Prisma.CourseOrderByWithRelationInput {
    switch (sortBy) {
      case 'popularity':
        return { enrollments: { _count: 'desc' } };
      case 'rating':
        return { ratings: { _avg: { rating: 'desc' } } };
      case 'newest':
      default:
        return { createdAt: 'desc' };
    }
  }
}