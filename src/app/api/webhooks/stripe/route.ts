import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature') ?? '';

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      logger.error('Webhook signature verification failed', { error: err });
      return new NextResponse('Webhook Error', { status: 400 });
    }

    logger.info('Processing Stripe webhook event', { type: event.type });

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        if (!session?.metadata?.userId || !session?.metadata?.courseId) {
          logger.error('Missing metadata in checkout session', { session });
          return new NextResponse('Missing metadata', { status: 400 });
        }

        await prisma.purchase.create({
          data: {
            userId: session.metadata.userId,
            courseId: session.metadata.courseId,
            amount: (session.amount_total ?? 0) / 100,
            currency: session.currency ?? 'usd',
            status: 'completed',
            stripeSessionId: session.id,
            paymentIntentId: session.payment_intent as string,
          },
        });

        // Atualizar o status da inscrição do usuário no curso
        await prisma.courseEnrollment.create({
          data: {
            userId: session.metadata.userId,
            courseId: session.metadata.courseId,
            status: 'active',
            enrolledAt: new Date(),
          },
        });

        logger.info('Purchase completed successfully', {
          userId: session.metadata.userId,
          courseId: session.metadata.courseId,
          sessionId: session.id,
        });

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        if (!paymentIntent.metadata?.userId || !paymentIntent.metadata?.courseId) {
          logger.error('Missing metadata in payment intent', { paymentIntent });
          return new NextResponse('Missing metadata', { status: 400 });
        }

        await prisma.purchase.create({
          data: {
            userId: paymentIntent.metadata.userId,
            courseId: paymentIntent.metadata.courseId,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            status: 'failed',
            stripeSessionId: paymentIntent.metadata.sessionId,
            paymentIntentId: paymentIntent.id,
            errorMessage: paymentIntent.last_payment_error?.message,
          },
        });

        logger.error('Payment failed', {
          userId: paymentIntent.metadata.userId,
          courseId: paymentIntent.metadata.courseId,
          error: paymentIntent.last_payment_error?.message,
        });

        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;

        if (!subscription.metadata?.userId) {
          logger.error('Missing userId in subscription metadata', { subscription });
          return new NextResponse('Missing userId', { status: 400 });
        }

        await prisma.subscription.upsert({
          where: {
            stripeSubscriptionId: subscription.id,
          },
          create: {
            userId: subscription.metadata.userId,
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCustomerId: subscription.customer as string,
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
          update: {
            status: subscription.status,
            stripePriceId: subscription.items.data[0].price.id,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
        });

        logger.info('Subscription updated', {
          userId: subscription.metadata.userId,
          subscriptionId: subscription.id,
          status: subscription.status,
        });

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        if (!subscription.metadata?.userId) {
          logger.error('Missing userId in subscription metadata', { subscription });
          return new NextResponse('Missing userId', { status: 400 });
        }

        await prisma.subscription.update({
          where: {
            stripeSubscriptionId: subscription.id,
          },
          data: {
            status: 'canceled',
            canceledAt: new Date(),
          },
        });

        logger.info('Subscription canceled', {
          userId: subscription.metadata.userId,
          subscriptionId: subscription.id,
        });

        break;
      }

      default:
        logger.warn('Unhandled event type', { type: event.type });
    }

    return new NextResponse('Webhook processed', { status: 200 });
  } catch (error: unknown) {
    logger.error('Error processing webhook', {
      error: error instanceof Error ? error.message : String(error),
    });
    return new NextResponse('Webhook Error', { status: 500 });
  }
}
