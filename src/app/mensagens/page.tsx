import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';

export const metadata: Metadata = {
  title: 'Mensagens | EducaMaster AI',
  description: 'Gerencie suas mensagens e conversas',
};

// Dados mockados das conversas
const conversations = [
  {
    id: 1,
    user: {
      name: 'Maria Silva',
      image: '/images/avatars/maria.jpg',
      role: 'Suporte',
    },
    lastMessage: 'Olá! Como posso ajudar você hoje?',
    date: '2024-03-15T10:30:00',
    unread: true,
  },
  {
    id: 2,
    user: {
      name: 'João Santos',
      image: '/images/avatars/joao.jpg',
      role: 'Professor',
    },
    lastMessage: 'Ótimo trabalho no último exercício!',
    date: '2024-03-14T15:45:00',
    unread: false,
  },
  {
    id: 3,
    user: {
      name: 'Ana Oliveira',
      image: '/images/avatars/ana.jpg',
      role: 'Mentora',
    },
    lastMessage: 'Vamos marcar uma sessão de mentoria?',
    date: '2024-03-13T09:15:00',
    unread: true,
  },
  {
    id: 4,
    user: {
      name: 'Pedro Costa',
      image: '/images/avatars/pedro.jpg',
      role: 'Aluno',
    },
    lastMessage: 'Você pode me ajudar com a dúvida do exercício?',
    date: '2024-03-12T14:20:00',
    unread: false,
  },
  {
    id: 5,
    user: {
      name: 'Laura Mendes',
      image: '/images/avatars/laura.jpg',
      role: 'Professora',
    },
    lastMessage: 'Parabéns pelo progresso no curso!',
    date: '2024-03-11T11:00:00',
    unread: true,
  },
];

export default async function MessagesPage() {
  const session = await getServerSession();

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  const unreadCount = conversations.filter(c => c.unread).length;

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Mensagens</h1>
          <p className="mt-2 text-gray-600">
            {unreadCount} {unreadCount === 1 ? 'nova mensagem' : 'novas mensagens'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {conversations.map(conversation => (
                <Card
                  key={conversation.id}
                  className={`p-6 cursor-pointer hover:bg-gray-50 ${
                    conversation.unread ? 'bg-primary-50 border-primary-200' : ''
                  }`}
                  onClick={() => alert('Funcionalidade em desenvolvimento')}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={conversation.user.image}
                      alt={conversation.user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{conversation.user.name}</h3>
                          <p className="text-sm text-gray-500">{conversation.user.role}</p>
                        </div>
                        {conversation.unread && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            Nova
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-gray-600 truncate">{conversation.lastMessage}</p>
                      <p className="mt-2 text-sm text-gray-500">
                        {new Date(conversation.date).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Iniciar Conversa</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                    Buscar usuário
                  </label>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Digite o nome ou email..."
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Mensagem inicial
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Digite sua mensagem..."
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={() => alert('Funcionalidade em desenvolvimento')}
                >
                  Enviar mensagem
                </Button>
              </div>
            </Card>

            <Card className="p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Contatos Frequentes</h2>
              <div className="space-y-4">
                {conversations.slice(0, 3).map(conversation => (
                  <div
                    key={conversation.id}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                    onClick={() => alert('Funcionalidade em desenvolvimento')}
                  >
                    <img
                      src={conversation.user.image}
                      alt={conversation.user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{conversation.user.name}</p>
                      <p className="text-sm text-gray-500">{conversation.user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => alert('Funcionalidade em desenvolvimento')}>
            Carregar mais conversas
          </Button>
        </div>
      </div>
    </Container>
  );
}