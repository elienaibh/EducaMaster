// src/pages/LanguagePage/LanguageLessonsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle, Lock, Award, ChevronRight, Star } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import { useBoss } from '../../contexts/BossContext';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

const LanguageLessonsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourse, startLesson, completeLesson } = useLanguage();
  const { currentBoss } = useBoss();
  
  // Estados
  const [course, setCourse] = useState(null);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionScore, setCompletionScore] = useState(0);
  
  // Carregar o curso
  useEffect(() => {
    try {
      const loadedCourse = getCourse(id);
      setCourse(loadedCourse);
      
      // Determinar lição atual ou próxima lição não completada
      const nextLesson = loadedCourse.lessons.find(lesson => !lesson.completed);
      if (nextLesson) {
        setCurrentLessonId(nextLesson.id);
      } else if (loadedCourse.lessons.length > 0) {
        setCurrentLessonId(loadedCourse.lessons[0].id);
      }
    } catch (error) {
      console.error('Erro ao carregar curso:', error);
      navigate('/language');
    }
  }, [id, getCourse, navigate]);
  
  // Função para iniciar uma lição
  const handleStartLesson = (lessonId) => {
    try {
      const lesson = startLesson(course.id, lessonId);
      setActiveLesson(lesson);
      setCurrentLessonId(lessonId);
    } catch (error) {
      console.error('Erro ao iniciar lição:', error);
    }
  };
  
  // Função para completar uma lição
  const handleCompleteLesson = () => {
    try {
      // Simular pontuação (em uma aplicação real, viria de exercícios completados)
      const score = Math.floor(Math.random() * 30) + 70; // 70-100
      
      const result = completeLesson(course.id, activeLesson.id, score);
      
      // Mostrar modal de conclusão
      setCompletionScore(score);
      setShowCompletionModal(true);
      
      // Atualizar o curso
      setCourse(getCourse(id));
    } catch (error) {
      console.error('Erro ao completar lição:', error);
    }
  };
  
  // Verificar se uma lição está bloqueada
  const isLessonLocked = (lessonIndex) => {
    // Se for a primeira lição, nunca está bloqueada
    if (lessonIndex === 0) return false;
    
    // Verifica se pelo menos uma das lições anteriores foi completada
    return !course.lessons.slice(0, lessonIndex).some(lesson => lesson.completed);
  };
  
  if (!course) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 text-center">
          <p>Carregando curso...</p>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4" 
        icon={<ArrowLeft className="w-4 h-4" />}
        onClick={() => navigate('/language')}
      >
        Voltar para Idiomas
      </Button>
      
      {/* Cabeçalho do curso */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-800 mb-1">
              {course.title}
            </h1>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="primary">{course.language}</Badge>
              <Badge variant={
                course.level === 'Iniciante' ? 'success' :
                course.level === 'Intermediário' ? 'warning' :
                'danger'
              }>{course.level}</Badge>
            </div>
            <p className="text-neutral-600">{course.description}</p>
          </div>
          <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-end">
            <div className="text-sm text-neutral-600 mb-1">
              Progresso do Curso
            </div>
            <div className="font-bold text-lg text-primary-600">
              {course.progress}%
            </div>
            <div className="w-36">
              <ProgressBar value={course.progress} max={100} color="primary" />
            </div>
            <div className="text-sm text-neutral-500 mt-1">
              {course.completedLessons} de {course.totalLessons} lições
            </div>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lista de lições */}
        <div className="md:col-span-2">
          <Card>
            <h2 className="text-xl font-bold text-neutral-800 mb-4">
              Lições
            </h2>
            
            <div className="space-y-4">
              {course.lessons.map((lesson, index) => {
                const isLocked = isLessonLocked(index);
                const isActive = lesson.id === currentLessonId;
                
                return (
                  <div 
                    key={lesson.id} 
                    className={`
                      p-4 border rounded-lg transition-colors
                      ${isActive ? 'border-primary-300 bg-primary-50' : 'border-neutral-200'}
                      ${isLocked ? 'opacity-60' : ''}
                    `}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          {lesson.completed ? (
                            <CheckCircle className="w-6 h-6 text-success-500" />
                          ) : isLocked ? (
                            <Lock className="w-6 h-6 text-neutral-400" />
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-primary-500 flex items-center justify-center text-xs font-bold text-primary-500">
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold">{lesson.title}</h3>
                          <div className="flex items-center text-sm text-neutral-500 mt-1">
                            <Star className="w-3 h-3 text-warning-500 mr-1" />
                            <span>{lesson.xp} XP</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant={lesson.completed ? "outline" : "primary"}
                        size="sm"
                        disabled={isLocked}
                        onClick={() => handleStartLesson(lesson.id)}
                      >
                        {lesson.completed ? 'Revisar' : 'Iniciar'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        
        {/* Barra lateral */}
        <div>
          {/* Card do Boss */}
          <Card className="mb-6 p-4 bg-primary-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold">{currentBoss.name}</h3>
              <Badge variant="danger">Boss</Badge>
            </div>
            <p className="text-sm text-neutral-600 mb-3">
              Complete lições para causar dano ao Boss!
            </p>
            <ProgressBar 
              value={Math.round((currentBoss.currentHealth / currentBoss.maxHealth) * 100)}
              max={100}
              color="boss"
            />
          </Card>
          
          {/* Card de informações do curso */}
          <Card>
            <h3 className="font-bold mb-3">Informações do Curso</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-neutral-600">Idioma:</span>
                <span className="font-medium">{course.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Nível:</span>
                <span className="font-medium">{course.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Total de lições:</span>
                <span className="font-medium">{course.totalLessons}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Último estudo:</span>
                <span className="font-medium">
                  {course.lastStudied ? new Date(course.lastStudied).toLocaleDateString() : 'Nunca'}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-bold mb-3">Conquistas</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center mr-2">
                    <BookOpen className="w-4 h-4 text-success-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Primeira Lição</div>
                    <div className="text-xs text-neutral-500">Complete sua primeira lição</div>
                  </div>
                  {course.completedLessons > 0 ? (
                    <CheckCircle className="w-4