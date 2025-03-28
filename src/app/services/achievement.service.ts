import { prisma } from '@/lib/prisma';
import {
  Achievement as AchievementType,
  AchievementRequirement,
  AchievementProgress,
  UserAchievement as UserAchievementType,
  AchievementRequirementType,
} from '@/app/types/achievement';
import { firebaseService } from './firebase';

interface RawQueryResult {
  count: bigint;
  average_score?: number;
}

interface EventoAnalytics {
  id: string;
  userId: string;
  tipo: string;
  dados: unknown;
  createdAt: Date;
  user: {
    id: string;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: AchievementRequirementType;
  requirement: unknown;
  rarity: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  user: User;
  achievement: Achievement;
}

interface User {
  id: string;
}

interface AchievementWithRequirement extends Omit<Achievement, 'type'> {
  requirement: string;
  title: string;
  description: string;
  icon: string;
  type: AchievementRequirementType;
  rarity: 'comum' | 'raro' | 'épico' | 'lendário';
}

export class AchievementService {
  // Verificar e conceder conquistas baseadas em eventos
  static async checkAndGrantAchievements(
    userId: string,
    eventType: AchievementRequirementType,
    eventData: Record<string, unknown>
  ): Promise<void> {
    const achievements = await prisma.achievement.findMany({
      where: { type: eventType },
    });

    for (const achievement of achievements) {
      const isCompleted = await this.checkRequirement(
        userId,
        achievement.requirement
          ? (JSON.parse(achievement.requirement.toString()) as AchievementRequirement)
          : {
              type: 'STUDY_STREAK',
              days: 0,
            },
        eventData
      );

      if (isCompleted) {
        await this.grantAchievement(userId, achievement.id);
      }
    }
  }

  // Verificar se um requisito específico foi cumprido
  private static async checkRequirement(
    userId: string,
    requirement: AchievementRequirement,
    eventData: Record<string, unknown>
  ): Promise<boolean> {
    switch (requirement.type) {
      case 'STUDY_STREAK':
        return this.checkStudyStreak(userId, requirement.days);
      case 'COURSE_COMPLETION':
        return this.checkCourseCompletion(userId, requirement.count);
      case 'QUIZ_MASTER':
        return this.checkQuizMaster(userId, requirement.score);
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
        user: { id: userId },
        tipo: 'STUDY_SESSION',
        createdAt: {
          gte: new Date(Date.now() - requiredDays * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return this.calculateStreak(events) >= requiredDays;
  }

  // Calcular streak a partir dos eventos
  private static calculateStreak(events: EventoAnalytics[]): number {
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
    const results = await prisma.$queryRaw<{ average_score: number }[]>`
      SELECT AVG(score) as average_score
      FROM "quiz_results"
      WHERE "userId" = ${userId}
    `;

    const averageScore = results[0]?.average_score || 0;
    return averageScore >= requiredScore;
  }

  // Verificar conquistas sociais
  private static async checkSocialAchievement(
    userId: string,
    requirement: Extract<AchievementRequirement, { type: 'SOCIAL' }>
  ): Promise<boolean> {
    const { action, count } = requirement;

    switch (action) {
      case 'FOLLOWERS':
        const followers = await prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*) as count
          FROM "follows"
          WHERE "followingId" = ${userId}
        `;
        return Number(followers[0]?.count || 0) >= count;

      case 'FOLLOWING':
        const following = await prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*) as count
          FROM "follows"
          WHERE "followerId" = ${userId}
        `;
        return Number(following[0]?.count || 0) >= count;

      case 'COMMENTS':
        const comments = await prisma.comment.count({
          where: { userId },
        });
        return comments >= count;

      case 'LIKES':
        const likes = await prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*) as count
          FROM "likes"
          WHERE "userId" = ${userId}
        `;
        return Number(likes[0]?.count || 0) >= count;

      default:
        return false;
    }
  }

  // Conceder uma conquista ao usuário
  private static async grantAchievement(userId: string, achievementId: string): Promise<void> {
    const existingAchievement = await prisma.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId,
          achievementId,
        },
      },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())existingAchievement) {
      const achievement = await prisma.achievement.findUnique({
        where: { id: achievementId },
      });

      (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())achievement) return;

      await prisma.$transaction([
        // Criar o registro da conquista
        prisma.userAchievement.create({
          data: {
            userId,
            achievementId,
            unlockedAt: new Date(),
          },
        }),

        // Criar notificação
        prisma.notification.create({
          data: {
            userId,
            title: 'Nova Conquista Desbloqueada!',
            (content: `Você desbloqueou a conquista "${achievement.title}" ?? (() => { throw new Error('Valor não pode ser nulo') })())`,
            read: false,
          },
        }),
      ]);

      // Atualizar cache do Firebase
      await firebaseService.updateDocument('users', userId, {
        achievements: {
          [achievementId]: {
            unlockedAt: new Date().toISOString(),
          },
        },
      });
    }
  }

  // Obter todas as conquistas do usuário
  static async getUserAchievements(userId: string): Promise<UserAchievementType[]> {
    const achievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
    });

    return achievements.map((ua: UserAchievement) => ({
      userId: ua.userId,
      achievementId: ua.achievementId,
      unlockedAt: ua.unlockedAt,
      achievement: {
        id: ua.achievement.id,
        title: ua.achievement.title,
        description: ua.achievement.description,
        icon: ua.achievement.icon,
        type: ua.achievement.type as AchievementRequirementType,
        requirement: ua.achievement.requirement
          ? (JSON.parse(ua.achievement.requirement.toString()) as AchievementRequirement)
          : {
              type: 'STUDY_STREAK',
              days: 0,
            },
        rarity: ua.achievement.rarity as 'comum' | 'raro' | 'épico' | 'lendário',
        createdAt: ua.achievement.createdAt,
        updatedAt: ua.achievement.updatedAt,
      },
    }));
  }

  // Obter progresso de uma conquista específica
  static async getAchievementProgress(
    userId: string,
    achievementId: string
  ): Promise<AchievementProgress> {
    const achievement = (await prisma.achievement.findUnique({
      where: { id: achievementId },
    })) as AchievementWithRequirement | null;

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())achievement) {
      throw new Error('Conquista não encontrada');
    }

    const requirement = JSON.parse(achievement.requirement) as AchievementRequirement;

    const progress = await this.calculateProgress(userId, requirement);
    const isCompleted = await this.checkRequirement(userId, requirement, {});

    return {
      achievement: {
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon,
        type: achievement.type as AchievementRequirementType,
        requirement,
        rarity: achievement.rarity,
        createdAt: achievement.createdAt,
        updatedAt: achievement.updatedAt,
      },
      progress,
      isCompleted,
    };
  }

  // Calcular progresso geral
  private static async calculateProgress(
    userId: string,
    requirement: AchievementRequirement
  ): Promise<number> {
    switch (requirement.type) {
      case 'STUDY_STREAK':
        return this.calculateStudyStreakProgress(userId, requirement.days);
      case 'COURSE_COMPLETION':
        return this.calculateCourseCompletionProgress(userId, requirement.count);
      case 'QUIZ_MASTER':
        return this.calculateQuizMasterProgress(userId, requirement.score);
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
    const events = await prisma.eventoAnalytics.findMany({
      where: {
        user: { id: userId },
        tipo: 'STUDY_SESSION',
        createdAt: {
          gte: new Date(Date.now() - requiredDays * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const currentStreak = this.calculateStreak(events);
    return Math.min(currentStreak / requiredDays, 1);
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

    return Math.min(completedCourses / requiredCount, 1);
  }

  // Calcular progresso de pontuação em quizzes
  private static async calculateQuizMasterProgress(
    userId: string,
    requiredScore: number
  ): Promise<number> {
    const results = await prisma.$queryRaw<{ average_score: number }[]>`
      SELECT AVG(score) as average_score
      FROM "quiz_results"
      WHERE "userId" = ${userId}
    `;

    const averageScore = results[0]?.average_score || 0;
    return Math.min(averageScore / requiredScore, 1);
  }

  // Calcular progresso de conquistas sociais
  private static async calculateSocialProgress(
    userId: string,
    requirement: Extract<AchievementRequirement, { type: 'SOCIAL' }>
  ): Promise<number> {
    const { action, count } = requirement;

    switch (action) {
      case 'FOLLOWERS':
        const followers = await prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*) as count
          FROM "follows"
          WHERE "followingId" = ${userId}
        `;
        return Math.min(Number(followers[0]?.count || 0) / count, 1);

      case 'FOLLOWING':
        const following = await prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*) as count
          FROM "follows"
          WHERE "followerId" = ${userId}
        `;
        return Math.min(Number(following[0]?.count || 0) / count, 1);

      case 'COMMENTS':
        const comments = await prisma.comment.count({
          where: { userId },
        });
        return Math.min(comments / count, 1);

      case 'LIKES':
        const likes = await prisma.$queryRaw<{ count: bigint }[]>`
          SELECT COUNT(*) as count
          FROM "likes"
          WHERE "userId" = ${userId}
        `;
        return Math.min(Number(likes[0]?.count || 0) / count, 1);

      default:
        return 0;
    }
  }
}