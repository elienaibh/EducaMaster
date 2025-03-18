// src/pages/QuizPage/QuizPlayPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertCircle, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import  useQuiz  from '../../hooks/useQuiz';
import { useBoss } from '../../contexts/BossContext';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import QuizQuestion from '../../components/quiz/QuizQuestion';
import QuizResults from '../../components/quiz/QuizResults';

const QuizPlayPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getQuiz, answerQuestion, nextQuestion, finishQuiz } = useQuiz();
  const { damageBoss } = useBoss();
  
  // Estados locais
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos em segundos
  const [isFinished, setIsFinished] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const timerRef = useRef(null);
  
  // Carregar o quiz
  useEffect(() => {
    try {
      const loadedQuiz = getQuiz(id);
      setQuiz(loadedQuiz);
      
      // Configurar o timer
      const totalSeconds = parseInt(loadedQuiz.time) * 60 || 900;
      setTimeLeft(totalSeconds);
    } catch (error) {
      console.error('Erro ao carregar quiz:', error);
      navigate('/quiz');
    }
  }, [id, getQuiz, navigate]);
  
  // Timer
  useEffect(() => {
    if (isFinished) return;
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleFinishQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerRef.current);
  }, [isFinished]);
  
  // Limpar o timer ao desmontar o componente
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Formatar o tempo
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Função para selecionar uma resposta
  const handleSelectAnswer = (optionId) => {
    if (isAnswered) return;
    
    setSelectedAnswer(optionId);
    setIsAnswered(true);
    
    // Registrar a resposta no contexto
    if (quiz && quiz.questions[currentQuestionIndex]) {
      answerQuestion(quiz.questions[currentQuestionIndex].id, optionId);
    }
  };
  
  // Função para ir para a próxima questão
  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    
    const hasNext = nextQuestion();
    if (hasNext) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };
  
  // Função para ir para a questão anterior
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Função para finalizar o quiz
  const handleFinishQuiz = () => {
    clearInterval(timerRef.current);
    const result = finishQuiz();
    setQuizResult(result.result);
    
    // Causar dano ao Boss baseado no score
    damageBoss(result.damage, 'quiz');
    
    setIsFinished(true);
  };
  
  // Função para reiniciar o quiz
  const handleRestartQuiz = () => {
    // Recarregar a página para reiniciar o quiz (abordagem simples)
    window.location.reload();
  };
  
  // Função para voltar para a página de quizzes
  const handleFinish = () => {
    navigate('/quiz');
  };
  
  // Calcular a porcentagem de conclusão
  const completionPercentage = quiz 
    ? ((currentQuestionIndex + 1) / quiz.questions.length) * 100
    : 0;
  
  // Renderizar a tela de resultados finais
  if (isFinished && quizResult) {
    return (
      <div className="max-w-4xl mx-auto">
        <QuizResults 
          score={quizResult.score}
          correctAnswers={quizResult.correctAnswers}
          totalQuestions={quizResult.totalQuestions}
          userAnswers={quizResult.answers}
          questions={quiz.questions}
          onRestart={handleRestartQuiz}
          onFinish={handleFinish}
        />
      </div>
    );
  }
  
  // Se o quiz não estiver carregado, mostrar mensagem de carregamento
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center p-6">
          <p>Carregando quiz...</p>
        </Card>
      </div>
    );
  }
  
  // Obter a questão atual
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-neutral-800">{quiz.title}</h1>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-neutral-500 mr-1" />
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <ProgressBar value={completionPercentage} max={100} />
        <div className="flex justify-between text-sm text-neutral-500 mt-1">
          <span>Questão {currentQuestionIndex + 1} de {quiz.questions.length}</span>
          <span>{Math.round(completionPercentage)}% concluído</span>
        </div>
      </div>
      
      {/* Questão atual */}
      <QuizQuestion 
        question={currentQuestion}
        onAnswer={handleSelectAnswer}
        showResult={isAnswered}
        userAnswer={selectedAnswer}
        onNext={handleNextQuestion}
      />
      
      {/* Navegação */}
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Anterior
        </Button>
        
        {isAnswered ? (
          <Button 
            icon={<ArrowRight className="w-4 h-4 ml-2" />}
            iconPosition="right"
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Próxima' : 'Ver resultado'}
          </Button>
        ) : (
          <div className="text-neutral-500">
            Selecione uma resposta para continuar
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPlayPage;