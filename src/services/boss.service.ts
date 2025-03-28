import { prisma } from '@/lib/prisma';
import { BattleStatus, Boss, BossBattle, Prisma } from '@prisma/client';
import { MascotService } from './mascot.service';

interface BossRewards {
  items?: Array<{ id: string; quantity: number }>;
  crystals?: number;
  specialUnlocks?: string[];
}

export class BossService {
  // Iniciar uma batalha contra um Boss
  static async startBattle(userId: string, bossId: string) {
    // Verificar se já existe uma batalha em andamento
    const activeBattle = await prisma.bossBattle.findFirst({
      where: {
        userId,
        completed: false,
      },
    });

    if (activeBattle) {
      throw new Error('Você já está em uma batalha');
    }

    // Verificar se o mascote tem energia suficiente
    const mascot = await MascotService.getOrCreateMascot(userId);
    const currentEnergy = parseInt(mascot.mood);
    if (currentEnergy < 30) {
      throw new Error('Seu mascote precisa de mais energia para batalhar');
    }

    // Criar nova batalha
    const battle = await prisma.bossBattle.create({
      data: {
        userId,
        bossId,
        completed: false,
        level: 1,
      },
      include: {
        Boss: true,
      },
    });

    // Reduzir energia do mascote
    await MascotService.updateEnergy(userId, -30);

    return battle;
  }

  // Atualizar progresso da batalha
  static async updateBattleProgress(userId: string, battleId: string, progressIncrement: number) {
    const battle = await prisma.bossBattle.findUnique({
      where: { id: battleId },
      include: { Boss: true },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())battle || battle.userId !== userId) {
      throw new Error('Batalha não encontrada');
    }

    if (battle.completed) {
      throw new Error('Esta batalha já foi concluída');
    }

    const newProgress = battle.level + progressIncrement;

    // Verificar se derrotou o Boss
    if (newProgress >= 100) {
      return this.completeBattle(battle.id, true);
    }

    return prisma.bossBattle.update({
      where: { id: battleId },
      data: { level: newProgress },
      include: { Boss: true },
    });
  }

  // Completar uma batalha
  static async completeBattle(battleId: string, isVictory: boolean) {
    const battle = await prisma.bossBattle.findUnique({
      where: { id: battleId },
      include: { Boss: true, user: true },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())battle) {
      throw new Error('Batalha não encontrada');
    }

    const result = {
      isVictory,
      rewards: isVictory ? battle.Boss.rewards : null,
      experienceGained: isVictory ? battle.Boss.level * 100 : Math.floor(battle.level * 0.5),
    };

    // Atualizar batalha
    const updatedBattle = await prisma.bossBattle.update({
      where: { id: battleId },
      data: {
        completed: true,
        completedAt: new Date(),
      },
      include: { Boss: true },
    });

    if (isVictory) {
      // Conceder recompensas
      await this.grantRewards(battle.userId, battle.Boss.rewards as BossRewards);

      // Adicionar experiência ao mascote
      await MascotService.addExperience(battle.userId, result.experienceGained);

      // Notificar o usuário
      await prisma.notification.create({
        data: {
          userId: battle.userId,
          title: 'Vitória na Batalha!',
          (content: `Você derrotou o ${battle.Boss.name} ?? (() => { throw new Error('Valor não pode ser nulo') })()) Confira suas recompensas.`,
        },
      });
    }

    return updatedBattle;
  }

  // Conceder recompensas da batalha
  private static async grantRewards(userId: string, rewards: BossRewards) {
    // Processar cada tipo de recompensa
    if (rewards.items) {
      for (const item of rewards.items) {
        await MascotService.addItemToInventory(userId, item.id, item.quantity);
      }
    }

    if (rewards.crystals) {
      // Implementar quando o sistema de moeda virtual estiver pronto
    }

    if (rewards.specialUnlocks) {
      // Implementar desbloqueios especiais quando necessário
    }
  }

  // Obter todas as batalhas do usuário
  static async getUserBattles(userId: string) {
    return prisma.bossBattle.findMany({
      where: { userId },
      include: { Boss: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Obter ranking de batalhas
  static async getBattleRanking(bossId: string, limit = 10) {
    return prisma.bossBattle.findMany({
      where: {
        bossId,
        completed: true,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: [{ level: 'desc' }, { completedAt: 'asc' }],
      take: limit,
    });
  }

  // Abandonar uma batalha
  static async abandonBattle(userId: string, battleId: string) {
    const battle = await prisma.bossBattle.findUnique({
      where: { id: battleId },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())battle || battle.userId !== userId) {
      throw new Error('Batalha não encontrada');
    }

    if (battle.completed) {
      throw new Error('Esta batalha já foi concluída');
    }

    return this.completeBattle(battleId, false);
  }
}