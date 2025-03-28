import { prisma } from '@/lib/prisma';
import { Mascot, Prisma } from '@prisma/client';

export class MascotService {
  // Criar ou recuperar o mascote de um usuário
  static async getOrCreateMascot(userId: string) {
    let mascot = await prisma.mascot.findUnique({
      where: { userId },
      include: { inventory: { include: { item: true } } },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())mascot) {
      mascot = await prisma.mascot.create({
        data: {
          userId,
          name: 'Lumi',
          type: 'DEFAULT',
          level: 1,
          experience: 0,
          mood: '100',
          lastInteraction: new Date(),
        },
        include: { inventory: { include: { item: true } } },
      });
    }

    return mascot;
  }

  // Atualizar experiência e nível do mascote
  static async addExperience(userId: string, expAmount: number) {
    const mascot = await this.getOrCreateMascot(userId);
    const expToNextLevel = this.calculateExpToNextLevel(mascot.level);
    let newExp = mascot.experience + expAmount;
    let newLevel = mascot.level;

    // Verifica se subiu de nível
    while (newExp >= expToNextLevel) {
      newExp -= expToNextLevel;
      newLevel++;
    }

    return prisma.mascot.update({
      where: { userId },
      data: {
        experience: newExp,
        level: newLevel,
      },
    });
  }

  // Atualizar humor do mascote
  static async updateMood(userId: string, moodChange: number) {
    const mascot = await this.getOrCreateMascot(userId);
    const currentMood = parseInt(mascot.mood);
    const newMood = Math.max(0, Math.min(100, currentMood + moodChange)).toString();

    return prisma.mascot.update({
      where: { userId },
      data: { mood: newMood },
    });
  }

  // Atualizar energia do mascote
  static async updateEnergy(userId: string, energyChange: number) {
    const mascot = await this.getOrCreateMascot(userId);
    const currentEnergy = parseInt(mascot.mood); // Usando mood como energia temporariamente
    const newEnergy = Math.max(0, Math.min(100, currentEnergy + energyChange)).toString();

    return prisma.mascot.update({
      where: { userId },
      data: { mood: newEnergy },
    });
  }

  // Calcular experiência necessária para o próximo nível
  private static calculateExpToNextLevel(currentLevel: number): number {
    // Fórmula: 100 * (level ^ 1.5)
    return Math.floor(100 * Math.pow(currentLevel, 1.5));
  }

  // Adicionar item ao inventário do mascote
  static async addItemToInventory(userId: string, itemId: string, quantity = 1) {
    const mascot = await this.getOrCreateMascot(userId);
    const existingItem = await prisma.mascotItem.findFirst({
      where: {
        mascotId: mascot.id,
        itemId,
      },
    });

    if (existingItem) {
      return prisma.mascotItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return prisma.mascotItem.create({
      data: {
        mascotId: mascot.id,
        itemId,
        quantity,
      },
    });
  }

  // Equipar/Desequipar item
  static async toggleEquipItem(userId: string, itemId: string) {
    const mascot = await this.getOrCreateMascot(userId);
    const mascotItem = await prisma.mascotItem.findFirst({
      where: {
        mascotId: mascot.id,
        itemId,
      },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())mascotItem) {
      throw new Error('Item não encontrado no inventário');
    }

    return prisma.mascotItem.update({
      where: { id: mascotItem.id },
      data: { equipped: !mascotItem.equipped },
    });
  }
}