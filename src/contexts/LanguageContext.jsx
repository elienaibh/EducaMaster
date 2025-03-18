// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import aiService from '../services/ai/aiService';
import useLocalStorage from '../hooks/useLocalStorage';
import { useBoss } from './BossContext';

// Criação do contexto de Aprendizado de Idiomas
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  // Estado para cursos e materiais de idiomas
  const [courses, setCourses] = useLocalStorage('language_courses', []);
  const [materials, setMaterials] = useLocalStorage('language_materials', []);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { damageBoss } = useBoss();

  // Carregar cursos e materiais mockados para desenvolvimento
  useEffect(() => {
    // Se não existirem cursos salvos, criar alguns de exemplo
    if (courses.length === 0) {
      const mockCourses = [
        {
          id: 'lang-1',
          title: 'Inglês Básico',
          language: 'Inglês',
          level: 'Iniciante',
          description: 'Aprenda vocabulário e gramática básica do inglês.',
          lessons: [
            {
              id: 'lesson-1',
              title: 'Saudações e Apresentações',
              completed: true,
              content: {
                vocabulary: [
                  { word: 'Hello', translation: 'Olá', pronunciation: '/həˈloʊ/' },
                  { word: 'Good morning', translation: 'Bom dia', pronunciation: '/ɡʊd ˈmɔrnɪŋ/' },
                  // Mais vocabulário...
                ],
                grammar: [
                  { topic: 'Verb To Be', explanation: 'O verbo "to be" (ser/estar) é um dos mais importantes em inglês.' },
                  // Mais gramática...
                ],
                exercises: [
                  { type: 'fill', question: 'My name ___ John.', answer: 'is' },
                  // Mais exercícios...
                ],
              },
              xp: 50,
            },
            // Mais lições...
          ],
          totalLessons: 20,
          completedLessons: 8,
          progress: 40,
          lastStudied: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 dia atrás
        },
        // Mais cursos...
      ];
      
      setCourses(mockCourses);
    }

    // Se não existirem materiais salvos, criar alguns de exemplo
    if (materials.length === 0) {
      const mockMaterials = [
        {
          id: 'audio-1',
          title: 'Conversação em Inglês - Situações Cotidianas',
          language: 'Inglês',
          type: 'Diálogo',
          description: 'Diálogos em inglês para situações do dia a dia com sincronização de texto e áudio.',
          duration: '15min',
          audioUrl: 'https://example.com/audio.mp3', // URL fictícia
          transcript: [
            { start: 0, end: 4, text: "Hello! My name is Sarah. Nice to meet you.", translation: "Olá! Meu nome é Sarah. Prazer em conhecê-lo." },
            { start: 4, end: 8, text: "Hi Sarah, I'm John. Nice to meet you too.", translation: "Oi Sarah, eu sou John. Prazer em conhecê-la também." },
            // Mais transcrições...
          ],
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias atrás
        },
        // Mais materiais...
      ];
      
      setMaterials(mockMaterials);
    }
  }, []);

  // Buscar um curso específico
  const getCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) {
      throw new Error(`Curso não encontrado: ${courseId}`);
    }
    
    setCurrentCourse(course);
    return course;
  };

  // Buscar um material específico
  const getMaterial = (materialId) => {
    const material = materials.find(m => m.id === materialId);
    if (!material) {
      throw new Error(`Material não encontrado: ${materialId}`);
    }
    
    setCurrentMaterial(material);
    return material;
  };

  // Iniciar uma lição
  const startLesson = (courseId, lessonId) => {
    const course = getCourse(courseId);
    const lesson = course.lessons.find(l => l.id === lessonId);
    
    if (!lesson) {
      throw new Error(`Lição não encontrada: ${lessonId}`);
    }
    
    setCurrentLesson(lesson);
    return lesson;
  };

  // Completar uma lição
  const completeLesson = (courseId, lessonId, score = 100) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return false;
    
    // Atualizar a lição como concluída
    const updatedLessons = course.lessons.map(lesson => {
      if (lesson.id === lessonId) {
        return { ...lesson, completed: true };
      }
      return lesson;
    });
    
    // Calcular novo progresso
    const completedCount = updatedLessons.filter(l => l.completed).length;
    const progress = Math.round((completedCount / course.totalLessons) * 100);
    
    // Atualizar o curso
    const updatedCourse = {
      ...course,
      lessons: updatedLessons,
      completedLessons: completedCount,
      progress,
      lastStudied: new Date().toISOString(),
    };
    
    // Atualizar cursos
    const updatedCourses = courses.map(c => {
      if (c.id === courseId) {
        return updatedCourse;
      }
      return c;
    });
    
    setCourses(updatedCourses);
    
    // Se o curso atual for o atualizado, atualizar também o currentCourse
    if (currentCourse && currentCourse.id === courseId) {
      setCurrentCourse(updatedCourse);
    }
    
    // Causar dano ao Boss baseado no score
    const damage = Math.round(score * 1.2); // Exemplo: 100% = 120 de dano
    damageBoss(damage, 'language_lesson');
    
    return {
      courseId,
      lessonId,
      score,
      progress,
    };
  };

  // Criar um novo curso
  const createCourse = (courseData) => {
    const newCourse = {
      id: `lang-${Date.now()}`,
      title: courseData.title,
      language: courseData.language,
      level: courseData.level,
      description: courseData.description,
      lessons: [],
      totalLessons: 0,
      completedLessons: 0,
      progress: 0,
      lastStudied: null,
      createdAt: new Date().toISOString(),
    };
    
    setCourses([newCourse, ...courses]);
    
    return newCourse;
  };

  // Criar uma nova lição em um curso
  const createLesson = async (courseId, lessonData, generateContent = false) => {
    try {
      setLoading(true);
      
      const course = courses.find(c => c.id === courseId);
      if (!course) throw new Error(`Curso não encontrado: ${courseId}`);
      
      let lessonContent = lessonData.content || {};
      
      // Gerar conteúdo da lição usando IA, se solicitado
      if (generateContent && lessonData.textContent) {
        const generatedContent = await aiService.generateLanguageExercises(
          lessonData.textContent,
          course.language,
          course.level
        );
        
        lessonContent = generatedContent;
      }
      
      // Criar nova lição
      const newLesson = {
        id: `lesson-${Date.now()}`,
        title: lessonData.title,
        completed: false,
        content: lessonContent,
        xp: lessonData.xp || 50,
      };
      
      // Atualizar o curso
      const updatedLessons = [...course.lessons, newLesson];
      const updatedCourse = {
        ...course,
        lessons: updatedLessons,
        totalLessons: updatedLessons.length,
      };
      
      // Atualizar cursos
      const updatedCourses = courses.map(c => {
        if (c.id === courseId) {
          return updatedCourse;
        }
        return c;
      });
      
      setCourses(updatedCourses);
      
      // Se o curso atual for o atualizado, atualizar também o currentCourse
      if (currentCourse && currentCourse.id === courseId) {
        setCurrentCourse(updatedCourse);
      }
      
      return newLesson;
    } catch (err) {
      setError(err.message || 'Erro ao criar lição');
      console.error('Erro ao criar lição:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Criar um novo material de áudio sincronizado
  const createAudioSyncMaterial = (materialData) => {
    const newMaterial = {
      id: `audio-${Date.now()}`,
      title: materialData.title,
      language: materialData.language,
      type: materialData.type || 'Diálogo',
      description: materialData.description,
      duration: materialData.duration || '0min',
      audioUrl: materialData.audioUrl,
      transcript: materialData.transcript || [],
      createdAt: new Date().toISOString(),
    };
    
    setMaterials([newMaterial, ...materials]);
    
    return newMaterial;
  };

  // Praticar com um material de áudio sincronizado
  const practiceWithAudioSync = (materialId, duration, completionPercentage) => {
    // Causar dano ao Boss baseado no tempo de prática e completude
    const baseDamage = Math.round(duration / 60) * 10; // 10 pontos por minuto
    const completionBonus = Math.round(completionPercentage); // 1 ponto por 1% de completude
    const totalDamage = baseDamage + completionBonus;
    
    damageBoss(totalDamage, 'language_audio');
    
    return {
      materialId,
      duration,
      completionPercentage,
      damage: totalDamage,
    };
  };

  // Valores disponibilizados pelo contexto
  const value = {
    courses,
    materials,
    currentCourse,
    currentMaterial,
    currentLesson,
    loading,
    error,
    getCourse,
    getMaterial,
    startLesson,
    completeLesson,
    createCourse,
    createLesson,
    createAudioSyncMaterial,
    practiceWithAudioSync,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;