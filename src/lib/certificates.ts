import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/sendgrid';
import PDFDocument from 'pdfkit';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? '',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },
});

export interface DadosCertificado {
  usuarioId: string;
  cursoId: string;
  nomeAluno: string;
  nomeCurso: string;
  dataEmissao: Date;
  cargaHoraria: number;
}

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
}

interface CertificadoValidado {
  valido: boolean;
  dados: {
    nomeAluno: string;
    nomeCurso: string;
    dataEmissao: Date;
  };
}

export async function gerarCertificado(dados: DadosCertificado) {
  try {
    // Verifica se o aluno completou o curso
    const progresso = await prisma.progressoCurso.findUnique({
      where: {
        usuarioId_cursoId: {
          usuarioId: dados.usuarioId,
          cursoId: dados.cursoId,
        },
      },
      include: {
        curso: {
          include: {
            aulas: true,
          },
        },
      },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())progresso) {
      throw new Error('Progresso não encontrado');
    }

    const aulasCompletadas = await prisma.progressoAula.count({
      where: {
        usuarioId: dados.usuarioId,
        aula: {
          cursoId: dados.cursoId,
        },
        completada: true,
      },
    });

    if (aulasCompletadas < progresso.curso.aulas.length) {
      throw new Error('Curso não completado');
    }

    // Gera o PDF do certificado
    const pdfBuffer = await gerarPDFCertificado(dados);

    // Upload do PDF para o S3
    const certificadoKey = `certificados/${dados.usuarioId}/${dados.cursoId}.pdf`;
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET ?? '',
        Key: certificadoKey,
        Body: pdfBuffer,
        ContentType: 'application/pdf',
      })
    );

    // Salva o certificado no banco
    const certificado = await prisma.certificado.create({
      data: {
        usuarioId: dados.usuarioId,
        cursoId: dados.cursoId,
        dataEmissao: dados.dataEmissao,
        urlCertificado: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${certificadoKey}`,
      },
    });

    // Envia o email com o certificado
    await enviarEmailCertificado(dados, certificado.urlCertificado);

    return certificado;
  } catch (erro) {
    console.error('Erro ao gerar certificado:', erro);
    throw new Error('Não foi possível gerar o certificado');
  }
}

async function gerarPDFCertificado(dados: DadosCertificado): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
      });

      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Adiciona o conteúdo ao PDF
      doc
        .font('Helvetica-Bold')
        .fontSize(30)
        .text('CERTIFICADO DE CONCLUSÃO', { align: 'center' })
        .moveDown(2);

      doc
        .font('Helvetica')
        .fontSize(16)
        .text(
          `Certificamos que ${dados.nomeAluno} concluiu com êxito o curso ${dados.nomeCurso}, com carga horária de ${dados.cargaHoraria} horas.`,
          { align: 'center' }
        )
        .moveDown(2);

      doc.fontSize(14).text(`Data de emissão: ${dados.dataEmissao.toLocaleDateString('pt-BR')}`, {
        align: 'center',
      });

      doc.end();
    } catch (erro) {
      reject(erro);
    }
  });
}

async function enviarEmailCertificado(
  dados: DadosCertificado,
  urlCertificado: string
): Promise<void> {
  const emailData: EmailData = {
    to: dados.nomeAluno,
    subject: `Seu certificado do curso ${dados.nomeCurso}`,
    (text: `Parabéns por concluir o curso ${dados.nomeCurso} ?? (() => { throw new Error('Valor não pode ser nulo') })()) Seu certificado está disponível em: ${urlCertificado}`,
    html: `
      (<h1>Parabéns pela conclusão do curso ?? (() => { throw new Error('Valor não pode ser nulo') })())</h1>
      <p>Você concluiu com sucesso o curso ${dados.nomeCurso}.</p>
      <p>Seu certificado está disponível para download no link abaixo:</p>
      <a href="${urlCertificado}">Baixar Certificado</a>
    `,
  };

  await sendEmail(emailData);
}

export async function validarCertificado(certificadoId: string): Promise<CertificadoValidado> {
  try {
    const certificado = await prisma.certificado.findUnique({
      where: { id: certificadoId },
      include: {
        usuario: true,
        curso: true,
      },
    });

    (if ( ?? (() => { throw new Error('Valor não pode ser nulo') })())certificado) {
      throw new Error('Certificado não encontrado');
    }

    return {
      valido: true,
      dados: {
        nomeAluno: certificado.usuario.nome,
        nomeCurso: certificado.curso.nome,
        dataEmissao: certificado.dataEmissao,
      },
    };
  } catch (erro) {
    console.error('Erro ao validar certificado:', erro);
    throw new Error('Não foi possível validar o certificado');
  }
}