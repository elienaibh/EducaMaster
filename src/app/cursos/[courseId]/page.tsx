import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../config/auth';
import Container from '../../components/Container';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  return {
    title: 'Curso | EducaMaster AI',
    description: 'Detalhes e conteúdo do curso',
  };
}

// Dados mockados do curso
const mockCourse = {
  id: '1',
  title: 'Inteligência Artificial para Iniciantes',
  description: 'Aprenda os conceitos fundamentais de IA e machine learning com exemplos práticos.',
  instructor: {
    name: 'Dr. João Silva',
    role: 'Especialista em IA',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  category: 'Tecnologia',
  level: 'Iniciante',
  duration: '40 horas',
  lessons: 20,
  students: 1234,
  rating: 4.8,
  reviews: 156,
  price: 199.99,
  image:
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  lastUpdated: '15 de março de 2024',
  language: 'Português',
  requirements: [
    'Conhecimentos básicos de programação',
    'Noções de matemática',
    'Computador com acesso à internet',
  ],
  objectives: [
    'Entender os conceitos fundamentais de IA',
    'Aprender sobre machine learning',
    'Desenvolver projetos práticos',
    'Preparar-se para carreiras em IA',
  ],
  modules: [
    {
      id: '1',
      title: 'Introdução à IA',
      description: 'Conceitos básicos e histórico da Inteligência Artificial',
      lessons: [
        { id: '1', title: 'O que é IA?', duration: '15 min', type: 'video' },
        { id: '2', title: 'História da IA', duration: '20 min', type: 'video' },
        { id: '3', title: 'Aplicações Práticas', duration: '25 min', type: 'video' },
      ],
    },
    {
      id: '2',
      title: 'Machine Learning',
      description: 'Fundamentos do aprendizado de máquina',
      lessons: [
        { id: '4', title: 'Tipos de Aprendizado', duration: '30 min', type: 'video' },
        { id: '5', title: 'Algoritmos Básicos', duration: '35 min', type: 'video' },
        { id: '6', title: 'Prática com Python', duration: '40 min', type: 'video' },
      ],
    },
  ],
};

export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  return (
    <Container>
      <div className="py-8">
        {/* Header do Curso */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-8">
          <img
            src={mockCourse.image}
            alt={mockCourse.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{mockCourse.title}</h1>
            <p className="text-lg mb-4">{mockCourse.description}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img
                  src={mockCourse.instructor.image}
                  alt={mockCourse.instructor.name}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="font-medium">{mockCourse.instructor.name}</p>
                  <p className="text-sm text-gray-200">{mockCourse.instructor.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">★</span>
                <span>{mockCourse.rating}</span>
                <span className="text-gray-300">({mockCourse.reviews} avaliações)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sobre o Curso */}
            <Card>
              <h2 className="text-2xl font-bold mb-4">Sobre o Curso</h2>
              <div className="prose max-w-none">
                <p>{mockCourse.description}</p>
              </div>
            </Card>

            {/* Objetivos */}
            <Card>
              <h2 className="text-2xl font-bold mb-4">O que você vai aprender</h2>
              <ul className="space-y-2">
                {mockCourse.objectives.map((objective, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {objective}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Requisitos */}
            <Card>
              <h2 className="text-2xl font-bold mb-4">Requisitos</h2>
              <ul className="space-y-2">
                {mockCourse.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-primary-500 mr-2"
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
                    {requirement}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Módulos do Curso */}
            <Card>
              <h2 className="text-2xl font-bold mb-4">Conteúdo do Curso</h2>
              <div className="space-y-4">
                {mockCourse.modules.map(module => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                    <p className="text-gray-600 mb-4">{module.description}</p>
                    <div className="space-y-2">
                      {module.lessons.map(lesson => (
                        <Link
                          key={lesson.id}
                          href={`/cursos/${params.courseId}/aulas/${lesson.id}`}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <svg
                              className="w-5 h-5 text-primary-500 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>{lesson.title}</span>
                          </div>
                          <span className="text-gray-500">{lesson.duration}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Card de Compra */}
            <Card>
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">R$ {mockCourse.price.toFixed(2)}</p>
                <p className="text-gray-600 mb-4">
                  ou 12x de R$ {(mockCourse.price / 12).toFixed(2)}
                </p>
                <Button className="w-full mb-4">Comprar Agora</Button>
                <p className="text-sm text-gray-500">Garantia de 7 dias ou seu dinheiro de volta</p>
              </div>
            </Card>

            {/* Informações do Curso */}
            <Card>
              <h3 className="text-lg font-semibold mb-4">Informações do Curso</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoria</span>
                  <span className="font-medium">{mockCourse.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nível</span>
                  <span className="font-medium">{mockCourse.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração</span>
                  <span className="font-medium">{mockCourse.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Aulas</span>
                  <span className="font-medium">{mockCourse.lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Alunos</span>
                  <span className="font-medium">{mockCourse.students}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Idioma</span>
                  <span className="font-medium">{mockCourse.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Última atualização</span>
                  <span className="font-medium">{mockCourse.lastUpdated}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}