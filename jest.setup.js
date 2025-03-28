import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '';
  },
}));

// Mock next-auth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
}));

// Mock do Next.js
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

// Mock do Stripe
jest.mock('stripe', () => ({
  Stripe: jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: jest.fn(),
      },
    },
    customers: {
      create: jest.fn(),
    },
    subscriptions: {
      create: jest.fn(),
      cancel: jest.fn(),
    },
    refunds: {
      create: jest.fn(),
    },
    webhooks: {
      constructEvent: jest.fn(),
    },
  })),
}));

// Mock do SendGrid
jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

// Mock do AWS S3
jest.mock('@aws-sdk/client-s3', () => ({
  S3Client: jest.fn().mockImplementation(() => ({
    send: jest.fn(),
  })),
  PutObjectCommand: jest.fn(),
}));

// Mock do Redis
jest.mock('@upstash/redis', () => ({
  Redis: {
    fromEnv: jest.fn().mockImplementation(() => ({
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
      keys: jest.fn(),
    })),
  },
}));

// Mock do Sharp
jest.mock('sharp', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    resize: jest.fn().mockReturnThis(),
    jpeg: jest.fn().mockReturnThis(),
    webp: jest.fn().mockReturnThis(),
    png: jest.fn().mockReturnThis(),
    toBuffer: jest.fn(),
    metadata: jest.fn(),
  })),
}));
