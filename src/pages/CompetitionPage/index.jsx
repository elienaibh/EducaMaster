// src/pages/CompetitionPage/index.jsx
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Trophy, Users, TrendingUp, Flag } from 'lucide-react';
import { useCompetitionContext } from '../../contexts/CompetitionContext';
import RankingsPage from './RankingsPage';
import ChallengesPage from './ChallengesPage';
import ChallengeDetails from './ChallengeDetails';
import StudyGroupsPage from './StudyGroupsPage';
import StudyGroupDetails from './StudyGroupDetails';
import CreateChallenge from './CreateChallenge';
import CreateStudyGroup from './CreateStudyGroup';

/**
 * Página principal de competição e colaboração
 */
const CompetitionPage = () => {
  const navigate = useNavigate();
  const { isLoading } = useCompetitionContext();
  
  // Opções do menu de navegação
  const navOptions = [
    {
      id: 'rankings',
      label: 'Rankings',
      icon: <Trophy className="w-5 h-5" />,
      description: 'Veja como você se compara com outros estudantes',
      path: '/competition/rankings'
    },
    {
      id: 'challenges',
      label: 'Desafios',
      icon: <Flag className="w-5 h-5" />,
      description: 'Participe de desafios para testar suas habilidades',
      path: '/competition/challenges'
    },
    {
      id: 'study-groups',
      label: 'Grupos de Estudo',
      icon: <Users className="w-5 h-5" />,
      description: 'Estude com outros alunos em grupos colaborativos',
      path: '/competition/study-groups'
    },
    {
      id: 'progress',
      label: 'Progresso',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Acompanhe seu progresso e conquistas',
      path: '/competition/progress'
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Routes>
        {/* Página inicial - Menu de navegação */}
        <Route path="/" element={
          <>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Competição e Colaboração
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Compita, colabore e aprenda com outros estudantes
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {navOptions.map((option) => (
                <div
                  key={option.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(option.path)}
                >
                  <div className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg text-blue-700 dark:text-blue-300">
                      {option.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {option.label}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        } />
        
        {/* Subpáginas */}
        <Route path="/rankings/*" element={<RankingsPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenges/create" element={<CreateChallenge />} />
        <Route path="/challenges/:challengeId" element={<ChallengeDetails />} />
        <Route path="/study-groups" element={<StudyGroupsPage />} />
        <Route path="/study-groups/create" element={<CreateStudyGroup />} />
        <Route path="/study-groups/:groupId" element={<StudyGroupDetails />} />
      </Routes>
    </div>
  );
};

export default CompetitionPage;