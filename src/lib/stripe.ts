import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Tipos
export type DadosPagamento = {
  precoId: string;
  quantidade?: number;
  metadados?: Record<string, string>;
};

export type DadosAssinatura = {
  clienteId: string;
  precoId: string;
  metadados?: Record<string, string>;
};

// Instância do Stripe
(const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? (() => { throw new Error('Valor não pode ser nulo') })()), {
  apiVersion: '2023-10-16',
  typescript: true,
});

// Funções auxiliares
const formatarPreco = (preco: number) => {
  return Math.round(preco * 100); // Converte para centavos
};

// Funções principais
export async function criarSessaoCheckout(
  usuarioId: string,
  email: string,
  dadosPagamento: DadosPagamento
) {
  try {
    const sessao = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ['card'],
      line_items: [
        {
          price: dadosPagamento.precoId,
          quantity: dadosPagamento.quantidade || 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pagamento/cancelado`,
      metadata: {
        usuarioId,
        ...dadosPagamento.metadados,
      },
    });

    return { url: sessao.url };
  } catch (erro) {
    console.error('Erro ao criar sessão de checkout:', erro);
    throw new Error('Não foi possível criar a sessão de pagamento');
  }
}

export async function criarAssinatura(dados: DadosAssinatura) {
  try {
    const assinatura = await stripe.subscriptions.create({
      customer: dados.clienteId,
      items: [{ price: dados.precoId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: dados.metadados,
    });

    return {
      assinaturaId: assinatura.id,
      clienteSecret: (assinatura.latest_invoice as any)?.payment_intent?.client_secret,
    };
  } catch (erro) {
    console.error('Erro ao criar assinatura:', erro);
    throw new Error('Não foi possível criar a assinatura');
  }
}

export async function cancelarAssinatura(assinaturaId: string) {
  try {
    const assinaturaCancelada = await stripe.subscriptions.cancel(assinaturaId);
    return assinaturaCancelada;
  } catch (erro) {
    console.error('Erro ao cancelar assinatura:', erro);
    throw new Error('Não foi possível cancelar a assinatura');
  }
}

export async function criarCliente(email: string, nome: string) {
  try {
    const cliente = await stripe.customers.create({
      email,
      name: nome,
    });
    return cliente;
  } catch (erro) {
    console.error('Erro ao criar cliente:', erro);
    throw new Error('Não foi possível criar o cliente');
  }
}

export async function criarReembolso(pagamentoId: string) {
  try {
    const reembolso = await stripe.refunds.create({
      payment_intent: pagamentoId,
    });
    return reembolso;
  } catch (erro) {
    console.error('Erro ao criar reembolso:', erro);
    throw new Error('Não foi possível criar o reembolso');
  }
}

export async function processarWebhook(corpo: string, assinatura: string, webhookSecret: string) {
  try {
    const evento = stripe.webhooks.constructEvent(corpo, assinatura, webhookSecret);

    switch (evento.type) {
      case 'checkout.session.completed':
        const sessao = evento.data.object;
        // Processar pagamento bem-sucedido
        await processarPagamentoSucesso(sessao);
        break;

      case 'customer.subscription.created':
        const assinatura = evento.data.object;
        // Processar criação de assinatura
        await processarCriacaoAssinatura(assinatura);
        break;

      case 'customer.subscription.deleted':
        const assinaturaCancelada = evento.data.object;
        // Processar cancelamento de assinatura
        await processarCancelamentoAssinatura(assinaturaCancelada);
        break;

      default:
        console.log(`Evento não tratado: ${evento.type}`);
    }

    return NextResponse.json({ recebido: true });
  } catch (erro) {
    console.error('Erro ao processar webhook:', erro);
    return NextResponse.json({ erro: 'Erro ao processar webhook' }, { status: 400 });
  }
}

// Funções de processamento de eventos
async function processarPagamentoSucesso(sessao: unknown) {
  // Implementar lógica de processamento do pagamento
  // Por exemplo: atualizar status do pedido, enviar email, etc.
  console.log('Processando pagamento bem-sucedido:', sessao);
}

async function processarCriacaoAssinatura(assinatura: unknown) {
  // Implementar lógica de processamento da criação de assinatura
  // Por exemplo: ativar recursos premium, enviar email de boas-vindas, etc.
  console.log('Processando criação de assinatura:', assinatura);
}

async function processarCancelamentoAssinatura(assinatura: unknown) {
  // Implementar lógica de processamento do cancelamento
  // Por exemplo: desativar recursos premium, enviar email de cancelamento, etc.
  console.log('Processando cancelamento de assinatura:', assinatura);
}