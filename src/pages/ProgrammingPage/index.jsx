// src/pages/ProgrammingPage/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, TerminalSquare, BookOpen, Award, TrendingUp, ChevronRight } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

const ProgrammingPage = () => {
  const navigate = useNavigate();
  
  // Mock de dados dos desafios de programação
  const challenges = [
    {
      id: 'challenge-1',
      title: 'Iniciante: Variáveis e Operações',
      description: 'Aprenda os conceitos básicos de programação trabalhando com variáveis e operações simples.',
      level: 'Iniciante',
      points: 50,
      estimatedTime: '20min',
      completed: true,
      progress: 100,
    },
    {
      id: 'challenge-2',
      title: 'Iniciante: Estruturas Condicionais',
      description: 'Aprenda a usar if/else para criar lógica condicional em seus programas.',
      level: 'Iniciante',
      points: 50,
      estimatedTime: '25min',
      completed: true,
      progress: 100,
    },
    {
      id: 'challenge-3',
      title: 'Intermediário: Loops e Arrays',
      description: 'Trabalhe com loops e arrays para processar conjuntos de dados.',
      level: 'Intermediário',
      points: 100,
      estimatedTime: '30min',
      completed: false,
      progress: 60,
    },
    {
      id: 'challenge-4',
      title: 'Intermediário: Funções',
      description: 'Crie funções reutilizáveis para organizar seu código e evitar repetição.',
      level: 'Intermediário',
      points: 100,
      estimatedTime: '35min',
      completed: false,
      progress: 0,
    },
    {
      id: 'challenge-5',
      title: 'Avançado: Manipulação de Dados',
      description: 'Aprenda a processar e analisar dados em diferentes formatos.',
      level: 'Avançado',
      points: 200,
      estimatedTime: '45min',
      completed: false,
      progress: 0,
      locked: true,
    },
    {
      id: 'challenge-6',
      title: 'Avançado: API e Requisições',
      description: 'Conecte-se a APIs externas e processe dados de serviços web.',
      level: 'Avançado',
      points: 200,
      estimatedTime: '50min',
      completed: false,
      progress: 0,
      locked: true,
    },
  ];
  
  // Mock de dados das estatísticas
  const stats = {
    totalChallenges: challenges.length,
    completedChallenges: challenges.filter(c => c.completed).length,
    totalPoints: challenges.reduce((sum, c) => c.completed ? sum + c.points : sum, 0),
    currentLevel: 3,
    nextLevelPoints: 500,
    currentPoints: 250,
  };
  
  // Função para iniciar ou continuar um desafio
  const handleStartChallenge = (challengeId) => {
    alert(`Iniciando o desafio ${challengeId}`);
    // Em uma aplicação real, navegaríamos para a página do desafio
    // navigate(`/programming/${challengeId}`);
  };
  
  // Renderizar badge de nível
  const renderLevelBadge = (level) => {
    switch (level) {
      case 'Iniciante':
        return <Badge variant="success">{level}</Badge>;
      case 'Intermediário':
        return <Badge variant="warning">{level}</Badge>;
      case 'Avançado':
        return <Badge variant="danger">{level}</Badge>;
      default:
        return <Badge>{level}</Badge>;
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Aprendizado de Programação</h1>
        <p className="text-neutral-600">
          Aprenda programação através de desafios práticos e interativos. Cada desafio concluído causa dano ao Boss e desbloqueia novas habilidades.
        </p>
      </div>
      
      {/* Estatísticas */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">{stats.completedChallenges}/{stats.totalChallenges}</div>
            <div className="text-sm text-neutral-600">Desafios concluídos</div>
          </div>
          <div className="text-center p-4 bg-secondary-50 rounded-lg">
            <div className="text-2xl font-bold text-secondary-600">{stats.totalPoints}</div>
            <div className="text-sm text-neutral-600">Pontos totais</div>
          </div>
          <div className="text-center p-4 bg-success-50 rounded-lg">
            <div className="text-2xl font-bold text-success-600">{stats.currentLevel}</div>
            <div className="text-sm text-neutral-600">Nível atual</div>
          </div>
          <div className="col-span-1 md:col-span-1 p-4 border rounded-lg">
            <div className="flex justify-between text-sm mb-1">
              <span>Próximo nível</span>
              <span>{stats.currentPoints}/{stats.nextLevelPoints}</span>
            </div>
            <ProgressBar 
              value={stats.currentPoints} 
              max={stats.nextLevelPoints}
              color="primary"
            />
          </div>
        </div>
      </Card>
      
      {/* Lista de desafios */}
      <h2 className="text-xl font-bold text-neutral-800 mb-4">Seus Desafios</h2>
      
      <div className="space-y-4 mb-8">
        {/* Desafios por nível */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 flex items-center">
            <TerminalSquare className="w-5 h-5 text-success-500 mr-2" />
            Iniciante
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges
              .filter(challenge => challenge.level === 'Iniciante')
              .map(challenge => (
                <Card key={challenge.id} className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold">{challenge.title}</h4>
                      {renderLevelBadge(challenge.level)}
                    </div>
                    <p className="text-neutral-600 text-sm mt-2 mb-4">{challenge.description}</p>
                    
                    <div className="flex justify-between items-center text-sm text-neutral-500 mb-4">
                      <div>
                        <Award className="w-4 h-4 inline mr-1" />
                        <span>{challenge.points} pontos</span>
                      </div>
                      <div>
                        <Clock className="w-4 h-4 inline mr-1" />
                        <span>{challenge.estimatedTime}</span>
                      </div>
                    </div>
                    
                    {challenge.completed ? (
                      <div className="mt-auto">
                        <Badge variant="success" className="mb-2">Completado</Badge>
                        <Button variant="outline" onClick={() => handleStartChallenge(challenge.id)}>
                          Refazer desafio
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-auto">
                        {challenge.progress > 0 && (
                          <>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progresso</span>
                              <span>{challenge.progress}%</span>
                            </div>
                            <ProgressBar value={challenge.progress} max={100} className="mb-2" />
                          </>
                        )}
                        <Button onClick={() => handleStartChallenge(challenge.id)}>
                          {challenge.progress > 0 ? 'Continuar' : 'Iniciar desafio'}
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 flex items-center">
            <TerminalSquare className="w-5 h-5 text-warning-500 mr-2" />
            Intermediário
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges
              .filter(challenge => challenge.level === 'Intermediário')
              .map(challenge => (
                <Card key={challenge.id} className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold">{challenge.title}</h4>
                      {renderLevelBadge(challenge.level)}
                    </div>
                    <p className="text-neutral-600 text-sm mt-2 mb-4">{challenge.description}</p>
                    
                    <div className="flex justify-between items-center text-sm text-neutral-500 mb-4">
                      <div>
                        <Award className="w-4 h-4 inline mr-1" />
                        <span>{challenge.points} pontos</span>
                      </div>
                      <div>
                        <Clock className="w-4 h-4 inline mr-1" />
                        <span>{challenge.estimatedTime}</span>
                      </div>
                    </div>
                    
                    {challenge.completed ? (
                      <div className="mt-auto">
                        <Badge variant="success" className="mb-2">Completado</Badge>
                        <Button variant="outline" onClick={() => handleStartChallenge(challenge.id)}>
                          Refazer desafio
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-auto">
                        {challenge.progress > 0 && (
                          <>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progresso</span>
                              <span>{challenge.progress}%</span>
                            </div>
                            <ProgressBar value={challenge.progress} max={100} className="mb-2" />
                          </>
                        )}
                        <Button onClick={() => handleStartChallenge(challenge.id)}>
                          {challenge.progress > 0 ? 'Continuar' : 'Iniciar desafio'}
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-3 flex items-center">
            <TerminalSquare className="w-5 h-5 text-danger-500 mr-2" />
            Avançado
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges
              .filter(challenge => challenge.level === 'Avançado')
              .map(challenge => (
                <Card key={challenge.id} className={`h-full ${challenge.locked ? 'opacity-60' : ''}`}>
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold">{challenge.title}</h4>
                      {renderLevelBadge(challenge.level)}
                    </div>
                    <p className="text-neutral-600 text-sm mt-2 mb-4">{challenge.description}</p>
                    
                    <div className="flex justify-between items-center text-sm text-neutral-500 mb-4">
                      <div>
                        <Award className="w-4 h-4 inline mr-1" />
                        <span>{challenge.points} pontos</span>
                      </div>
                      <div>
                        <Clock className="w-4 h-4 inline mr-1" />
                        <span>{challenge.estimatedTime}</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      {challenge.locked ? (
                        <div className="bg-neutral-100 p-3 rounded-lg text-center">
                          <p className="text-sm text-neutral-600 mb-2">
                            Complete os desafios intermediários para desbloquear
                          </p>
                          <Badge variant="neutral">Bloqueado</Badge>
                        </div>
                      ) : (
                        <Button onClick={() => handleStartChallenge(challenge.id)}>
                          Iniciar desafio
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
      
      {/* Conquistas */}
      <Card>
        <h2 className="text-xl font-bold text-neutral-800 mb-4">Conquistas</h2>
        <div className="flex flex-wrap gap-4">
          <div className="bg-neutral-100 p-4 rounded-lg text-center w-24">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Code className="w-6 h-6 text-primary-600" />
            </div>
            <p className="text-xs font-medium">Primeiro Código</p>
          </div>
          <div className="bg-neutral-100 p-4 rounded-lg text-center w-24">
            <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
            <p className="text-xs font-medium">10 Desafios</p>
          </div>
          <div className="bg-neutral-100 p-4 rounded-lg text-center w-24 opacity-50">
            <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-neutral-500" />
            </div>
            <p className="text-xs font-medium">Mestre do Código</p>
          </div>
          <div className="bg-neutral-100 p-4 rounded-lg text-center w-24 opacity-50">
            <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-neutral-500" />
            </div>
            <p className="text-xs font-medium">1000 Pontos</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProgrammingPage;