import { prisma } from '@/lib/prisma';
import { firebaseService } from './firebase';
import type { Mascot, MascotInteraction, Prisma } from '@prisma/client';

export enum MascotType {
  CAT = 'CAT',
  DOG = 'DOG',
  BIRD = 'BIRD',
  RABBIT = 'RABBIT',
}

export enum MascotMood {
  HAPPY = 'HAPPY',
  NEUTRAL = 'NEUTRAL',
  SAD = 'SAD',
}

export enum InteractionType {
  FEED = 'FEED',
  PLAY = 'PLAY',
  STUDY = 'STUDY',
  PET = 'PET',
}

export class MascotService {
  // Criar um novo mascote para o usuário
  static async createMascot(userId: string, type: MascotType, name: string): Promise<Mascot> {
    const mascot = await prisma.mascot.create({
      data: {
        userId,
        type,
        name,
        level: 1,
        experience: 0,
        mood: MascotMood.HAPPY,
        lastInteraction: new Date(),
      },
    });

    await firebaseService.setDocument('mascots', mascot.id, mascot);
    return mascot;
  }

  // Obter o mascote do usuário
  static async getUserMascot(userId: string): Promise<Mascot | null> {
    return prisma.mascot.findFirst({
      where: { userId },
    });
  }

  // Interagir com o mascote
  static async interact(mascotId: string, type: InteractionType): Promise<MascotInteraction> {
    const interaction = await prisma.mascotInteraction.create({
      data: {
        mascotId,
        type,
        timestamp: new Date(),
      },
    });

    // Atualizar experiência e humor do mascote
    const mascot = await prisma.mascot.findUnique({
      where: { id: mascotId },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())mascot) {
      throw new Error('Mascote não encontrado');
    }

    const experienceGain = this.calculateExperienceGain(type);
    const newExperience = mascot.experience + experienceGain;
    const newLevel = this.calculateLevel(newExperience);
    const newMood = this.calculateMood(mascot, type);

    const updatedMascot = await prisma.mascot.update({
      where: { id: mascotId },
      data: {
        experience: newExperience,
        level: newLevel,
        mood: newMood,
        lastInteraction: new Date(),
      },
    });

    await firebaseService.updateDocument('mascots', mascotId, updatedMascot);
    return interaction;
  }

  // Calcular ganho de experiência baseado no tipo de interação
  private static calculateExperienceGain(type: InteractionType): number {
    const experienceMap: Record<InteractionType, number> = {
      [InteractionType.FEED]: 10,
      [InteractionType.PLAY]: 15,
      [InteractionType.STUDY]: 20,
      [InteractionType.PET]: 5,
    };
    return experienceMap[type];
  }

  // Calcular nível baseado na experiência total
  private static calculateLevel(experience: number): number {
    // Cada nível requer 100 pontos de experiência
    return Math.floor(experience / 100) + 1;
  }

  // Calcular humor do mascote baseado nas interações recentes
  private static calculateMood(mascot: Mascot, interactionType: InteractionType): MascotMood {
    const hoursSinceLastInteraction =
      (new Date().getTime() - mascot.lastInteraction.getTime()) / (1000 * 60 * 60);

    if (hoursSinceLastInteraction > 24) {
      return MascotMood.SAD;
    }

    if (interactionType === InteractionType.PLAY || interactionType === InteractionType.PET) {
      return MascotMood.HAPPY;
    }

    return MascotMood.NEUTRAL;
  }

  // Obter histórico de interações do mascote
  static async getMascotInteractions(mascotId: string, limit = 10): Promise<MascotInteraction[]> {
    return prisma.mascotInteraction.findMany({
      where: { mascotId },
      orderBy: { timestamp: 'desc' },
      take: limit,
    });
  }

  // Verificar se o mascote precisa de atenção
  static async checkMascotNeeds(mascotId: string): Promise<{
    needsFood: boolean;
    needsPlay: boolean;
    needsAttention: boolean;
  }> {
    const mascot = await prisma.mascot.findUnique({
      where: { id: mascotId },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())mascot) {
      throw new Error('Mascote não encontrado');
    }

    const recentInteractions = await this.getMascotInteractions(mascotId);
    const hoursSinceLastInteraction =
      (new Date().getTime() - mascot.lastInteraction.getTime()) / (1000 * 60 * 60);

    const lastFeed = recentInteractions.find(i => i.type === InteractionType.FEED);
    const lastPlay = recentInteractions.find(i => i.type === InteractionType.PLAY);

    return {
      needsFood:
        ( ?? (() => { throw new Error('Valor não pode ser nulo') })())lastFeed || new Date().getTime() - lastFeed.timestamp.getTime() > 1000 * 60 * 60 * 4, // 4 horas
      needsPlay:
        ( ?? (() => { throw new Error('Valor não pode ser nulo') })())lastPlay || new Date().getTime() - lastPlay.timestamp.getTime() > 1000 * 60 * 60 * 8, // 8 horas
      needsAttention: hoursSinceLastInteraction > 12, // 12 horas
    };
  }
}