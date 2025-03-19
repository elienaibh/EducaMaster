// src/pages/LanguagePage/LanguageLessonsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle, Lock, Award, ChevronRight, Star, Globe, Book, LightbulbIcon, Play, CheckSquare } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import { useBoss } from '../../contexts/BossContext';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../components/ui/Modal';
import XpGainPopup from '../../components/gamification/XpGainPopup';

const LanguageLessonsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourse, startLesson, completeLesson } = useLanguage();
  const { currentBoss, damageBoss } = useBoss();
  
  // Estados
  const [course, setCourse] = useState(null);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionScore, setCompletionScore] = useState(0);
  const [showLessonContent, setShowLessonContent] = useState(false);
  const [lessonProgress, setLessonProgress] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [exercisesCompleted, setExercisesCompleted] = useState(false);
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  
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
      setShowLessonContent(true);
      setLessonProgress(0);
      setCurrentExerciseIndex(0);
      setUserAnswers({});
      setExercisesCompleted(false);
    } catch (error) {
      console.error('Erro ao iniciar lição:', error);
    }
  };
  
  // Função para responder exercício
  const handleAnswerExercise = (exerciseId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [exerciseId]: answer
    }));
  };
  
  // Função para ir para o próximo exercício
  const handleNextExercise = () => {
    if (!activeLesson || !activeLesson.content || !activeLesson.content.exercises) return;
    
    const exercises = activeLesson.content.exercises;
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setLessonProgress(Math.round(((currentExerciseIndex + 1) / exercises.length) * 100));
    } else {
      // Todos os exercícios foram completados
      setExercisesCompleted(true);
      setLessonProgress(100);
    }
  };
  
  // Função para verificar se o exercício atual foi respondido
  const isCurrentExerciseAnswered = () => {
    if (!activeLesson || !activeLesson.content || !activeLesson.content.exercises) return false;
    
    const currentExercise = activeLesson.content.exercises[currentExerciseIndex];
    return userAnswers[currentExercise.id] !== undefined;
  };
  
  // Função para calcular pontuação
  const calculateScore = () => {
    if (!activeLesson || !activeLesson.content || !activeLesson.content.exercises) return 0;
    
    const exercises = activeLesson.content.exercises;
    let correctAnswers = 0;
    
    exercises.forEach(exercise => {
      if (userAnswers[exercise.id] === exercise.answer) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / exercises.length) * 100);
  };
  
  // Função para completar uma lição
  const handleCompleteLesson = () => {
    try {
      const score = calculateScore();
      
      const result = completeLesson(course.id, activeLesson.id, score);
      
      // Mostrar modal de conclusão
      setCompletionScore(score);
      
      // Causar dano ao Boss baseado na pontuação
      const damage = Math.round((score / 100) * 150); // 0-150 de dano
      damageBoss(damage, 'language_lesson');
      
      // Configurar XP ganho
      setEarnedXp(activeLesson.xp);
      
      // Atualizar o curso
      setCourse(getCourse(id));
      
      // Mostrar modal de conclusão
      setShowCompletionModal(true);
    } catch (error) {
      console.error('Erro ao completar lição:', error);
    }
  };
  
  // Função para fechar o modal e mostrar o popup de XP
  const handleCloseCompletionModal = () => {
    setShowCompletionModal(false);
    setShowLessonContent(false);
    setShowXpPopup(true);
    
    // Esconder o popup de XP após alguns segundos
    setTimeout(() => {
      setShowXpPopup(false);
    }, 3000);
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
  
  // Renderizar o conteúdo da lição
  const renderLessonContent = () => {
    if (!activeLesson || !activeLesson.content) {
      return (
        <div className="text-center p-8">
          <p>Conteúdo da lição não disponível.</p>
        </div>
      );
    }
    
    if (exercisesCompleted) {
      return (
        <div className="text-center p-8">
          <CheckCircle className="w-16 h-16 text-success-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Lição Concluída!</h3>
          <p className="text-neutral-600 mb-6">
            Você completou todos os exercícios desta lição. Clique no botão abaixo para finalizar.
          </p>
          <Button
            onClick={handleCompleteLesson}
            icon={<CheckSquare className="w-4 h-4" />}
          >
            Concluir Lição
          </Button>
        </div>
      );
    }
    
    const { vocabulary, grammar, exercises } = activeLesson.content;
    const currentExercise = exercises[currentExerciseIndex];
    
    // Determinar se estamos na seção de vocabulário, gramática ou exercícios
    if (lessonProgress === 0) {
      // Mostrar vocabulário
      return (
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Book className="w-5 h-5 text-primary-500 mr-2" />
            Vocabulário
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {vocabulary.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg border-neutral-200 bg-neutral-50">
                <div className="flex justify-between">
                  <h4 className="font-bold text-primary-700">{item.word}</h4>
                  <Badge>{item.pronunciation}</Badge>
                </div>
                <p className="text-neutral-600 mt-1">{item.translation}</p>
              </div>
            ))}
          </div>
          
          <Button 
            className="ml-auto"
            onClick={() => {
              setLessonProgress(33);
            }}
          >
            Continuar para Gramática
          </Button>
        </div>
      );
    } else if (lessonProgress === 33) {
      // Mostrar gramática
      return (
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <BookOpen className="w-5 h-5 text-secondary-500 mr-2" />
            Gramática
          </h3>
          
          <div className="space-y-4 mb-6">
            {grammar.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg border-neutral-200 bg-neutral-50">
                <h4 className="font-bold text-secondary-700 mb-2">{item.topic}</h4>
                <p className="text-neutral-600">{item.explanation}</p>
              </div>
            ))}
          </div>
          
          <Button 
            className="ml-auto"
            onClick={() => {
              setLessonProgress(66);
            }}
          >
            Continuar para Exercícios
          </Button>
        </div>
      );
    } else {
      // Mostrar exercícios
      return (
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <LightbulbIcon className="w-5 h-5 text-warning-500 mr-2" />
            Exercícios
          </h3>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progresso</span>
              <span>{currentExerciseIndex + 1} de {exercises.length}</span>
            </div>
            <ProgressBar 
              value={((currentExerciseIndex + 1) / exercises.length) * 100} 
              max={100} 
            />
          </div>
          
          <Card className="mb-6">
            <h4 className="font-bold mb-4">
              {currentExercise.type === 'fill' ? 'Complete a frase:' : 'Responda:'}
            </h4>
            
            <p className="text-lg mb-4">{currentExercise.question}</p>
            
            {currentExercise.type === 'fill' ? (
              <div className="space-y-2 mb-4">
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Sua resposta"
                  value={userAnswers[currentExercise.id] || ''}
                  onChange={(e) => handleAnswerExercise(currentExercise.id, e.target.value)}
                />
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                {currentExercise.options?.map((option, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 border rounded-lg cursor-pointer ${
                      userAnswers[currentExercise.id] === option 
                        ? 'border-primary-300 bg-primary-50' 
                        : 'border-neutral-200 hover:border-primary-200'
                    }`}
                    onClick={() => handleAnswerExercise(currentExercise.id, option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
            
            <Button 
              className="ml-auto"
              disabled={!isCurrentExerciseAnswered()}
              onClick={handleNextExercise}
            >
              {currentExerciseIndex < exercises.length - 1 ? 'Próximo Exercício' : 'Finalizar Exercícios'}
            </Button>
          </Card>
        </div>
      );
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
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
      
      {/* Lições e Conteúdo */}
      {showLessonContent ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conteúdo da lição */}
          <div className="md:col-span-2">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-neutral-800 flex items-center">
                  <Globe className="w-5 h-5 text-primary-500 mr-2" />
                  {activeLesson.title}
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowLessonContent(false)}
                >
                  Voltar para Lições
                </Button>
              </div>
              
              {renderLessonContent()}
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
            
            {/* Card de lições */}
            <Card>
              <h3 className="font-bold mb-3">Progresso da Lição</h3>
              <div className="mb-4">
                <ProgressBar value={lessonProgress} max={100} color="secondary" />
                <div className="flex justify-between text-sm text-neutral-500 mt-1">
                  <span>Progresso</span>
                  <span>{lessonProgress}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className={`flex items-center p-2 rounded-lg ${lessonProgress >= 0 ? 'bg-success-50' : 'bg-neutral-50'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${lessonProgress >= 0 ? 'bg-success-100 text-success-700' : 'bg-neutral-200 text-neutral-500'}`}>1</div>
                  <span className="text-sm font-medium">Vocabulário</span>
                  {lessonProgress > 0 && <CheckCircle className="w-4 h-4 text-success-500 ml-auto" />}
                </div>
                
                <div className={`flex items-center p-2 rounded-lg ${lessonProgress >= 33 ? 'bg-success-50' : 'bg-neutral-50'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${lessonProgress >= 33 ? 'bg-success-100 text-success-700' : 'bg-neutral-200 text-neutral-500'}`}>2</div>
                  <span className="text-sm font-medium">Gramática</span>
                  {lessonProgress > 33 && <CheckCircle className="w-4 h-4 text-success-500 ml-auto" />}
                </div>
                
                <div className={`flex items-center p-2 rounded-lg ${lessonProgress >= 66 ? 'bg-success-50' : 'bg-neutral-50'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${lessonProgress >= 66 ? 'bg-success-100 text-success-700' : 'bg-neutral-200 text-neutral-500'}`}>3</div>
                  <span className="text-sm font-medium">Exercícios</span>
                  {lessonProgress >= 100 && <CheckCircle className="w-4 h-4 text-success-500 ml-auto" />}
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
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
                      <CheckCircle className="w-4 h-4 text-success-500 ml-auto" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-neutral-300 ml-auto"></div>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center mr-2">
                      <Play className="w-4 h-4 text-neutral-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">50% Concluído</div>
                      <div className="text-xs text-neutral-500">Complete metade do curso</div>
                    </div>
                    {course.progress >= 50 ? (
                      <CheckCircle className="w-4 h-4 text-success-500 ml-auto" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-neutral-300 ml-auto"></div>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center mr-2">
                      <Award className="w-4 h-4 text-neutral-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Curso Completo</div>
                      <div className="text-xs text-neutral-500">Complete todas as lições</div>
                    </div>
                    {course.progress >= 100 ? (
                      <CheckCircle className="w-4 h-4 text-success-500 ml-auto" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-neutral-300 ml-auto"></div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
      
      {/* Modal de conclusão */}
      <Modal 
        isOpen={showCompletionModal} 
        onClose={handleCloseCompletionModal}
        size="md"
      >
        <ModalHeader onClose={handleCloseCompletionModal}>
          Lição Concluída!
        </ModalHeader>
        <ModalBody>
          <div className="text-center">
            <Award className="w-16 h-16 text-warning-500 mx-auto mb-4" />
            
            <h3 className="text-xl font-bold mb-2">Parabéns!</h3>
            <p className="text-neutral-600 mb-4">
              Você completou a lição "{activeLesson?.title}" com sucesso!
            </p>
            
            <div className="bg-success-50 p-4 rounded-lg mb-6">
              <h4 className="font-bold text-success-700 mb-2">Resultado:</h4>
              <div className="flex justify-between items-center">
                <span>Pontuação:</span>
                <Badge variant="success">{completionScore}%</Badge>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>XP ganho:</span>
                <Badge variant="warning">+{activeLesson?.xp || 0} XP</Badge>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Dano causado ao Boss:</span>
                <Badge variant="danger">{Math.round((completionScore / 100) * 150)}</Badge>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button 
            className="w-full"
            onClick={handleCloseCompletionModal}
          >
            Continuar
          </Button>
        </ModalFooter>
      </Modal>
      
        {/* Popup de XP ganho */}
        {showXpPopup && (
        <XpGainPopup 
          xp={earnedXp}
          message={`Lição "${activeLesson?.title}" concluída!`}
          position="bottom-right"
          onClose={() => setShowXpPopup(false)}
        />
      )}
    </div>
  );
};

export default LanguageLessonsPage;