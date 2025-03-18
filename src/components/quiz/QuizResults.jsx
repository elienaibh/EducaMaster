// src/components/quiz/QuizResults.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Award, BarChart, RotateCcw, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const QuizResults = ({
  score,
  correctAnswers,
  totalQuestions,
  userAnswers = [],
  questions = [],
  onRestart,
  onFinish,
  className = ''
}) => {
  // Calcular os dados do resultado
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const isPassed = percentage >= 70;
  
  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <Card className={`${className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center mb-6"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-4">Quiz Concluído!</h2>
          <div className="text-6xl font-bold text-primary-600 mb-2">{percentage}%</div>
          <p className="text-neutral-600">
            Você acertou {correctAnswers} de {totalQuestions} questões
          </p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className={`p-4 rounded-lg mb-6 ${
            isPassed ? 'bg-success-50' : 'bg-warning-50'
          }`}
        >
          {isPassed ? (
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-success-500 mr-3" />
              <div>
                <h3 className="font-bold text-success-700">Excelente trabalho!</h3>
                <p className="text-success-600">Você conquistou uma ótima pontuação.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-warning-500 mr-3" />
              <div>
                <h3 className="font-bold text-warning-700">Continue praticando!</h3>
                <p className="text-warning-600">Você pode melhorar sua pontuação.</p>
              </div>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-6"
          variants={itemVariants}
        >
          <div className="p-3 bg-primary-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary-600">{correctAnswers}</div>
            <div className="text-sm text-neutral-600">Questões corretas</div>
          </div>
          <div className="p-3 bg-neutral-50 rounded-lg text-center">
            <div className="text-2xl font-bold text-neutral-600">{totalQuestions - correctAnswers}</div>
            <div className="text-sm text-neutral-600">Questões incorretas</div>
          </div>
        </motion.div>
        
        {userAnswers.length > 0 && questions.length > 0 && (
          <motion.div 
            className="mb-6"
            variants={itemVariants}
          >
            <h3 className="font-bold mb-3">Resumo das Questões</h3>
            <div className="space-y-3">
              {userAnswers.map((answer, index) => {
                const question = questions.find(q => q.id === answer.questionId);
                if (!question) return null;
                
                const isCorrect = answer.answerId === question.correctAnswer;
                
                return (
                  <div 
                    key={answer.questionId}
                    className={`p-3 rounded-lg border ${
                      isCorrect 
                        ? 'border-success-200 bg-success-50' 
                        : 'border-danger-200 bg-danger-50'
                    }`}
                  >
                    <div className="flex items-start">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-success-500 mr-2 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-danger-500 mr-2 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium">
                          {index + 1}. {question.text}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-danger-600 mt-1">
                            Resposta correta: {
                              question.options.find(
                                opt => opt.id === question.correctAnswer
                              )?.text
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
        
        <motion.div 
          className="flex gap-4"
          variants={itemVariants}
        >
          <Button 
            variant="outline" 
            className="flex-1"
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={onRestart}
          >
            Tentar novamente
          </Button>
          <Button 
            className="flex-1"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={onFinish}
          >
            Finalizar
          </Button>
        </motion.div>
      </motion.div>
    </Card>
  );
};

export default QuizResults;