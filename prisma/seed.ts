import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Conquistas de Comentários
  const commentAchievements = [
    {
      name: 'Comentarista',
      type: 'COMMENT_COUNT_5',
      description: 'Fez 5 comentários em aulas',
      icon: '💬',
      points: 100,
    },
    {
      name: 'Super Comentarista',
      type: 'COMMENT_COUNT_20',
      description: 'Fez 20 comentários em aulas',
      icon: '🗣️',
      points: 250,
    },
    {
      name: 'Mestre dos Comentários',
      type: 'COMMENT_COUNT_50',
      description: 'Fez 50 comentários em aulas',
      icon: '👑',
      points: 500,
    },
  ];

  // Conquistas de Aulas Completadas
  const lessonAchievements = [
    {
      name: 'Estudante Dedicado',
      type: 'LESSON_COUNT_10',
      description: 'Completou 10 aulas',
      icon: '📚',
      points: 100,
    },
    {
      name: 'Estudante Avançado',
      type: 'LESSON_COUNT_25',
      description: 'Completou 25 aulas',
      icon: '🎓',
      points: 250,
    },
    {
      name: 'Mestre do Conhecimento',
      type: 'LESSON_COUNT_50',
      description: 'Completou 50 aulas',
      icon: '🏆',
      points: 500,
    },
    {
      name: 'Sábio',
      type: 'LESSON_COUNT_100',
      description: 'Completou 100 aulas',
      icon: '🌟',
      points: 1000,
    },
  ];

  // Conquistas de Cursos Completados
  const courseAchievements = [
    {
      name: 'Iniciante',
      type: 'COURSE_COUNT_1',
      description: 'Completou seu primeiro curso',
      icon: '🌱',
      points: 200,
    },
    {
      name: 'Aprendiz',
      type: 'COURSE_COUNT_3',
      description: 'Completou 3 cursos',
      icon: '⭐',
      points: 500,
    },
    {
      name: 'Especialista',
      type: 'COURSE_COUNT_5',
      description: 'Completou 5 cursos',
      icon: '🌟',
      points: 1000,
    },
    {
      name: 'Mestre',
      type: 'COURSE_COUNT_10',
      description: 'Completou 10 cursos',
      icon: '👑',
      points: 2000,
    },
  ];

  // Criar conquistas
  for (const achievement of [
    ...commentAchievements,
    ...lessonAchievements,
    ...courseAchievements,
  ]) {
    await prisma.achievement.upsert({
      where: { type: achievement.type },
      update: achievement,
      create: achievement,
    });
  }

  console.log('Conquistas criadas com sucesso!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
