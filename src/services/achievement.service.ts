import { prisma } from '@/lib/prisma';

interface AchievementRequirement {
  type: 'STUDY_STREAK' | 'COURSE_COMPLETION' | 'QUIZ_MASTER' | 'SOCIAL';
  days?: number;
  count?: number;
  score?: number;
  [key: string]: unknown;
}

export class AchievementService {
  // Verificar e conceder conquistas baseadas em eventos
  static async checkAndGrantAchievements(userId: string, eventType: string, eventData: unknown) {
    const achievements = await prisma.achievement.findMany({
      where: { type: eventType },
    });

    for (const achievement of achievements) {
      const requirement = achievement.requirement as AchievementRequirement;
      const isCompleted = await this.checkRequirement(userId, requirement, eventData);

      if (isCompleted) {
        await this.grantAchievement(userId, achievement.id);
      }
    }
  }

  // Verificar se um requisito específico foi cumprido
  private static async checkRequirement(
    userId: string,
    requirement: AchievementRequirement,
    eventData: unknown
  ): Promise<boolean> {
    switch (requirement.type) {
      case 'STUDY_STREAK':
        return this.checkStudyStreak(userId, requirement.days || 0);
      case 'COURSE_COMPLETION':
        return this.checkCourseCompletion(userId, requirement.count || 0);
      case 'QUIZ_MASTER':
        return this.checkQuizMaster(userId, requirement.score || 0);
      case 'SOCIAL':
        return this.checkSocialAchievement(userId, requirement);
      default:
        return false;
    }
  }

  // Verificar streak de estudo
  private static async checkStudyStreak(userId: string, requiredDays: number): Promise<boolean> {
    const events = await prisma.eventoAnalytics.findMany({
      where: {
        userId,
        tipo: 'STUDY_SESSION',
        createdAt: {
          gte: new Date(Date.now() - requiredDays * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    let currentStreak = 0;
    let lastDate: Date | null = null;

    for (const event of events) {
      const eventDate = new Date(event.createdAt);
      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())lastDate) {
        currentStreak = 1;
        lastDate = eventDate;
        continue;
      }

      const dayDifference = Math.floor(
        (lastDate.getTime() - eventDate.getTime()) / (24 * 60 * 60 * 1000)
      );
      if (dayDifference === 1) {
        currentStreak++;
        if (currentStreak >= requiredDays) return true;
      } else if (dayDifference > 1) {
        break;
      }

      lastDate = eventDate;
    }

    return false;
  }

  // Verificar conclusão de cursos
  private static async checkCourseCompletion(
    userId: string,
    requiredCount: number
  ): Promise<boolean> {
    const completedCourses = await prisma.enrollment.count({
      where: {
        userId,
        status: 'COMPLETED',
      },
    });

    return completedCourses >= requiredCount;
  }

  // Verificar pontuação em quizzes
  private static async checkQuizMaster(userId: string, requiredScore: number): Promise<boolean> {
    // Implementar lógica de verificação de quiz quando o sistema de quiz estiver pronto
    return false;
  }

  // Verificar conquistas sociais
  private static async checkSocialAchievement(
    userId: string,
    requirement: AchievementRequirement
  ): Promise<boolean> {
    // Implementar verificações sociais quando o sistema social estiver pronto
    return false;
  }

  // Conceder uma conquista ao usuário
  private static async grantAchievement(userId: string, achievementId: string) {
    const existingAchievement = await prisma.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId,
          achievementId,
        },
      },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())existingAchievement) {
      await prisma.userAchievement.create({
        data: {
          userId,
          achievementId,
        },
      });

      // Notificar o usuário
      await prisma.notification.create({
        data: {
          userId,
          title: 'Nova Conquista Desbloqueada!',
          content: 'Você desbloqueou uma nova conquista! Confira seu perfil.',
        },
      });
    }
  }

  // Obter todas as conquistas do usuário
  static async getUserAchievements(userId: string) {
    return prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
    });
  }

  // Obter progresso de uma conquista específica
  static async getAchievementProgress(userId: string, achievementId: string) {
    const achievement = await prisma.achievement.findUnique({
      where: { id: achievementId },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())achievement) {
      throw new Error('Conquista não encontrada');
    }

    const requirement = achievement.requirement as AchievementRequirement;
    const progress = await this.calculateProgress(userId, requirement);

    return {
      achievement,
      progress,
    };
  }

  // Calcular progresso de um requisito
  private static async calculateProgress(
    userId: string,
    requirement: AchievementRequirement
  ): Promise<number> {
    switch (requirement.type) {
      case 'STUDY_STREAK':
        return this.calculateStudyStreakProgress(userId, requirement.days || 0);
      case 'COURSE_COMPLETION':
        return this.calculateCourseCompletionProgress(userId, requirement.count || 0);
      case 'QUIZ_MASTER':
        return this.calculateQuizMasterProgress(userId, requirement.score || 0);
      case 'SOCIAL':
        return this.calculateSocialProgress(userId, requirement);
      default:
        return 0;
    }
  }

  // Calcular progresso do streak de estudo
  private static async calculateStudyStreakProgress(
    userId: string,
    requiredDays: number
  ): Promise<number> {
    const currentStreak = await this.getCurrentStudyStreak(userId);
    return Math.min(100, (currentStreak / requiredDays) * 100);
  }

  // Obter streak atual de estudo
  private static async getCurrentStudyStreak(userId: string): Promise<number> {
    const events = await prisma.eventoAnalytics.findMany({
      where: {
        userId,
        tipo: 'STUDY_SESSION',
      },
      orderBy: { createdAt: 'desc' },
    });

    let streak = 0;
    let lastDate: Date | null = null;

    for (const event of events) {
      const eventDate = new Date(event.createdAt);
      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())lastDate) {
        streak = 1;
        lastDate = eventDate;
        continue;
      }

      const dayDifference = Math.floor(
        (lastDate.getTime() - eventDate.getTime()) / (24 * 60 * 60 * 1000)
      );
      if (dayDifference === 1) {
        streak++;
      } else if (dayDifference > 1) {
        break;
      }

      lastDate = eventDate;
    }

    return streak;
  }

  // Calcular progresso de conclusão de cursos
  private static async calculateCourseCompletionProgress(
    userId: string,
    requiredCount: number
  ): Promise<number> {
    const completedCourses = await prisma.enrollment.count({
      where: {
        userId,
        status: 'COMPLETED',
      },
    });

    return Math.min(100, (completedCourses / requiredCount) * 100);
  }

  // Calcular progresso de quiz
  private static async calculateQuizMasterProgress(
    userId: string,
    requiredScore: number
  ): Promise<number> {
    // Implementar cálculo de progresso de quiz quando o sistema estiver pronto
    return 0;
  }

  // Calcular progresso social
  private static async calculateSocialProgress(
    userId: string,
    requirement: AchievementRequirement
  ): Promise<number> {
    // Implementar cálculo de progresso social quando o sistema estiver pronto
    return 0;
  }
}