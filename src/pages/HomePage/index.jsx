// src/pages/HomePage/index.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, LightbulbIcon, Code, ChevronRight } from 'lucide-react';

// Importar componentes UI
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const HomePage = () => {
  const navigate = useNavigate();
  
  // Verificar se o usuário está autenticado
  const isAuthenticated = localStorage.getItem('auth') === 'true';
  
  // Função para lidar com o login/registro
  const handleAuth = (type) => {
    navigate(type === 'login' ? '/login' : '/register');
  };
  
  // Função para ir para o dashboard
  const handleDashboard = () => {
    navigate('/dashboard');
  };
  
  // Recursos da plataforma
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary-500" />,
      title: 'Quizzes Inteligentes',
      description: 'Quizzes gerados automaticamente a partir de qualquer texto, com foco nos pontos-chave.',
    },
    {
      icon: <LightbulbIcon className="w-8 h-8 text-secondary-500" />,
      title: 'Flashcards Adaptativos',
      description: 'Sistema de repetição espaçada que se adapta ao seu nível de conhecimento.',
    },
    {
      icon: <Code className="w-8 h-8 text-success-500" />,
      title: 'Programação Gamificada',
      description: 'Aprenda programação através de desafios que causam dano ao Boss.',
    },
    {
      icon: <BookOpen className="w-8 h-8 text-warning-500" />,
      title: 'Aprendizado de Idiomas',
      description: 'Sincronização audiovisual para um aprendizado completo de idiomas.',
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary-50 pt-16 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Badge variant="primary" className="mb-4">Plataforma Educacional</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                Aprenda de forma <span className="text-primary-600">gamificada</span> e <span className="text-primary-600">personalizada</span>
              </h1>
              <p className="text-lg text-neutral-600 mb-8">
                O EducaMaster AI transforma qualquer conteúdo em quizzes, flashcards e desafios interativos, tornando o aprendizado mais eficiente e divertido.
              </p>
              <div className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <Button size="lg" onClick={handleDashboard}>
                    Acessar dashboard
                  </Button>
                ) : (
                  <>
                    <Button size="lg" onClick={() => handleAuth('register')}>
                      Cadastre-se grátis
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => handleAuth('login')}>
                      Entrar
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="bg-white rounded-xl shadow-xl p-6 relative">
                <div className="absolute -top-3 -right-3">
                  <Badge variant="danger">Boss</Badge>
                </div>
                <h3 className="font-bold text-lg mb-2">Mestre do Esquecimento</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  Derrote o boss respondendo corretamente às questões e flashcards.
                </p>
                <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-4">
                  <div className="bg-danger-500 h-2.5 rounded-full w-3/4"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>Quiz</Badge>
                  <Badge>Flashcards</Badge>
                  <Badge>Desafios</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Recursos da plataforma
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Nossa plataforma combina inteligência artificial com técnicas avançadas de aprendizado para maximizar sua retenção e engajamento.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-neutral-600">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              size="lg"
              onClick={isAuthenticated ? handleDashboard : () => handleAuth('register')}
            >
              {isAuthenticated ? 'Começar agora' : 'Experimente grátis'}
            </Button>
          </div>
        </div>
      </section>
      
      {/* How it works Section */}
      <section className="bg-neutral-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Em apenas três passos simples, transforme qualquer conteúdo em uma experiência de aprendizado gamificada.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Envie seu conteúdo</h3>
              <p className="text-neutral-600">
                Faça upload ou cole qualquer texto que deseja estudar.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Nossa IA processa</h3>
              <p className="text-neutral-600">
                A inteligência artificial identifica os pontos-chave e gera questões, flashcards e desafios.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Estude e derrote o Boss</h3>
              <p className="text-neutral-600">
                Responda corretamente para causar dano ao Boss e conquistar níveis e recompensas.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              O que dizem nossos usuários
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <Card key={index} className="h-full">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <p className="text-neutral-600 mb-4">
                      "O EducaMaster AI revolucionou meu método de estudo. Consegui melhorar minhas notas e reter muito mais informações em menos tempo."
                    </p>
                  </div>
                  <div className="flex items-center mt-4 pt-4 border-t border-neutral-200">
                    <div className="w-10 h-10 bg-neutral-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Maria Santos</p>
                      <p className="text-sm text-neutral-500">Estudante universitária</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para transformar seu aprendizado?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Cadastre-se gratuitamente e comece a usar o EducaMaster AI hoje mesmo.
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={isAuthenticated ? handleDashboard : () => handleAuth('register')}
          >
            {isAuthenticated ? 'Ir para o dashboard' : 'Começar agora'}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">EducaMaster AI</h3>
              <p className="mb-4">Plataforma avançada de aprendizagem gamificada e personalizada.</p>
            </div>
            
            <div>
              <h4 className="text-white text-base font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Quizzes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Flashcards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Programação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Idiomas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-base font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-base font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Termos de uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} EducaMaster AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;