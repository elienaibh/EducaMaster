import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../config/auth';
import { signOut } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Sair | EducaMaster AI',
  description: 'Faça logout da sua conta EducaMaster AI',
};

export default async function LogoutPage() {
  const session = await getServerSession(authOptions);

  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())session) {
    redirect('/entrar');
  }

  await signOut({ redirect: false, callbackUrl: '/' });
  redirect('/');
}