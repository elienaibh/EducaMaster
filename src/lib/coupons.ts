import { prisma } from '@/lib/prisma';

export type DadosCupom = {
  codigo: string;
  desconto: number;
  tipoDesconto: 'PORCENTAGEM' | 'VALOR_FIXO';
  dataExpiracao?: Date;
  usoMaximo?: number;
  cursoId?: string;
};

export async function criarCupom(dados: DadosCupom) {
  try {
    // Verifica se já existe um cupom com o mesmo código
    const cupomExistente = await prisma.cupom.findUnique({
      where: { codigo: dados.codigo },
    });

    if (cupomExistente) {
      throw new Error('Já existe um cupom com este código');
    }

    // Cria o cupom
    const cupom = await prisma.cupom.create({
      data: {
        codigo: dados.codigo,
        desconto: dados.desconto,
        tipoDesconto: dados.tipoDesconto,
        dataExpiracao: dados.dataExpiracao,
        usoMaximo: dados.usoMaximo,
        cursoId: dados.cursoId,
        ativo: true,
      },
    });

    return cupom;
  } catch (erro) {
    console.error('Erro ao criar cupom:', erro);
    throw new Error('Não foi possível criar o cupom');
  }
}

export async function validarCupom(codigo: string, cursoId: string) {
  try {
    const cupom = await prisma.cupom.findUnique({
      where: { codigo },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())cupom) {
      throw new Error('Cupom não encontrado');
    }

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())cupom.ativo) {
      throw new Error('Cupom inativo');
    }

    if (cupom.dataExpiracao && cupom.dataExpiracao < new Date()) {
      throw new Error('Cupom expirado');
    }

    if (cupom.cursoId && cupom.cursoId !== cursoId) {
      throw new Error('Cupom não válido para este curso');
    }

    if (cupom.usoMaximo) {
      const usosAtuais = await prisma.usoCupom.count({
        where: { cupomId: cupom.id },
      });

      if (usosAtuais >= cupom.usoMaximo) {
        throw new Error('Limite de uso do cupom atingido');
      }
    }

    return {
      valido: true,
      desconto: cupom.desconto,
      tipoDesconto: cupom.tipoDesconto,
    };
  } catch (erro) {
    console.error('Erro ao validar cupom:', erro);
    throw erro;
  }
}

export async function aplicarCupom(codigo: string, usuarioId: string, cursoId: string) {
  try {
    const cupom = await prisma.cupom.findUnique({
      where: { codigo },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())cupom) {
      throw new Error('Cupom não encontrado');
    }

    // Registra o uso do cupom
    await prisma.usoCupom.create({
      data: {
        cupomId: cupom.id,
        usuarioId,
        cursoId,
      },
    });

    return {
      desconto: cupom.desconto,
      tipoDesconto: cupom.tipoDesconto,
    };
  } catch (erro) {
    console.error('Erro ao aplicar cupom:', erro);
    throw new Error('Não foi possível aplicar o cupom');
  }
}

export async function desativarCupom(codigo: string) {
  try {
    const cupom = await prisma.cupom.update({
      where: { codigo },
      data: { ativo: false },
    });

    return cupom;
  } catch (erro) {
    console.error('Erro ao desativar cupom:', erro);
    throw new Error('Não foi possível desativar o cupom');
  }
}

export async function listarCupons(filtros?: { ativo?: boolean; cursoId?: string }) {
  try {
    const cupons = await prisma.cupom.findMany({
      where: {
        ativo: filtros?.ativo,
        cursoId: filtros?.cursoId,
      },
      include: {
        curso: {
          select: {
            nome: true,
          },
        },
        _count: {
          select: {
            usos: true,
          },
        },
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });

    return cupons;
  } catch (erro) {
    console.error('Erro ao listar cupons:', erro);
    throw new Error('Não foi possível listar os cupons');
  }
}