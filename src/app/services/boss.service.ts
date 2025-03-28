import { prisma } from '@/lib/prisma';
import { firebaseService } from './firebase';
import type { Boss, BossBattle, BossReward, Prisma } from '@prisma/client';

export interface BossWithRewards extends Boss {
  rewards: BossReward[];
}

export enum RewardType {
  EXPERIENCE = 'EXPERIENCE',
  COINS = 'COINS',
  ITEM = 'ITEM',
}

export class BossService {
  // Criar um novo chefe para um curso
  static async createBoss(data: {
    name: string;
    description: string;
    level: number;
    health: number;
    attack: number;
    defense: number;
    rewards: Omit<BossReward, 'id' | 'bossId' | 'createdAt' | 'updatedAt'>[];
    courseId: string;
  }): Promise<BossWithRewards> {
    const boss = await prisma.boss.create({
      data: {
        ...data,
        maxHealth: data.health,
        experience: data.level * 100,
        isDefeated: false,
        rewards: {
          createMany: {
            data: data.rewards,
          },
        },
      },
      include: {
        rewards: true,
      },
    });

    await firebaseService.setDocument('bosses', boss.id, boss);
    return boss;
  }

  // Obter um chefe específico
  static async getBoss(bossId: string): Promise<BossWithRewards | null> {
    return prisma.boss.findUnique({
      where: { id: bossId },
      include: {
        rewards: true,
      },
    });
  }

  // Listar chefes de um curso
  static async listCourseBosses(courseId: string): Promise<BossWithRewards[]> {
    return prisma.boss.findMany({
      where: { courseId },
      include: {
        rewards: true,
      },
      orderBy: { level: 'asc' },
    });
  }

  // Atacar um chefe
  static async attackBoss(
    userId: string,
    bossId: string,
    damage: number
  ): Promise<{ battle: BossBattle; boss: BossWithRewards; rewards?: BossReward[] }> {
    // Obter o chefe
    const boss = await prisma.boss.findUnique({
      where: { id: bossId },
      include: {
        rewards: true,
      },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())boss) {
      throw new Error('Chefe não encontrado');
    }

    if (boss.isDefeated) {
      throw new Error('Este chefe já foi derrotado');
    }

    // Calcular dano efetivo considerando a defesa do chefe
    const effectiveDamage = Math.max(1, damage - boss.defense);
    const newHealth = Math.max(0, boss.health - effectiveDamage);
    const isVictory = newHealth === 0;

    // Registrar a batalha
    const battle = await prisma.bossBattle.create({
      data: {
        bossId,
        userId,
        damage: effectiveDamage,
        isVictory,
        timestamp: new Date(),
      },
    });

    // Atualizar o estado do chefe
    const updatedBoss = await prisma.boss.update({
      where: { id: bossId },
      data: {
        health: newHealth,
        isDefeated: isVictory,
      },
      include: {
        rewards: true,
      },
    });

    await firebaseService.updateDocument('bosses', bossId, updatedBoss);

    // Se o chefe foi derrotado, retornar as recompensas
    if (isVictory) {
      return {
        battle,
        boss: updatedBoss,
        rewards: updatedBoss.rewards,
      };
    }

    return { battle, boss: updatedBoss };
  }

  // Obter histórico de batalhas de um usuário
  static async getUserBattles(userId: string, limit = 10): Promise<BossBattle[]> {
    return prisma.bossBattle.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: limit,
    });
  }

  // Obter ranking de dano contra um chefe
  static async getBossDamageRanking(
    bossId: string,
    limit = 10
  ): Promise<{ userId: string; totalDamage: number }[]> {
    const ranking = await prisma.bossBattle.groupBy({
      by: ['userId'],
      where: { bossId },
      _sum: {
        damage: true,
      },
      orderBy: {
        _sum: {
          damage: 'desc',
        },
      },
      take: limit,
    });

    return ranking.map(entry => ({
      userId: entry.userId,
      totalDamage: entry._sum.damage || 0,
    }));
  }

  // Resetar um chefe (para eventos recorrentes)
  static async resetBoss(bossId: string): Promise<BossWithRewards> {
    const boss = await prisma.boss.findUnique({
      where: { id: bossId },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())boss) {
      throw new Error('Chefe não encontrado');
    }

    const updatedBoss = await prisma.boss.update({
      where: { id: bossId },
      data: {
        health: boss.maxHealth,
        isDefeated: false,
      },
      include: {
        rewards: true,
      },
    });

    await firebaseService.updateDocument('bosses', bossId, updatedBoss);
    return updatedBoss;
  }

  // Atualizar as recompensas de um chefe
  static async updateBossRewards(
    bossId: string,
    rewards: Omit<BossReward, 'id' | 'bossId' | 'createdAt' | 'updatedAt'>[]
  ): Promise<BossWithRewards> {
    const boss = await prisma.boss.findUnique({
      where: { id: bossId },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())boss) {
      throw new Error('Chefe não encontrado');
    }

    // Remover recompensas antigas
    await prisma.bossReward.deleteMany({
      where: { bossId },
    });

    // Adicionar novas recompensas
    const updatedBoss = await prisma.boss.update({
      where: { id: bossId },
      data: {
        rewards: {
          createMany: {
            data: rewards,
          },
        },
      },
      include: {
        rewards: true,
      },
    });

    await firebaseService.updateDocument('bosses', bossId, updatedBoss);
    return updatedBoss;
  }
}