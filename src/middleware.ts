import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { logger } from '@/lib/logger';
import { UserRole } from '@prisma/client';

interface ExtendedError extends Error {
  code?: string;
  statusCode?: number;
}

// Rotas que não precisam de autenticação
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/api/auth',
  '/api/webhooks',
  '/blog',
  '/cursos',
  '/sobre',
  '/contato',
];

// Rotas que precisam de autenticação
const protectedRoutes = [
  '/dashboard',
  '/perfil',
  '/configuracoes',
  '/cursos/[id]/aulas',
  '/cursos/[id]/provas',
  '/cursos/[id]/certificado',
];

// Rotas que precisam de role específico
const roleProtectedRoutes = {
  ADMIN: ['/admin', '/admin/users', '/admin/courses', '/admin/analytics'],
  INSTRUCTOR: ['/instructor', '/instructor/courses', '/instructor/students'],
};

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    // Gerar ID único para a requisição
    const requestId = crypto.randomUUID();
    logger.setRequestId(requestId);

    // Verificar se é uma rota pública
    if (publicRoutes.some(route => pathname.startsWith(route))) {
      const response = NextResponse.next();
      response.headers.set('x-request-id', requestId);
      return response;
    }

    // Verificar autenticação
    const token = await getToken({ req: request });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())token) {
      logger.warn('Tentativa de acesso não autenticado', {
        path: pathname,
        ip: request.ip,
      });

      const response = NextResponse.redirect(new URL('/login', request.url));
      response.headers.set('x-request-id', requestId);
      return response;
    }

    // Verificar role para rotas protegidas
    for (const [role, routes] of Object.entries(roleProtectedRoutes)) {
      if (routes.some(route => pathname.startsWith(route))) {
        if (token.role !== role) {
          logger.warn('Tentativa de acesso não autorizado', {
            path: pathname,
            role: token.role,
            requiredRole: role,
            userId: token.sub,
          });

          const response = NextResponse.redirect(new URL('/dashboard', request.url));
          response.headers.set('x-request-id', requestId);
          return response;
        }
      }
    }

    // Log de acesso bem-sucedido
    logger.info('Acesso autorizado', {
      path: pathname,
      userId: token.sub,
      role: token.role,
    });

    const response = NextResponse.next();
    response.headers.set('x-request-id', requestId);
    return response;
  } catch (error) {
    const err = error as ExtendedError;

    logger.error('Erro no middleware', err, {
      path: request.nextUrl.pathname,
      method: request.method,
      ip: request.ip,
    });

    return new NextResponse(
      JSON.stringify({
        error: 'Erro interno do servidor',
        requestId: crypto.randomUUID(),
      }),
      {
        status: err.statusCode || 500,
        headers: {
          'Content-Type': 'application/json',
          'x-request-id': crypto.randomUUID(),
        },
      }
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};