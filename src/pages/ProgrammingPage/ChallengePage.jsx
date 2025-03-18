// src/pages/ProgrammingPage/ChallengePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Info, Award, ChevronRight, ChevronDown } from 'lucide-react';
import  useProgramming  from '../../hooks/useProgramming';
import { useBoss } from '../../contexts/BossContext';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import CodeEditor from '../../components/programming/CodeEditor';
import BossCard from '../../components/boss/BossCard';

const ChallengePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getChallenge, startChallenge, evaluateTask, completeChallenge } = useProgramming();
  const { currentBoss } = useBoss();
  
  // Estados locais
  const [challenge, setChallenge] = useState(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [code, setCode] = useState('');
  const [taskResults, setTaskResults] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [expandedInstructions, setExpandedInstructions] = useState(true);
  
  // Carregar o desafio
  useEffect(() => {
    try {
      const loadedChallenge = getChallenge(id);
      setChallenge(loadedChallenge);
      startChallenge(id);
      
      // Inicializar código com exemplo, se disponível
      if (loadedChallenge.content.examples && loadedChallenge.content.examples.length > 0) {
        setCode(loadedChallenge.content.examples[0].code);
      }
    } catch (error) {
      console.error('Erro ao carregar desafio:', error);
      navigate('/programming');
    }
  }, [id, getChallenge, startChallenge, navigate]);
  
  // Tarefa atual
  const currentTask = challenge?.content?.tasks?.[currentTaskIndex] || null;
  
  // Verificar se todas as tarefas foram completadas
  const allTasksCompleted = taskResults.filter(result => result.isCorrect).length === 
                           (challenge?.content?.tasks?.length || 0);
  
  // Função para rodar o código
  const handleRunCode = (code) => {
    // No ambiente real, esta lógica seria implementada no backend
    // Para demonstração, retornamos uma saída simulada
    return `Código em execução...\nSaída: OK`;
  };
  
  // Função para enviar o código para avaliação
  const handleSubmitCode = async (code) => {
    if (!currentTask) return;
    
    const result = await evaluateTask(challenge.id, currentTask.id, code);
    
    // Atualizar os resultados das tarefas
    const newTaskResults = [...taskResults];
    newTaskResults[currentTaskIndex] = result;
    setTaskResults(newTaskResults);
    
    // Se a resposta estiver correta, passar para a próxima tarefa
    if (result.isCorrect && currentTaskIndex < challenge.content.tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
    
    // Se todas as tarefas foram completadas, concluir o desafio
    if (allTasksCompleted || 
        (result.isCorrect && currentTaskIndex === challenge.content.tasks.length - 1)) {
      const completionResult = await completeChallenge(challenge.id, 100);
      setIsCompleted(true);
    }
  };
  
  // Função para passar para a próxima tarefa
  const handleNextTask = () => {
    if (currentTaskIndex < challenge.content.tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };
  
  // Função para voltar para a tarefa anterior
  const handlePreviousTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    }
  };
  
  // Função para voltar para a lista de desafios
  const handleBack = () => {
    navigate('/programming');
  };
  
  // Renderizar resultado do desafio completo
  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center p-6">
          <Award className="w-12 h-12 text-warning-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Desafio Concluído!</h2>
          <p className="text-lg text-neutral-600 mb-6">
            Parabéns! Você completou todas as tarefas do desafio.
          </p>
          
          <div className="bg-success-50 p-4 rounded-lg mb-6">
            <Check className="w-8 h-8 text-success-500 mx-auto mb-2" />
            <p className="font-medium text-success-700">
              Você ganhou {challenge.points} pontos e causou dano ao Boss!
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setIsCompleted(false);
                setTaskResults([]);
                setCurrentTaskIndex(0);
              }}
            >
              Refazer o desafio
            </Button>
            <Button 
              className="w-full"
              onClick={handleBack}
            >
              Voltar para Desafios
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  // src/pages/ProgrammingPage/ChallengePage.jsx (continuação)
  if (!challenge || !currentTask) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center p-6">
          <p>Carregando desafio...</p>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <Button 
        variant="ghost" 
        className="mb-4" 
        icon={<ArrowLeft className="w-4 h-4" />}
        onClick={handleBack}
      >
        Voltar para desafios
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor e tarefas (coluna principal) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cabeçalho do desafio */}
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">{challenge.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge>{challenge.language}</Badge>
                  <Badge variant={
                    challenge.level === 'Iniciante' ? 'success' :
                    challenge.level === 'Intermediário' ? 'warning' :
                    'danger'
                  }>{challenge.level}</Badge>
                </div>
              </div>
              <Badge variant="primary">{challenge.points} pontos</Badge>
            </div>
            
            <p className="text-neutral-600 mb-4">{challenge.description}</p>
            
            <div className="border-t border-neutral-200 pt-4">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedInstructions(!expandedInstructions)}
              >
                <h3 className="font-bold">Instruções</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 h-auto"
                  icon={expandedInstructions ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                />
              </div>
              
              {expandedInstructions && (
                <div className="mt-2">
                  <p className="text-neutral-600 mb-3">{challenge.content.instructions}</p>
                  
                  {challenge.content.hints && challenge.content.hints.length > 0 && (
                    <div className="mb-3">
                      <h4 className="font-medium mb-1">Dicas:</h4>
                      <ul className="list-disc pl-5 text-sm text-neutral-700 space-y-1">
                        {challenge.content.hints.map((hint, index) => (
                          <li key={index}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {challenge.content.examples && challenge.content.examples.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-1">Exemplo:</h4>
                      <div className="bg-neutral-50 p-3 rounded-lg text-sm font-mono">
                        <pre>{challenge.content.examples[0].code}</pre>
                      </div>
                      {challenge.content.examples[0].explanation && (
                        <p className="text-sm text-neutral-600 mt-1">{challenge.content.examples[0].explanation}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
          
          {/* Tarefa atual */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Tarefa {currentTaskIndex + 1} de {challenge.content.tasks.length}
              </h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentTaskIndex === 0}
                  onClick={handlePreviousTask}
                >
                  Anterior
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentTaskIndex === challenge.content.tasks.length - 1}
                  onClick={handleNextTask}
                >
                  Próxima
                </Button>
              </div>
            </div>
            
            <p className="text-neutral-600 mb-4">{currentTask.description}</p>
            
            {taskResults[currentTaskIndex] && (
              <div className={`p-3 rounded-lg mb-4 ${
                taskResults[currentTaskIndex].isCorrect 
                  ? 'bg-success-50 text-success-700'
                  : 'bg-danger-50 text-danger-700'
              }`}>
                <div className="flex items-start">
                  {taskResults[currentTaskIndex].isCorrect ? (
                    <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  ) : (
                    <Info className="w-5 h-5 mr-2 flex-shrink-0" />
                  )}
                  <p>{taskResults[currentTaskIndex].feedback}</p>
                </div>
              </div>
            )}
            
            <CodeEditor 
              initialCode={code}
              language={challenge.language.toLowerCase()}
              onRun={handleRunCode}
              onSubmit={handleSubmitCode}
              onSave={(savedCode) => setCode(savedCode)}
            />
          </Card>
        </div>
        
        {/* Barra lateral */}
        <div className="lg:col-span-1 space-y-6">
          {/* Card do Boss */}
          <BossCard boss={currentBoss} />
          
          {/* Progresso do desafio */}
          <Card>
            <h3 className="font-bold mb-3">Progresso do Desafio</h3>
            <div className="space-y-4">
              {challenge.content.tasks.map((task, index) => {
                const result = taskResults[index];
                return (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border ${
                      currentTaskIndex === index ? 'border-primary-300 bg-primary-50' :
                      result?.isCorrect ? 'border-success-200 bg-success-50' :
                      'border-neutral-200 hover:bg-neutral-50'
                    } cursor-pointer`}
                    onClick={() => setCurrentTaskIndex(index)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {result?.isCorrect ? (
                          <Check className="w-4 h-4 text-success-500 mr-2" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-neutral-300 mr-2 flex items-center justify-center text-xs">
                            {index + 1}
                          </div>
                        )}
                        <span className={result?.isCorrect ? 'line-through text-neutral-500' : ''}>
                          {task.description.length > 40 
                            ? task.description.substring(0, 40) + '...' 
                            : task.description}
                        </span>
                      </div>
                      <Badge>{task.points} pts</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;