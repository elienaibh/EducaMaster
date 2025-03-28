'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/app/components/Container';
import Button from '@/app/components/Button';

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/auth/recuperar-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: data.message,
        });
        setEmail('');
      } else {
        setMessage({
          type: 'error',
          text: data.message,
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex min-h-[calc(100vh-200px)] flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Recuperar Senha
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Digite seu email para receber instruções de recuperação de senha
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {message && (
                <div
                  className={`rounded-md p-4 ${
                    message.type === 'success' ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <p
                    className={`text-sm ${
                      message.type === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              )}

              <div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Enviando...' : 'Enviar Instruções'}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Ou</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col space-y-2 text-center text-sm">
                <Link
                  href="/entrar"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Voltar para o login
                </Link>
                <Link
                  href="/cadastro"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Criar nova conta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
