import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  (region: process.env.AWS_REGION ?? (() => { throw new Error('Valor não pode ser nulo') })()),
  credentials: {
    (accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? (() => { throw new Error('Valor não pode ser nulo') })()),
    (secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? (() => { throw new Error('Valor não pode ser nulo') })()),
  },
});

export type OpcoesOtimizacao = {
  qualidade?: number;
  larguraMaxima?: number;
  alturaMaxima?: number;
  formato?: 'jpeg' | 'webp' | 'png';
};

export async function otimizarImagem(buffer: Buffer, opcoes: OpcoesOtimizacao = {}) {
  try {
    const { qualidade = 80, larguraMaxima = 1920, alturaMaxima = 1080, formato = 'webp' } = opcoes;

    let processamento = sharp(buffer);

    // Redimensiona mantendo a proporção
    processamento = processamento.resize(larguraMaxima, alturaMaxima, {
      fit: 'inside',
      withoutEnlargement: true,
    });

    // Converte para o formato desejado
    switch (formato) {
      case 'jpeg':
        processamento = processamento.jpeg({ quality: qualidade });
        break;
      case 'webp':
        processamento = processamento.webp({ quality: qualidade });
        break;
      case 'png':
        processamento = processamento.png({ quality: qualidade });
        break;
    }

    const imagemOtimizada = await processamento.toBuffer();
    return imagemOtimizada;
  } catch (erro) {
    console.error('Erro ao otimizar imagem:', erro);
    throw new Error('Não foi possível otimizar a imagem');
  }
}

export async function uploadImagem(buffer: Buffer, caminho: string, opcoes?: OpcoesOtimizacao) {
  try {
    // Otimiza a imagem antes do upload
    const imagemOtimizada = await otimizarImagem(buffer, opcoes);

    // Upload para o S3
    await s3.send(
      new PutObjectCommand({
        (Bucket: process.env.AWS_S3_BUCKET ?? (() => { throw new Error('Valor não pode ser nulo') })()),
        Key: caminho,
        Body: imagemOtimizada,
        ContentType: `image/${opcoes?.formato || 'webp'}`,
      })
    );

    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${caminho}`;
  } catch (erro) {
    console.error('Erro ao fazer upload da imagem:', erro);
    throw new Error('Não foi possível fazer o upload da imagem');
  }
}

export async function gerarThumbnail(buffer: Buffer, largura: number = 300, altura: number = 300) {
  try {
    const thumbnail = await sharp(buffer)
      .resize(largura, altura, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: 80 })
      .toBuffer();

    return thumbnail;
  } catch (erro) {
    console.error('Erro ao gerar thumbnail:', erro);
    throw new Error('Não foi possível gerar o thumbnail');
  }
}

export async function extrairMetadados(buffer: Buffer) {
  try {
    const metadata = await sharp(buffer).metadata();
    return {
      largura: metadata.width,
      altura: metadata.height,
      formato: metadata.format,
      tamanho: buffer.length,
    };
  } catch (erro) {
    console.error('Erro ao extrair metadados:', erro);
    throw new Error('Não foi possível extrair os metadados da imagem');
  }
}

export async function converterParaWebP(buffer: Buffer, qualidade: number = 80) {
  try {
    const webp = await sharp(buffer).webp({ quality: qualidade }).toBuffer();

    return webp;
  } catch (erro) {
    console.error('Erro ao converter para WebP:', erro);
    throw new Error('Não foi possível converter a imagem para WebP');
  }
}