'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';

type MessageType = {
  type: 'success' | 'error';
  text: string;
};

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<MessageType | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())token) {
      setMessage({
        type: 'error',
        text: 'Token de redefinição não encontrado',
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'As senhas não coincidem',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/redefinir-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: data.message,
        });
        setPassword('');
        setConfirmPassword('');
        // Redirecionar para a página de login após 3 segundos
        setTimeout(() => {
          router.push('/entrar');
        }, 3000);
      } else {
        setMessage({
          type: 'error',
          text: data.message,
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Ocorreu um erro ao redefinir sua senha. Tente novamente mais tarde.',
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
            Redefinir Senha
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Digite sua nova senha para recuperar acesso à sua conta
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nova Senha
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirmar Nova Senha
                </label>
                <div className="mt-2">
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
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
                  {isLoading ? 'Redefinindo...' : 'Redefinir Senha'}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}