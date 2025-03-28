import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Container from '../../components/Container';
import Card from '../../components/Card';
import Button from '../../components/Button';

// Dados mockados das mensagens
const messages = [
  {
    id: 1,
    sender: {
      id: 1,
      name: 'Maria Silva',
      image: '/images/avatars/maria.jpg',
      role: 'Suporte',
    },
    content: 'Olá! Como posso ajudar você hoje?',
    date: '2024-03-15T10:30:00',
    read: true,
  },
  {
    id: 2,
    sender: {
      id: 2,
      name: 'Você',
      image: '/images/avatars/default.jpg',
      role: 'Aluno',
    },
    content: 'Olá! Tenho uma dúvida sobre o curso de IA.',
    date: '2024-03-15T10:35:00',
    read: true,
  },
  {
    id: 3,
    sender: {
      id: 1,
      name: 'Maria Silva',
      image: '/images/avatars/maria.jpg',
      role: 'Suporte',
    },
    content: 'Claro! Qual é sua dúvida específica?',
    date: '2024-03-15T10:36:00',
    read: true,
  },
  {
    id: 4,
    sender: {
      id: 2,
      name: 'Você',
      image: '/images/avatars/default.jpg',
      role: 'Aluno',
    },
    content: 'Não estou conseguindo acessar o módulo 3.',
    date: '2024-03-15T10:40:00',
    read: true,
  },
  {
    id: 5,
    sender: {
      id: 1,
      name: 'Maria Silva',
      image: '/images/avatars/maria.jpg',
      role: 'Suporte',
    },
    content:
      'Vou verificar o acesso do seu curso. Você poderia me informar qual navegador está usando?',
    date: '2024-03-15T10:42:00',
    read: false,
  },
];

interface ChatPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ChatPageProps): Promise<Metadata> {
  return {
    title: 'Chat | EducaMaster AI',
    description: 'Conversa com suporte',
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await getServerSession();

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  // TODO: Buscar informações do usuário com o ID fornecido
  const user = {
    name: 'Maria Silva',
    image: '/images/avatars/maria.jpg',
    role: 'Suporte',
  };

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Chat com {user.name}</h1>
          <p className="mt-2 text-gray-600">{user.role}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <h2 className="font-semibold">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender.id === 2 ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender.id === 2
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <img
                          src={message.sender.image}
                          alt={message.sender.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm font-medium">{message.sender.name}</span>
                      </div>
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 opacity-75">
                        {new Date(message.date).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <form className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  <Button type="submit">Enviar</Button>
                </form>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Informações do Usuário</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Status</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600">Online</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Tempo médio de resposta</h3>
                  <p className="text-sm text-gray-600">5 minutos</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Encerrar conversa
                </Button>
                <Button variant="outline" className="w-full">
                  Reportar problema
                </Button>
                <Button variant="outline" className="w-full">
                  Avaliar atendimento
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}