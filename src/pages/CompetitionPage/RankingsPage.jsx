// src/pages/CompetitionPage/RankingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Users, Clock, Calendar, Search, Medal, Award, Shield } from 'lucide-react';
import { useCompetitionContext } from '../../contexts/CompetitionContext';

/**
 * Página de rankings
 */
const RankingsPage = () => {
  const navigate = useNavigate();
  const {
    rankings,
    isLoading,
    fetchRankings,
    fetchUserRankingPosition
  } = useCompetitionContext();
  
  // Estados locais
  const [activeTab, setActiveTab] = useState('global');
  const [userPosition, setUserPosition] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Efeito para carregar os rankings na montagem
  useEffect(() => {
    fetchRankings(activeTab);
    fetchUserRankingPosition().then(setUserPosition);
  }, [activeTab, fetchRankings, fetchUserRankingPosition]);
  
  // Filtra rankings de acordo com o termo de busca
  const filteredRankings = searchTerm
    ? rankings[activeTab]?.filter(
        rank => rank.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : rankings[activeTab];
  
  // Renderiza o ícone e cor para uma posição específica
  const getPositionBadge = (position) => {
    switch (position) {
      case 1:
        return { icon: <Trophy className="w-5 h-5" />, color: 'text-yellow-500' };
      case 2:
        return { icon: <Medal className="w-5 h-5" />, color: 'text-gray-400' };
      case 3:
        return { icon: <Award className="w-5 h-5" />, color: 'text-amber-600' };
      default:
        return { icon: <Shield className="w-5 h-5" />, color: 'text-blue-500' };
    }
  };
  
  return (
    <div>
      <button
        onClick={() => navigate('/competition')}
        className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Competição
      </button>
      
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Rankings
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Veja como você se compara com outros estudantes
      </p>
      
      {/* Abas de navegação */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('global')}
          className={`py-2 px-4 mr-4 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'global'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center">
            <Trophy className="w-4 h-4 mr-2" />
            Ranking Global
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('friends')}
          className={`py-2 px-4 mr-4 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'friends'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Amigos
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('weekly')}
          className={`py-2 px-4 mr-4 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'weekly'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Semanal
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('monthly')}
          className={`py-2 px-4 mr-4 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'monthly'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Mensal
          </div>
        </button>
      </div>
      
      {/* Mostrar posição do usuário atual */}
      {userPosition && userPosition[activeTab] && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
            Sua posição no ranking {activeTab}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Posição</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {userPosition[activeTab].position} de {userPosition[activeTab].total}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pontuação</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {userPosition[activeTab].score} pontos
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Percentil</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  Top {userPosition[activeTab].percentile}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Caixa de pesquisa */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Buscar por nome..."
          />
        </div>
      </div>
      
      {/* Tabela de rankings */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Posição
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Usuário
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Pontuação
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Nível
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Sequência
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRankings?.map((rank) => {
                const { icon, color } = getPositionBadge(rank.position);
                
                return (
                  <tr 
                    key={rank.id}
                    className={rank.isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`flex-shrink-0 ${color}`}>
                          {icon}
                        </span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-white">
                          {rank.position}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full" 
                            src={rank.user.avatar} 
                            alt="" 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {rank.user.name} {rank.isCurrentUser && '(Você)'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {rank.score.toLocaleString()} pontos
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        Nível {rank.level}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <span className="text-orange-500 mr-1">🔥</span>
                        {rank.streak} dias
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RankingsPage;