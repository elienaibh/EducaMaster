import { Metadata } from 'next';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog | EducaMaster AI',
    description: 'Artigos e novidades sobre educação e tecnologia',
  };
}

// Dados mockados das categorias do blog
const mockCategories = [
  {
    id: 'tecnologia',
    name: 'Tecnologia',
    count: 12,
  },
  {
    id: 'educacao',
    name: 'Educação',
    count: 8,
  },
  {
    id: 'carreira',
    name: 'Carreira',
    count: 6,
  },
  {
    id: 'dicas',
    name: 'Dicas',
    count: 10,
  },
];

// Dados mockados dos artigos
const mockArticles = [
  {
    id: '1',
    title: 'O futuro da educação com IA',
    excerpt:
      'Descubra como a inteligência artificial está transformando a forma como aprendemos e ensinamos.',
    author: {
      name: 'João Silva',
      role: 'Especialista em IA',
      image: '/images/authors/joao.jpg',
    },
    category: 'tecnologia',
    date: '2024-03-15',
    readTime: '5 min',
    image: '/images/blog/ia-education.jpg',
  },
  {
    id: '2',
    title: 'Como estudar de forma mais eficiente',
    excerpt:
      'Aprenda técnicas comprovadas para melhorar seu desempenho nos estudos e otimizar seu tempo.',
    author: {
      name: 'Maria Santos',
      role: 'Pedagoga',
      image: '/images/authors/maria.jpg',
    },
    category: 'dicas',
    date: '2024-03-14',
    readTime: '4 min',
    image: '/images/blog/study-tips.jpg',
  },
  {
    id: '3',
    title: 'Tendências de carreira para 2024',
    excerpt:
      'Conheça as profissões mais promissoras e as habilidades mais valorizadas no mercado de trabalho.',
    author: {
      name: 'Pedro Oliveira',
      role: 'Consultor de Carreira',
      image: '/images/authors/pedro.jpg',
    },
    category: 'carreira',
    date: '2024-03-13',
    readTime: '6 min',
    image: '/images/blog/career-trends.jpg',
  },
  {
    id: '4',
    title: 'Educação a distância: vantagens e desafios',
    excerpt: 'Um guia completo sobre os benefícios e obstáculos do ensino remoto na atualidade.',
    author: {
      name: 'Ana Costa',
      role: 'Especialista em EAD',
      image: '/images/authors/ana.jpg',
    },
    category: 'educacao',
    date: '2024-03-12',
    readTime: '7 min',
    image: '/images/blog/online-education.jpg',
  },
];

export default function BlogPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Artigos e novidades sobre educação e tecnologia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar com categorias */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Categorias</h2>
                <div className="space-y-2">
                  {mockCategories.map(category => (
                    <Link
                      key={category.id}
                      href={`/blog/categoria/${category.id}`}
                      className="flex items-center justify-between py-2 text-gray-600 hover:text-blue-600"
                    >
                      <span>{category.name}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="mt-8">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Newsletter</h2>
                <p className="text-gray-600 mb-4">
                  Receba as últimas novidades e artigos diretamente no seu e-mail.
                </p>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Inscrever-se
                  </button>
                </form>
              </div>
            </Card>
          </div>

          {/* Lista de artigos */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockArticles.map(article => (
                <Link key={article.id} href={`/blog/${article.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-t-lg">
                      {/* Aqui você pode adicionar a imagem do artigo */}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span>{article.date}</span>
                        <span className="mx-2">•</span>
                        <span>{article.readTime} de leitura</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-3">
                          {/* Aqui você pode adicionar a imagem do autor */}
                        </div>
                        <div>
                          <div className="font-medium">{article.author.name}</div>
                          <div className="text-sm text-gray-500">{article.author.role}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Paginação */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                  disabled
                >
                  Anterior
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                  Próxima
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
