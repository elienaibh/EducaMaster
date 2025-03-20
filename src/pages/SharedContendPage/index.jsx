// src/pages/SharedContentPage/index.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileQuestion, Award, Download, ExternalLink } from 'lucide-react';
import { useSharingContext } from '../../contexts/SharingContext';
import { useAuth } from '../../contexts/AuthContext';
import ShareButton from '../../components/sharing/ShareButton';

const SharedContentPage = () => {
  const { contentType, shareId } = useParams();
  const navigate = useNavigate();
  const { importContent } = useSharingContext();
  const { user } = useAuth();
  
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  
  useEffect(() => {
    const loadSharedContent = async () => {
      try {
        // Simulação - Isso seria uma requisição à API
        // Apenas para demonstrar o fluxo
        setTimeout(() => {
          setContent({
            id: shareId,
            title: `${contentType} compartilhado #${shareId}`,
            description: `Este é um exemplo de ${contentType} compartilhado por outro usuário.`,
            createdAt: new Date().toISOString(),
            user: {
              id: 'user123',
              name: 'Usuário Exemplo'
            },
            // Adicione mais campos conforme o tipo de conteúdo
            ...(contentType === 'quiz' && {
              questionCount: 10,
              difficulty: 'Médio',
              category: 'Ciências'
            }),
            ...(contentType === 'flashcard' && {
              cardCount: 25,
              category: 'Matemática'
            }),
            ...(contentType === 'achievement' && {
              points: 150,
              badgeUrl: '/images/badges/achievement.png'
            })
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar conteúdo compartilhado:', error);
        setLoading(false);
      }
    };
    
    loadSharedContent();
  }, [contentType, shareId]);
  
  const handleImport = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/share/${contentType}/${shareId}` } });
      return;
    }
    
    setImporting(true);
    try {
      const imported = await importContent(shareId, contentType);
      if (imported) {
        // Redireciona para a página apropriada após importar
        const redirectPaths = {
          quiz: `/quizzes/${imported.id}`,
          flashcard: `/flashcards/${imported.id}`,
          achievement: `/profile/achievements`
        };
        
        navigate(redirectPaths[contentType] || '/dashboard');
      }
    } catch (error) {
      console.error('Erro ao importar:', error);
    } finally {
      setImporting(false);
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  // Função para renderizar o ícone correto com base no tipo de conteúdo
  const renderContentTypeIcon = () => {
    switch (contentType) {
      case 'quiz':
        return <FileQuestion className="w-6 h-6 text-blue-500" />;
      case 'flashcard':
        return <BookOpen className="w-6 h-6 text-green-500" />;
      case 'achievement':
        return <Award className="w-6 h-6 text-yellow-500" />;
      default:
        return <ExternalLink className="w-6 h-6 text-gray-500" />;
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando conteúdo compartilhado...</p>
        </div>
      </div>
    );
  }
  
  if (!content) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Conteúdo não encontrado</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              O conteúdo compartilhado que você está procurando não está disponível ou foi removido.
            </p>
            <button
              onClick={handleBack}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBack}
        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </button>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            {renderContentTypeIcon()}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white ml-2">
              {content.title}
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleImport}
              disabled={importing}
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {importing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Importando...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Importar para minha conta
                </>
              )}
            </button>
            
            <div className="flex gap-2">
              <ShareButton 
                content={content} 
                contentType={contentType} 
                variant="secondary"
                label="Compartilhar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedContentPage;
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Detalhes do conteúdo
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Tipo:</span> {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Compartilhado por:</span> {content.user.name}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Data:</span> {new Date(content.createdAt).toLocaleDateString('pt-BR')}
                </p>
                
                {contentType === 'quiz' && (
                  <>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Número de questões:</span> {content.questionCount}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Dificuldade:</span> {content.difficulty}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Categoria:</span> {content.category}
                    </p>
                  </>
                )}
                
                {contentType === 'flashcard' && (
                  <>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Número de cartões:</span> {content.cardCount}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Categoria:</span> {content.category}
                    </p>
                  </>
                )}
                
                {contentType === 'achievement' && (
                  <>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Pontos:</span> {content.points}
                    </p>
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Prévia
                </h3>
                {contentType === 'quiz' && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Este quiz contém {content.questionCount} questões sobre {content.category}.
                  </p>
                )}
                
                {contentType === 'flashcard' && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Este deck contém {content.cardCount} flashcards sobre {content.category}.
                  </p>
                )}
                
                {contentType === 'achievement' && (
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-full">
                      <Award className="w-12 h-12 text-yellow-500" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Importe este conteúdo para sua conta para acessá-lo completamente.
                </p>
              </div>
            </div>