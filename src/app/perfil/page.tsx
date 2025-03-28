import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';

export const metadata: Metadata = {
  title: 'Perfil | EducaMaster AI',
  description: 'Gerencie suas informações pessoais e preferências',
};

// Dados mockados
const user = {
  name: 'João Silva',
  email: 'joao.silva@email.com',
  image: 'https://i.pravatar.cc/150?img=1',
  role: 'Estudante',
  joinDate: '2024-01-15',
  bio: 'Apaixonado por tecnologia e educação. Atualmente focado em desenvolvimento web e IA.',
  skills: [
    {
      name: 'JavaScript',
      level: 'Intermediário',
      progress: 75,
    },
    {
      name: 'React',
      level: 'Iniciante',
      progress: 45,
    },
    {
      name: 'Node.js',
      level: 'Iniciante',
      progress: 30,
    },
  ],
  achievements: [
    {
      title: 'Primeiro Curso Concluído',
      description: 'Completou o curso de Introdução à Programação',
      date: '2024-02-15',
      icon: '🎓',
    },
    {
      title: 'Participação em Projetos',
      description: 'Contribuiu em 3 projetos colaborativos',
      date: '2024-03-01',
      icon: '👥',
    },
  ],
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/login');
  }

  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Perfil</h1>
          <p className="mt-2 text-gray-600">Gerencie suas informações pessoais e preferências</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="flex items-start gap-6">
                <div className="relative">
                  <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full" />
                  <Button
                    onClick={() => alert('Funcionalidade em desenvolvimento')}
                    variant="secondary"
                    className="absolute bottom-0 right-0"
                  >
                    Alterar
                  </Button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <span>{user.role}</span>
                    <span>•</span>
                    <span>Membro desde {new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4">Sobre mim</h2>
              <p className="text-gray-600">{user.bio}</p>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4">Habilidades</h2>
              <div className="space-y-4">
                {user.skills.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-600">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4">Conquistas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.achievements.map(achievement => (
                  <div
                    key={achievement.title}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h2 className="text-xl font-semibold mb-4">Configurações</h2>
              <div className="space-y-4">
                <Button
                  onClick={() => alert('Funcionalidade em desenvolvimento')}
                  className="w-full"
                >
                  Editar perfil
                </Button>
                <Button
                  onClick={() => alert('Funcionalidade em desenvolvimento')}
                  variant="secondary"
                  className="w-full"
                >
                  Alterar senha
                </Button>
                <Button
                  onClick={() => alert('Funcionalidade em desenvolvimento')}
                  variant="secondary"
                  className="w-full"
                >
                  Preferências de notificação
                </Button>
                <Button
                  onClick={() => alert('Funcionalidade em desenvolvimento')}
                  variant="secondary"
                  className="w-full"
                >
                  Privacidade
                </Button>
                <Button
                  onClick={() => alert('Funcionalidade em desenvolvimento')}
                  variant="secondary"
                  className="w-full"
                >
                  Dispositivos conectados
                </Button>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4">Segurança</h2>
              <div className="space-y-4">
                <Button
                  onClick={() => alert('Funcionalidade em desenvolvimento')}
                  variant="secondary"
                  className="w-full"
                >
                  Autenticação em duas etapas
                </Button>
                <Button
                  onClick={() => alert('Funcionalidade em desenvolvimento')}
                  variant="secondary"
                  className="w-full"
                >
                  Sessões ativas
                </Button>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4">Dados</h2>
              <div className="space-y-4">
                <Button
                  onClick={() => alert('Funcionalidade em desenvolvimento')}
                  variant="secondary"
                  className="w-full"
                >
                  Exportar dados
                </Button>
                <Button
                  onClick={() => alert('Funcionalidade em desenvolvimento')}
                  variant="secondary"
                  className="w-full text-red-600 hover:text-red-700"
                >
                  Excluir conta
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}