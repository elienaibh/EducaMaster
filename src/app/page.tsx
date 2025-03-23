import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="relative flex place-items-center">
        <Image
          src="/logo.png"
          alt="EducaMaster AI Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mt-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-8">
        <Link
          href="/cursos"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-primary-300 hover:bg-primary-100"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Cursos{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore nossa biblioteca de cursos adaptativos com IA.
          </p>
        </Link>

        <Link
          href="/planos"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-secondary-300 hover:bg-secondary-100"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Planos{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Conheça nossos planos e escolha o melhor para você.
          </p>
        </Link>

        <Link
          href="/sobre"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-primary-300 hover:bg-primary-100"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Sobre{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Descubra como a IA está revolucionando a educação.
          </p>
        </Link>
      </div>
    </main>
  )
} 