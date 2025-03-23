import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'text-primary-600' : 'text-gray-600 hover:text-primary-500'
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                EducaMaster AI
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/cursos"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  pathname === '/cursos' ? 'border-primary-500' : 'border-transparent'
                } ${isActive('/cursos')}`}
              >
                Cursos
              </Link>
              <Link
                href="/planos"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  pathname === '/planos' ? 'border-primary-500' : 'border-transparent'
                } ${isActive('/planos')}`}
              >
                Planos
              </Link>
              <Link
                href="/sobre"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  pathname === '/sobre' ? 'border-primary-500' : 'border-transparent'
                } ${isActive('/sobre')}`}
              >
                Sobre
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              href="/entrar"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 