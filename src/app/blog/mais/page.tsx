import { Metadata } from 'next';
import Image from 'next/image';
import Container from '../../components/Container';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mais Artigos | EducaMaster AI',
  description: 'Explore mais artigos sobre educação, tecnologia e IA',
};

// Dados mockados
const articles = [
  {
    id: 6,
    title: 'Gamificação na Educação',
    excerpt: 'Como jogos e elementos lúdicos podem melhorar o engajamento e a aprendizagem',
    author: {
      name: 'Ana Costa',
      role: 'Professora',
      image: 'https://i.pravatar.cc/150?img=4',
    },
    category: 'Educação',
    date: '2024-03-01',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
  },
  {
    id: 7,
    title: 'O Papel do Professor na Era Digital',
    excerpt: 'Como os educadores podem se adaptar e aproveitar as novas tecnologias',
    author: {
      name: 'Maria Santos',
      role: 'Pedagoga',
      image: 'https://i.pravatar.cc/150?img=2',
    },
    category: 'Educação',
    date: '2024-02-25',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  },
  {
    id: 8,
    title: 'Microlearning: Aprendizado em Pequenas Doses',
    excerpt: 'Como dividir o conteúdo em partes menores pode melhorar a retenção',
    author: {
      name: 'Pedro Oliveira',
      role: 'Desenvolvedor',
      image: 'https://i.pravatar.cc/150?img=3',
    },
    category: 'Tecnologia',
    date: '2024-02-20',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
  },
  {
    id: 9,
    title: 'Acessibilidade na Educação Online',
    excerpt: 'Como tornar o ensino a distância mais inclusivo e acessível',
    author: {
      name: 'Dr. João Silva',
      role: 'Especialista em IA',
      image: 'https://i.pravatar.cc/150?img=1',
    },
    category: 'Tecnologia',
    date: '2024-02-15',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1677442136019-2177442136019',
  },
  {
    id: 10,
    title: 'Tendências em Educação para 2024',
    excerpt: 'As principais tendências e inovações que devem impactar a educação este ano',
    author: {
      name: 'Carlos Lima',
      role: 'Coach',
      image: 'https://i.pravatar.cc/150?img=5',
    },
    category: 'Educação',
    date: '2024-02-10',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
  },
];

export default function MoreArticlesPage() {
  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Mais Artigos</h1>
          <p className="mt-2 text-gray-600">Explore mais artigos sobre educação, tecnologia e IA</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <Link key={article.id} href={`/blog/${article.id}`}>
              <Card className="h-full">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image src={article.image} alt={article.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime} de leitura</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8">
                      <Image
                        src={article.author.image}
                        alt={article.author.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{article.author.name}</p>
                      <p className="text-sm text-gray-600">{article.author.role}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Button onClick={() => alert('Funcionalidade em desenvolvimento')}>
            Carregar mais artigos
          </Button>
        </div>
      </div>
    </Container>
  );
}
