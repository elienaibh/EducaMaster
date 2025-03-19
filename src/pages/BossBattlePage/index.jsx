// src/pages/BossBattlePage/index.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Award, Zap, Sword, TrendingUp, Check, ChevronRight, BarChart2 } from 'lucide-react';
import { useBoss } from '../../contexts/BossContext';
import useFlashcards from '../../hooks/useFlashcards';
import useQuiz from '../../hooks/useQuiz';
import useProgramming from '../../hooks/useProgramming';
import useLanguage from '../../hooks/useLanguage';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import BossHealth from '../../components/boss/BossHealth';
import BossAttack from '../../components/boss/BossAttack';
import BossRewards from '../../components/boss/BossRewards';
import DamageLog from '../../components/boss/DamageLog';
import Achievement from '../../components/gamification/Achievement';
import LevelProgress from '../../components/gamification/LevelProgress';
import StreakTracker from '../../components/gamification/StreakTracker';

const BossBattlePage = () => {
  const navigate = useNavigate();
  const { 
    currentBoss, 
    isBossDefeated, 
    damageBoss, 
    damageHistory, 
    healthPercentage 
  } = useBoss();
  
  const { decks } = useFlashcards();
  const { quizzes } = useQuiz();
  const { challenges } = useProgramming();
  const { courses } = useLanguage();
  
  // Estados
  const [showRewards, setShowRewards] = useState(false);
  const [recentDamage, setRecentDamage] = useState(null);
  const [animateHealth, setAnimateHealth] = useState(false);
  const [userStats, setUserStats] = useState({
    level: 5,
    xp: 2850,
    nextLevelXp: 5000,
    streakDays: 3,
    totalQuizzes: 0,
    totalFlashcards: 0,
    totalChallenges: 0,
    totalCourses: 0,
  });
  
  // Obter dados de progresso do usuário
  useEffect(() => {
    // Em uma implementação real, isso seria uma chamada API
    setUserStats({
      level: 5,
      xp: 2850,
      nextLevelXp: 5000,
      streakDays: 3,
      totalQuizzes: quizzes.length || 0,
      totalFlashcards: decks.length || 0,
      totalChallenges: challenges.length || 0,
      totalCourses: courses.length || 0,
    });
  }, [quizzes, decks, challenges, courses]);
  
  // Handler para ataque ao Boss
  const handleAttack = (attackInfo) => {
    setRecentDamage(attackInfo);
    setAnimateHealth(true);
    
    // Limpar efeitos visuais após alguns segundos
    setTimeout(() => {
      setRecentDamage(null);
      setAnimateHealth(false);
    }, 3000);
  };
  
  // Função para obter recomendações baseadas no progresso
  const getRecommendations = () => {
    const recommendations = [];
    
    // Recomendação baseada em flashcards
    if (decks && decks.length > 0) {
      const deckToReview = decks.find(deck => deck.mastery < 80) || decks[0];
      recommendations.push({
        type: 'flashcard',
        title: deckToReview.title,
        description: 'Continue melhorando seu domínio deste conjunto',
        action: () => navigate(`/flashcards/${deckToReview.id}`)
      });
    }
    
    // Recomendação baseada em quizzes
    if (quizzes && quizzes.length > 0) {
      const quizToTake = quizzes.find(quiz => quiz.status !== 'completed') || quizzes[0];
      recommendations.push({
        type: 'quiz',
        title: quizToTake.title,
        description: 'Teste seu conhecimento com este quiz',
        action: () => navigate(`/quiz/${quizToTake.id}`)
      });
    }
    
    // Recomendação baseada em programação
    if (challenges && challenges.length > 0) {
      const challengeToTake = challenges.find(challenge => !challenge.completed) || challenges[0];
      recommendations.push({
        type: 'programming',
        title: challengeToTake.title,
        description: 'Melhore suas habilidades de programação',
        action: () => navigate(`/programming/${challengeToTake.id}`)
      });
    }
    
    // Recomendação baseada em idiomas
    if (courses && courses.length > 0) {
      const courseToTake = courses.find(course => course.progress < 100) || courses[0];
      recommendations.push({
        type: 'language',
        title: courseToTake.title,
        description: 'Continue aprendendo este idioma',
        action: () => navigate(`/language/${courseToTake.id}`)
      });
    }
    
    // Retorna até 3 recomendações
    return recommendations.slice(0, 3);
  };

  // Obter recomendações
  const recommendations = getRecommendations();
  
  // Função para renderizar ícone baseado no tipo
  const renderTypeIcon = (type) => {
    switch (type) {
      case 'quiz':
        return <Sword className="w-5 h-5 text-primary-500" />;
      case 'flashcard':
        return <Zap className="w-5 h-5 text-secondary-500" />;
      case 'programming':
        return <Shield className="w-5 h-5 text-success-500" />;
      case 'language':
        return <Award className="w-5 h-5 text-warning-500" />;
      default:
        return <TrendingUp className="w-5 h-5 text-neutral-500" />;
    }
  };
  
  // Animações
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Arena do Boss</h1>
        <p className="text-neutral-600">
          Derrote o Boss respondendo corretamente a quizzes, flashcards e desafios para ganhar recompensas!
        </p>
      </div>
      
      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card do Boss atual */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Card className="bg-primary-50">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center">
                  <Shield className="w-6 h-6 text-danger-500 mr-2" />
                  {currentBoss.name}
                </h2>
                <Badge variant="danger">Nível {currentBoss.level}</Badge>
              </div>
              
              <p className="text-neutral-600 mb-6">
                {currentBoss.description || "Um Boss poderoso que representa o esquecimento. Derrote-o respondendo corretamente às questões e desafios!"}
              </p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>HP</span>
                  <span>{currentBoss.currentHealth} / {currentBoss.maxHealth}</span>
                </div>
                <motion.div
                  animate={animateHealth ? { 
                    scale: [1, 0.97, 1],
                    transition: { duration: 0.5 }
                  } : {}}
                >
                  <ProgressBar 
                    value={healthPercentage} 
                    max={100}
                    color="boss"
                    animated
                  />
                </motion.div>
              </div>
              
              {isBossDefeated ? (
                <div className="p-6 bg-success-50 rounded-lg text-center">
                  <Award className="w-16 h-16 text-warning-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-success-700 mb-2">Boss Derrotado!</h3>
                  <p className="text-success-600 mb-6">
                    Parabéns! Você derrotou o {currentBoss.name} e desbloqueou recompensas especiais.
                  </p>
                  <Button 
                    onClick={() => setShowRewards(true)}
                    icon={<Award className="w-5 h-5" />}
                  >
                    Ver Recompensas
                  </Button>
                </div>
              ) : (
                <>
                  {recentDamage && (
                    <motion.div 
                      className="mb-4 p-3 bg-success-50 rounded-lg text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-success-700 font-medium">
                        <strong>+{recentDamage.damage}</strong> de dano causado ao Boss!
                      </p>
                    </motion.div>
                  )}
                  
                  <BossAttack onAttack={handleAttack} />
                </>
              )}
            </Card>
          </motion.div>
          
          {/* Seção de recompensas (mostrada após derrotar o Boss) */}
          {showRewards && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BossRewards 
                onClaim={() => setShowRewards(false)}
              />
            </motion.div>
          )}
          
          {/* Registro de dano */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <DamageLog maxEntries={5} />
          </motion.div>
          
          {/* Recomendações para derrotar o Boss */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Card>
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 text-primary-500 mr-2" />
                Ações Recomendadas
              </h2>
              
              <div className="space-y-4">
                {recommendations.length > 0 ? (
                  recommendations.map((rec, index) => (
                    <div 
                      key={index}
                      className="p-4 border rounded-lg border-neutral-200 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="mt-0.5 mr-3">
                            {renderTypeIcon(rec.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{rec.title}</h3>
                            <p className="text-sm text-neutral-600 mt-1">{rec.description}</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={rec.action}
                          icon={<ChevronRight className="w-4 h-4" />}
                          iconPosition="right"
                        >
                          Iniciar
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-neutral-500 bg-neutral-50 rounded-lg">
                    <p>Nenhuma recomendação disponível no momento.</p>
                    <p className="text-sm mt-2">
                      Crie mais conteúdo para estudar e derrotar o Boss!
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
        
        {/* Barra lateral */}
        <div className="space-y-6">
          {/* Progresso do usuário */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Card>
              <h2 className="text-lg font-bold mb-4">Seu Progresso</h2>
              
              <LevelProgress 
                currentLevel={userStats.level}
                currentXp={userStats.xp}
                xpForNextLevel={userStats.nextLevelXp}
                className="mb-6"
              />
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-primary-50 rounded-lg">
                  <div className="text-xl font-bold text-primary-600">{userStats.totalQuizzes}</div>
                  <div className="text-sm text-neutral-600">Quizzes</div>
                </div>
                <div className="text-center p-3 bg-secondary-50 rounded-lg">
                  <div className="text-xl font-bold text-secondary-600">{userStats.totalFlashcards}</div>
                  <div className="text-sm text-neutral-600">Flashcards</div>
                </div>
                <div className="text-center p-3 bg-success-50 rounded-lg">
                  <div className="text-xl font-bold text-success-600">{userStats.totalChallenges}</div>
                  <div className="text-sm text-neutral-600">Desafios</div>
                </div>
                <div className="text-center p-3 bg-warning-50 rounded-lg">
                  <div className="text-xl font-bold text-warning-600">{userStats.totalCourses}</div>
                  <div className="text-sm text-neutral-600">Cursos</div>
                </div>
              </div>
              
              <StreakTracker 
                currentStreak={userStats.streakDays}
                bestStreak={userStats.streakDays + 2}
                daysOfWeek={[true, true, true, false, false, true, false]}
              />
            </Card>
          </motion.div>
          
          {/* Conquistas recentes */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Conquistas</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/profile/achievements')}
                >
                  Ver todas
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Achievement 
                  title="Primeiro Boss"
                  description="Derrote o primeiro Boss"
                  unlocked={true}
                  dateEarned="2025-03-10"
                  rarity="uncommon"
                  size="sm"
                />
                
                <Achievement 
                  title="Estudante Dedicado"
                  description="Estude por 3 dias seguidos"
                  unlocked={true}
                  dateEarned="2025-03-15"
                  rarity="uncommon"
                  size="sm"
                />
                
                <Achievement 
                  title="Mestre da Memória"
                  description="Obtenha 100% de domínio em um deck"
                  unlocked={false}
                  progress={85}
                  maxProgress={100}
                  rarity="rare"
                  size="sm"
                />
                
                <Achievement 
                  title="Poliglota"
                  description="Complete um curso de idioma"
                  unlocked={false}
                  progress={2}
                  maxProgress={5}
                  rarity="epic"
                  size="sm"
                />
              </div>
            </Card>
          </motion.div>
          
          {/* Estatísticas */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Card>
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <BarChart2 className="w-5 h-5 text-primary-500 mr-2" />
                Estatísticas de Dano
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quizzes</span>
                    <span className="font-medium">42%</span>
                  </div>
                  <ProgressBar value={42} max={100} color="primary" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Flashcards</span>
                    <span className="font-medium">27%</span>
                  </div>
                  <ProgressBar value={27} max={100} color="secondary" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Programação</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <ProgressBar value={18} max={100} color="success" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Idiomas</span>
                    <span className="font-medium">13%</span>
                  </div>
                  <ProgressBar value={13} max={100} color="warning" />
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-neutral-200 text-center">
                <p className="text-sm text-neutral-600">
                  Total de dano causado: <span className="font-bold">{damageHistory.reduce((sum, damage) => sum + damage.amount, 0)}</span>
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BossBattlePage;