import { Metadata } from 'next';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: 'O futuro da educação com IA | EducaMaster AI',
    description:
      'Descubra como a inteligência artificial está transformando a forma como aprendemos e ensinamos.',
  };
}

// Dados mockados do artigo
const mockArticle = {
  id: '1',
  title: 'O futuro da educação com IA',
  content: `
    <p>
      A inteligência artificial está revolucionando diversos setores, e a educação não é exceção. 
      Com o avanço das tecnologias de IA, estamos vendo uma transformação significativa na forma 
      como aprendemos e ensinamos.
    </p>

    <h2>Personalização do aprendizado</h2>
    <p>
      Uma das principais contribuições da IA na educação é a personalização do aprendizado. 
      Sistemas inteligentes podem analisar o progresso de cada aluno, identificar suas 
      dificuldades e adaptar o conteúdo de acordo com suas necessidades específicas.
    </p>

    <h2>Automação de tarefas administrativas</h2>
    <p>
      Professores e instituições de ensino estão economizando tempo valioso com a automação 
      de tarefas administrativas. A IA pode ajudar na correção de provas, geração de relatórios 
      e gestão de conteúdo.
    </p>

    <h2>Experiências imersivas</h2>
    <p>
      A combinação de IA com realidade virtual e aumentada está criando experiências de 
      aprendizado mais imersivas e interativas. Os alunos podem explorar conceitos complexos 
      de forma mais visual e prática.
    </p>

    <h2>Desafios e considerações</h2>
    <p>
      Embora as possibilidades sejam empolgantes, também precisamos considerar os desafios 
      éticos e sociais da IA na educação. É importante garantir que a tecnologia seja usada 
      de forma responsável e inclusiva.
    </p>

    <h2>O futuro</h2>
    <p>
      À medida que a IA continua evoluindo, podemos esperar ver ainda mais inovações no campo 
      da educação. O futuro da educação será cada vez mais personalizado, eficiente e 
      acessível para todos.
    </p>
  `,
  author: {
    name: 'João Silva',
    role: 'Especialista em IA',
    image: '/images/authors/joao.jpg',
    bio: 'João é um especialista em inteligência artificial com mais de 10 anos de experiência no setor educacional.',
  },
  category: 'tecnologia',
  date: '2024-03-15',
  readTime: '5 min',
  image: '/images/blog/ia-education.jpg',
  tags: ['IA', 'Educação', 'Tecnologia', 'Futuro'],
};

// Dados mockados dos artigos relacionados
const mockRelatedArticles = [
  {
    id: '2',
    title: 'Como estudar de forma mais eficiente',
    excerpt: 'Aprenda técnicas comprovadas para melhorar seu desempenho nos estudos.',
    author: {
      name: 'Maria Santos',
      role: 'Pedagoga',
      image: '/images/authors/maria.jpg',
    },
    date: '2024-03-14',
    readTime: '4 min',
    image: '/images/blog/study-tips.jpg',
  },
  {
    id: '3',
    title: 'Tendências de carreira para 2024',
    excerpt: 'Conheça as profissões mais promissoras do mercado de trabalho.',
    author: {
      name: 'Pedro Oliveira',
      role: 'Consultor de Carreira',
      image: '/images/authors/pedro.jpg',
    },
    date: '2024-03-13',
    readTime: '6 min',
    image: '/images/blog/career-trends.jpg',
  },
];

// Dados mockados dos comentários
const mockComments = [
  {
    id: '1',
    author: {
      name: 'Ana Costa',
      image: '/images/authors/ana.jpg',
    },
    content:
      'Excelente artigo! A IA realmente está transformando a educação de forma impressionante.',
    date: '2024-03-16',
  },
  {
    id: '2',
    author: {
      name: 'Carlos Lima',
      image: '/images/authors/carlos.jpg',
    },
    content:
      'Concordo com os pontos levantados. A personalização do aprendizado é fundamental para o sucesso dos alunos.',
    date: '2024-03-16',
  },
];

export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <Container>
      <div className="py-8">
        <article className="max-w-3xl mx-auto">
          {/* Cabeçalho do artigo */}
          <header className="mb-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link
                href={`/blog/categoria/${mockArticle.category}`}
                className="hover:text-blue-600"
              >
                {mockArticle.category}
              </Link>
              <span className="mx-2">•</span>
              <span>{mockArticle.date}</span>
              <span className="mx-2">•</span>
              <span>{mockArticle.readTime} de leitura</span>
            </div>

            <h1 className="text-4xl font-bold mb-4">{mockArticle.title}</h1>

            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4">
                {/* Aqui você pode adicionar a imagem do autor */}
              </div>
              <div>
                <div className="font-medium">{mockArticle.author.name}</div>
                <div className="text-sm text-gray-500">{mockArticle.author.role}</div>
              </div>
            </div>

            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-6">
              {/* Aqui você pode adicionar a imagem do artigo */}
            </div>

            <div className="flex flex-wrap gap-2">
              {mockArticle.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Conteúdo do artigo */}
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: mockArticle.content }}
          />

          {/* Seção do autor */}
          <Card className="mb-12">
            <div className="p-6">
              <div className="flex items-start">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4">
                  {/* Aqui você pode adicionar a imagem do autor */}
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Sobre {mockArticle.author.name}</h2>
                  <p className="text-gray-600 mb-4">{mockArticle.author.bio}</p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      Twitter
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Artigos relacionados */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Artigos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockRelatedArticles.map(article => (
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
          </div>

          {/* Seção de comentários */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Comentários</h2>
            <div className="space-y-6">
              {mockComments.map(comment => (
                <Card key={comment.id}>
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-4">
                        {/* Aqui você pode adicionar a imagem do autor do comentário */}
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{comment.author.name}</div>
                          <div className="text-sm text-gray-500">{comment.date}</div>
                        </div>
                        <p className="text-gray-600">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Formulário de comentário */}
            <Card className="mt-6">
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Deixe um comentário</h3>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Seu comentário
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Enviar comentário
                  </button>
                </form>
              </div>
            </Card>
          </div>
        </article>
      </div>
    </Container>
  );
}
