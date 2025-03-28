import Link from 'next/link';
import Image from 'next/image';
import Container from '@/app/components/Container';
import Card from '@/app/components/Card';

interface SearchResult {
  id: number;
  type: 'course' | 'article' | 'instructor';
  title: string;
  description: string;
  image: string;
  category: string;
  url: string;
  metadata?: {
    price?: string;
    rating?: number;
    students?: number;
    author?: string;
    date?: string;
    readTime?: string;
  };
}

const mockResults: SearchResult[] = [
  {
    id: 1,
    type: 'course',
    title: 'Desenvolvimento Web Fullstack',
    description: 'Aprenda a criar aplicações web completas com React, Node.js e MongoDB.',
    image: '/courses/web-dev.jpg',
    category: 'Programação',
    url: '/cursos/1',
    metadata: {
      price: 'R$ 499,90',
      rating: 4.8,
      students: 1234,
    },
  },
  {
    id: 2,
    type: 'article',
    title: 'Como a IA está revolucionando a educação online',
    description:
      'Descubra as principais tendências e inovações que a inteligência artificial está trazendo para o ensino digital.',
    image: '/blog/ai-education.jpg',
    category: 'Tecnologia',
    url: '/blog/1',
    metadata: {
      author: 'Ana Silva',
      date: '12 Mar 2024',
      readTime: '5 min',
    },
  },
  {
    id: 3,
    type: 'instructor',
    title: 'João Silva',
    description: 'Especialista em desenvolvimento web com mais de 10 anos de experiência.',
    image: '/team/joao-silva.jpg',
    category: 'Instrutor',
    url: '/instrutores/1',
  },
];

interface Props {
  searchParams: {
    q?: string;
    type?: string;
    category?: string;
  };
}

export default function SearchPage({ searchParams }: Props) {
  const query = searchParams.q || '';
  const type = searchParams.type;
  const category = searchParams.category;

  // Filtrar resultados baseado nos parâmetros
  const results = mockResults.filter(result => {
    const matchesQuery =
      ( ?? (() => { throw new Error('Valor não pode ser nulo') })())query ||
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase());

    const matchesType = !type || result.type === type;
    const matchesCategory = !category || result.category.toLowerCase() === category.toLowerCase();

    return matchesQuery && matchesType && matchesCategory;
  });

  return (
    <Container>
      <div className="py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resultados da Pesquisa</h1>
          {query && (
            <p className="text-lg text-gray-600">
              {results.length} resultados encontrados para &quot;{query}&quot;
            </p>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Filtros */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6 space-y-6">
              {/* Tipo */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Tipo</h3>
                <div className="mt-2 space-y-2">
                  {['course', 'article', 'instructor'].map(t => (
                    <div key={t} className="flex items-center">
                      <input
                        id={`type-${t}`}
                        name="type"
                        type="radio"
                        checked={type === t}
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
                      />
                      <label
                        htmlFor={`type-${t}`}
                        className="ml-3 text-sm text-gray-600 capitalize"
                      >
                        {t === 'course' ? 'Cursos' : t === 'article' ? 'Artigos' : 'Instrutores'}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categorias */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Categorias</h3>
                <div className="mt-2 space-y-2">
                  {['Programação', 'Design', 'Marketing', 'Negócios', 'Dados', 'Idiomas'].map(
                    cat => (
                      <div key={cat} className="flex items-center">
                        <input
                          id={`category-${cat}`}
                          name="category"
                          type="checkbox"
                          checked={category === cat.toLowerCase()}
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                        />
                        <label htmlFor={`category-${cat}`} className="ml-3 text-sm text-gray-600">
                          {cat}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 gap-6">
              {results.map(result => (
                <Link key={result.id} href={result.url}>
                  <Card className="flex hover:shadow-lg transition-shadow duration-200">
                    <div className="relative h-40 w-40 flex-shrink-0">
                      <Image
                        src={result.image}
                        alt={result.title}
                        fill
                        className="object-cover rounded-l-lg"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 capitalize">
                          {result.type === 'course'
                            ? 'Curso'
                            : result.type === 'article'
                              ? 'Artigo'
                              : 'Instrutor'}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{result.category}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{result.description}</p>
                      {result.metadata && (
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          {result.type === 'course' && result.metadata.price && (
                            <>
                              <span className="font-medium text-primary-600">
                                {result.metadata.price}
                              </span>
                              {result.metadata.rating && (
                                <span className="flex items-center">
                                  <svg
                                    className="w-4 h-4 text-yellow-400 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 15.585l-7.07 4.242 1.414-8.242L0 7.171l7.778-1.13L10 0l2.222 6.041L20 7.17l-4.343 4.415 1.414 8.242L10 15.585z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {result.metadata.rating}
                                </span>
                              )}
                              {result.metadata.students && (
                                <span>{result.metadata.students} alunos</span>
                              )}
                            </>
                          )}
                          {result.type === 'article' && (
                            <>
                              {result.metadata.author && <span>{result.metadata.author}</span>}
                              {result.metadata.date && <span>{result.metadata.date}</span>}
                              {result.metadata.readTime && <span>{result.metadata.readTime}</span>}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {results.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">Nenhum resultado encontrado</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Tente ajustar seus filtros ou usar termos diferentes na busca.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}