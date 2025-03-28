import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';

export const metadata: Metadata = {
  title: 'Notificações | EducaMaster AI',
  description: 'Gerencie suas notificações e mensagens',
};

// Dados mockados das notificações
const notifications = [
  {
    id: 1,
    type: 'course',
    title: 'Novo conteúdo disponível',
    message: 'O curso "Inteligência Artificial para Iniciantes" foi atualizado com novos módulos.',
    date: '2024-03-15T10:30:00',
    read: false,
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Conquista desbloqueada!',
    message: 'Parabéns! Você completou 10 aulas seguidas.',
    date: '2024-03-14T15:45:00',
    read: true,
  },
  {
    id: 3,
    type: 'system',
    title: 'Manutenção programada',
    message: 'A plataforma passará por manutenção no próximo sábado às 3h da manhã.',
    date: '2024-03-13T09:15:00',
    read: true,
  },
  {
    id: 4,
    type: 'course',
    title: 'Lembrete de estudo',
    message: 'Você tem uma aula pendente no curso "Desenvolvimento Web".',
    date: '2024-03-12T14:20:00',
    read: false,
  },
  {
    id: 5,
    type: 'achievement',
    title: 'Nível alcançado!',
    message: 'Você alcançou o nível 5 no curso "Programação Python".',
    date: '2024-03-11T11:00:00',
    read: true,
  },
];

export default async function NotificationsPage() {
  const session = await getServerSession();

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Notificações</h1>
          <p className="mt-2 text-gray-600">
            {unreadCount} {unreadCount === 1 ? 'nova notificação' : 'novas notificações'}
          </p>
        </div>

        <div className="space-y-4">
          {notifications.map(notification => (
            <Card
              key={notification.id}
              (className={`p-6 ${ ?? (() => { throw new Error('Valor não pode ser nulo') })())notification.read ? 'bg-primary-50 border-primary-200' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{notification.title}</h3>
                    ({ ?? (() => { throw new Error('Valor não pode ser nulo') })())notification.read && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        Nova
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-gray-600">{notification.message}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    {new Date(notification.date).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => alert('Funcionalidade em desenvolvimento')}
                  >
                    <span className="sr-only">Marcar como lida</span>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => alert('Funcionalidade em desenvolvimento')}>
            Carregar mais notificações
          </Button>
        </div>
      </div>
    </Container>
  );
}