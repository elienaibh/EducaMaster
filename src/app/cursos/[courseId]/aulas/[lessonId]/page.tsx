import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/config/auth';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  duration: string;
}

interface Resource {
  title: string;
  type: 'pdf' | 'zip' | 'link';
  url: string;
  size?: string;
}

interface Instructor {
  name: string;
  role: string;
  image: string;
}

interface LessonData {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  instructor: Instructor;
  resources: Resource[];
  nextLesson: Lesson | null;
  previousLesson: Lesson | null;
}

export async function generateMetadata({
  params,
}: {
  params: { courseId: string; lessonId: string };
}): Promise<Metadata> {
  return {
    title: 'Aula | EducaMaster AI',
    description: 'Conteúdo da aula',
  };
}

// Dados mockados da aula
const mockLesson: LessonData = {
  id: '1',
  title: 'O que é IA?',
  description:
    'Nesta aula, vamos explorar os conceitos fundamentais da Inteligência Artificial e sua importância no mundo atual.',
  duration: '15 min',
  videoUrl: 'https://www.youtube.com/embed/example',
  instructor: {
    name: 'Dr. João Silva',
    role: 'Especialista em IA',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  resources: [
    {
      title: 'Slides da Aula',
      type: 'pdf',
      url: '#',
      size: '2.5 MB',
    },
    {
      title: 'Código de Exemplo',
      type: 'zip',
      url: '#',
      size: '1.8 MB',
    },
    {
      title: 'Links Úteis',
      type: 'link',
      url: '#',
    },
  ],
  nextLesson: {
    id: '2',
    title: 'História da IA',
    duration: '20 min',
  },
  previousLesson: null,
};

export default async function LessonPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  return (
    <Container>
      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Player de Vídeo */}
            <Card>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={mockLesson.videoUrl}
                  title={mockLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
            </Card>

            {/* Informações da Aula */}
            <Card>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{mockLesson.title}</h1>
                  <p className="text-gray-600 mb-4">{mockLesson.description}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <img
                        src={mockLesson.instructor.image}
                        alt={mockLesson.instructor.name}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <div>
                        <p className="font-medium">{mockLesson.instructor.name}</p>
                        <p className="text-sm text-gray-500">{mockLesson.instructor.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <svg
                        className="w-5 h-5 mr-1"
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
                      {mockLesson.duration}
                    </div>
                  </div>
                </div>
                <Button variant="secondary">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Baixar Recursos
                </Button>
              </div>
            </Card>

            {/* Recursos da Aula */}
            <Card>
              <h2 className="text-xl font-bold mb-4">Recursos da Aula</h2>
              <div className="space-y-4">
                {mockLesson.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-primary-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {resource.type === 'pdf' && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        )}
                        {resource.type === 'zip' && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                          />
                        )}
                        {resource.type === 'link' && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        )}
                      </svg>
                      <div>
                        <p className="font-medium">{resource.title}</p>
                        {resource.size && <p className="text-sm text-gray-500">{resource.size}</p>}
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      Baixar
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Navegação entre Aulas */}
            <Card>
              <div className="space-y-4">
                {mockLesson.previousLesson && (
                  <Link
                    href={`/cursos/${params.courseId}/aulas/${mockLesson.previousLesson.id}`}
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center text-gray-500 mb-1">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Aula Anterior
                    </div>
                    <p className="font-medium">{mockLesson.previousLesson.title}</p>
                    <p className="text-sm text-gray-500">{mockLesson.previousLesson.duration}</p>
                  </Link>
                )}

                {mockLesson.nextLesson && (
                  <Link
                    href={`/cursos/${params.courseId}/aulas/${mockLesson.nextLesson.id}`}
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center text-gray-500 mb-1">
                      Próxima Aula
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <p className="font-medium">{mockLesson.nextLesson.title}</p>
                    <p className="text-sm text-gray-500">{mockLesson.nextLesson.duration}</p>
                  </Link>
                )}
              </div>
            </Card>

            {/* Progresso do Curso */}
            <Card>
              <h3 className="text-lg font-semibold mb-4">Seu Progresso</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso Geral</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Módulo Atual</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}