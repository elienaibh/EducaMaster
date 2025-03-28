import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../config/auth';
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  return {
    title: 'Provas | EducaMaster AI',
    description: 'Provas e avaliações do curso',
  };
}

// Dados mockados das provas
const mockQuizzes = [
  {
    id: '1',
    title: 'Prova Final - Módulo 1',
    description: 'Avalie seus conhecimentos sobre os conceitos fundamentais de IA',
    duration: '60 min',
    questions: 20,
    status: 'pending',
    score: null,
    attempts: 0,
    maxAttempts: 3,
    deadline: '2024-04-15',
  },
  {
    id: '2',
    title: 'Quiz - Machine Learning',
    description: 'Teste seus conhecimentos sobre machine learning',
    duration: '30 min',
    questions: 10,
    status: 'completed',
    score: 85,
    attempts: 1,
    maxAttempts: 3,
    deadline: '2024-04-10',
  },
  {
    id: '3',
    title: 'Prova Final - Módulo 2',
    description: 'Avalie seus conhecimentos sobre algoritmos de machine learning',
    duration: '90 min',
    questions: 30,
    status: 'in_progress',
    score: null,
    attempts: 1,
    maxAttempts: 3,
    deadline: '2024-04-20',
  },
];

export default async function QuizPage({ params }: { params: { courseId: string } }) {
  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Provas e Avaliações</h1>
          <p className="mt-2 text-gray-600">Teste seus conhecimentos e acompanhe seu progresso</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {mockQuizzes.map(quiz => (
            <Card key={quiz.id}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
                  <p className="text-gray-600 mb-4">{quiz.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {quiz.duration}
                    </div>
                    <div className="flex items-center">
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
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {quiz.questions} questões
                    </div>
                    <div className="flex items-center">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {quiz.attempts}/{quiz.maxAttempts} tentativas
                    </div>
                    <div className="flex items-center">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Prazo: {new Date(quiz.deadline).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {quiz.status === 'completed' && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-500">{quiz.score}%</div>
                      <div className="text-sm text-gray-500">Pontuação</div>
                    </div>
                  )}

                  {quiz.status === 'in_progress' && (
                    <Link href={`/cursos/${params.courseId}/provas/${quiz.id}`}>
                      <Button variant="secondary">Continuar Prova</Button>
                    </Link>
                  )}

                  {quiz.status === 'pending' && (
                    <Link href={`/cursos/${params.courseId}/provas/${quiz.id}`}>
                      <Button>Iniciar Prova</Button>
                    </Link>
                  )}
                </div>
              </div>

              {quiz.status === 'completed' && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-green-500"
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
                      <span className="text-green-500">Prova Concluída</span>
                    </div>
                    <Link href={`/cursos/${params.courseId}/provas/${quiz.id}/resultado`}>
                      <Button variant="secondary" size="sm">
                        Ver Resultado
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {quiz.status === 'in_progress' && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-yellow-500 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span className="text-yellow-500">Prova em Andamento</span>
                    </div>
                    <div className="text-sm text-gray-500">Tempo restante: 45:30</div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}