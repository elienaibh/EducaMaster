import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Container from '../components/Container';
import Card from '../components/Card';
import Button from '../components/Button';

export const metadata: Metadata = {
  title: 'Dashboard | EducaMaster AI',
  description: 'Resumo das suas atividades e progresso',
};

// Dados mockados
const stats = {
  progress: 75,
  courses: 3,
  completedLessons: 24,
  totalLessons: 32,
  hoursStudied: 48,
  nextLesson: {
    title: 'Introdução ao Machine Learning',
    course: 'Inteligência Artificial',
    time: '14:00',
  },
};

const recentActivities = [
  {
    id: 1,
    type: 'lesson',
    title: 'Completou a aula: Fundamentos de Python',
    course: 'Programação Básica',
    date: '2024-03-15T10:30:00',
  },
  {
    id: 2,
    type: 'quiz',
    title: 'Realizou o quiz: Estruturas de Dados',
    course: 'Algoritmos e Estruturas de Dados',
    date: '2024-03-14T15:45:00',
  },
  {
    id: 3,
    type: 'project',
    title: 'Enviou o projeto: Sistema de Login',
    course: 'Desenvolvimento Web',
    date: '2024-03-13T09:15:00',
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Conquistou a medalha: Python Master',
    course: 'Programação Básica',
    date: '2024-03-12T14:20:00',
  },
];

const courses = [
  {
    id: 1,
    title: 'Inteligência Artificial',
    progress: 80,
    nextLesson: 'Introdução ao Machine Learning',
    image: '/images/courses/ai.jpg',
  },
  {
    id: 2,
    title: 'Desenvolvimento Web',
    progress: 60,
    nextLesson: 'React Hooks',
    image: '/images/courses/web.jpg',
  },
  {
    id: 3,
    title: 'Data Science',
    progress: 40,
    nextLesson: 'Análise Exploratória de Dados',
    image: '/images/courses/data.jpg',
  },
];

export default async function DashboardPage() {
  const session = await getServerSession();

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-gray-600">Bem-vindo de volta, {session.user?.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Progresso Geral</p>
                <p className="text-2xl font-bold mt-1">{stats.progress}%</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cursos Ativos</p>
                <p className="text-2xl font-bold mt-1">{stats.courses}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aulas Completadas</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.completedLessons}/{stats.totalLessons}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Horas Estudadas</p>
                <p className="text-2xl font-bold mt-1">{stats.hoursStudied}h</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Atividades Recentes</h2>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {activity.type === 'lesson' && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        )}
                        {activity.type === 'quiz' && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        )}
                        {activity.type === 'project' && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        )}
                        {activity.type === 'achievement' && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        )}
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.course}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(activity.date).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Próxima Aula</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{stats.nextLesson.title}</p>
                    <p className="text-sm text-gray-500">{stats.nextLesson.course}</p>
                    <p className="text-sm text-primary-600">Hoje às {stats.nextLesson.time}</p>
                  </div>
                </div>
                <Button className="w-full">Iniciar Aula</Button>
              </div>
            </Card>

            <Card className="p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Seus Cursos</h2>
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-gray-500">Próxima aula: {course.nextLesson}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">{course.progress}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}