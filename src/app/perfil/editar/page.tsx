import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../config/auth';
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Editar Perfil | EducaMaster AI',
    description: 'Edite suas informações pessoais',
  };
}

// Dados mockados do usuário
const mockUser = {
  id: '1',
  name: 'João Silva',
  email: 'joao@example.com',
  image: '/images/avatar.jpg',
  role: 'Estudante',
  bio: 'Apaixonado por tecnologia e educação. Atualmente focado em aprender sobre Inteligência Artificial.',
  location: 'São Paulo, SP',
  website: 'https://joaosilva.com',
  social: {
    linkedin: 'https://linkedin.com/in/joaosilva',
    github: 'https://github.com/joaosilva',
    twitter: 'https://twitter.com/joaosilva',
  },
  interests: ['IA', 'Machine Learning', 'Desenvolvimento Web', 'Educação'],
  languages: ['Português', 'Inglês', 'Espanhol'],
};

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Editar Perfil</h1>
          <p className="mt-2 text-gray-600">Atualize suas informações pessoais</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={mockUser.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={mockUser.email}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Biografia
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    defaultValue={mockUser.bio}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Localização
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    defaultValue={mockUser.location}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    defaultValue={mockUser.website}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Redes Sociais
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="linkedin" className="block text-sm text-gray-600">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        defaultValue={mockUser.social.linkedin}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="github" className="block text-sm text-gray-600">
                        GitHub
                      </label>
                      <input
                        type="url"
                        id="github"
                        name="github"
                        defaultValue={mockUser.social.github}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="twitter" className="block text-sm text-gray-600">
                        Twitter
                      </label>
                      <input
                        type="url"
                        id="twitter"
                        name="twitter"
                        defaultValue={mockUser.social.twitter}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interesses</label>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.interests.map(interest => (
                      <span
                        key={interest}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {interest}
                        <button type="button" className="ml-2 text-blue-600 hover:text-blue-800">
                          ×
                        </button>
                      </span>
                    ))}
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      + Adicionar
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Idiomas</label>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.languages.map(language => (
                      <span
                        key={language}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {language}
                        <button type="button" className="ml-2 text-green-600 hover:text-green-800">
                          ×
                        </button>
                      </span>
                    ))}
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      + Adicionar
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Link href="/perfil">
                    <Button variant="secondary">Cancelar</Button>
                  </Link>
                  <Button type="submit">Salvar Alterações</Button>
                </div>
              </form>
            </Card>
          </div>

          <div>
            <Card>
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={mockUser.image}
                    alt={mockUser.name}
                    className="w-32 h-32 rounded-full"
                  />
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>
                <h3 className="mt-4 text-lg font-medium">{mockUser.name}</h3>
                <p className="text-gray-500">{mockUser.role}</p>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Dicas para um bom perfil</h4>
                  <ul className="mt-2 space-y-2 text-sm text-gray-600">
                    <li>• Adicione uma foto de perfil clara e profissional</li>
                    <li>• Escreva uma biografia interessante e informativa</li>
                    <li>• Mantenha suas informações atualizadas</li>
                    <li>• Adicione links para seus projetos e redes sociais</li>
                    <li>• Selecione seus interesses relevantes</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Privacidade</h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Suas informações pessoais são protegidas e só serão visíveis para outros
                    usuários se você permitir.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}