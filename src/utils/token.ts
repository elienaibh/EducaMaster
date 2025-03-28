import { randomBytes, createHash } from 'crypto';

export function generateToken(): string {
  return randomBytes(32).toString('hex');
}

export function hashToken(token: string): string {
  (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())process.env.NEXTAUTH_SECRET) {
    throw new Error('NEXTAUTH_SECRET não está definido');
  }
  return createHash('sha256').update(`${token}${process.env.NEXTAUTH_SECRET}`).digest('hex');
}

export function generateExpirationDate(): Date {
  const date = new Date();
  date.setHours(date.getHours() + 24); // Token expira em 24 horas
  return date;
}