import Link from 'next/link';
import Image from 'next/image';
import Container from '@/app/components/Container';
import Card from '@/app/components/Card';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  date: string;
  readTime: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Como a IA está revolucionando a educação online',
    excerpt:
      'Descubra as principais tendências e inovações que a inteligência artificial está trazendo para o ensino digital.',
    image: '/blog/ai-education.jpg',
    author: {
      name: 'Ana Silva',
      avatar: '/team/ana-silva.jpg',
    },
    category: 'Tecnologia',
    date: '12 Mar 2024',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Dicas para manter a motivação nos estudos online',
    excerpt:
      'Aprenda estratégias práticas para se manter motivado e produtivo durante seus estudos na plataforma.',
    image: '/blog/motivation.jpg',
    author: {
      name: 'Pedro Santos',
      avatar: '/team/pedro-santos.jpg',
    },
    category: 'Dicas',
    date: '10 Mar 2024',
    readTime: '4 min',
  },
  {
    id: 3,
    title: 'O futuro do mercado de trabalho e as habilidades necessárias',
    excerpt:
      'Um guia completo sobre as competências mais valorizadas pelos empregadores nos próximos anos.',
    image: '/blog/future-skills.jpg',
    author: {
      name: 'Maria Costa',
      avatar: '/team/maria-costa.jpg',
    },
    category: 'Carreira',
    date: '8 Mar 2024',
    readTime: '6 min',
  },
];

interface Props {
  params: {
    categoria: string;
  };
}

export default function BlogCategoryPage({ params }: Props) {
  const category = decodeURIComponent(params.categoria);
  const filteredArticles = articles.filter(
    article => article.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <Container>
      <div className="py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{category}</h1>
          <p className="text-lg text-gray-600">
            Artigos e novidades sobre {category.toLowerCase()}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map(article => (
            <Link key={article.id} href={`/blog/${article.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <div className="relative h-48 w-full mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{article.author.name}</p>
                      <p className="text-sm text-gray-500">{article.date}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Nenhum artigo encontrado</h3>
            <p className="mt-2 text-sm text-gray-500">
              Não encontramos artigos na categoria {category.toLowerCase()}.
            </p>
            <Link
              href="/blog"
              className="mt-4 inline-block text-primary-600 hover:text-primary-500"
            >
              Ver todas as categorias
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}
