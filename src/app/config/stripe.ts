import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Verificar variáveis de ambiente
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY não está definida');
}

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY não está definida');
}

// Inicializar Stripe no cliente
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Inicializar Stripe no servidor
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

// Configurações de pagamento
export const paymentConfig = {
  currency: 'brl',
  paymentMethods: ['card'],
  defaultPaymentMethod: 'card',
};

// Tipos de assinatura disponíveis
export const subscriptionPlans = {
  basic: {
    name: 'Básico',
    price: 'price_basic', // Substitua pelo ID real do preço no Stripe
    features: ['Acesso básico', 'Suporte por email'],
  },
  premium: {
    name: 'Premium',
    price: 'price_premium', // Substitua pelo ID real do preço no Stripe
    features: ['Acesso completo', 'Suporte prioritário', 'Recursos avançados'],
  },
};