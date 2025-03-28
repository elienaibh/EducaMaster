import { logger } from './logger';

type FileCategory = 'image' | 'document' | 'video' | 'audio';

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

interface ValidationMetadata extends Record<string, unknown> {
  fileType?: string;
  allowedTypes?: string[];
  fileSize?: number;
  maxSize?: number;
}

const ALLOWED_FILE_TYPES: Record<FileCategory, string[]> = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  document: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  video: ['video/mp4', 'video/webm', 'video/ogg'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
};

const FILE_SIZE_LIMITS: Record<FileCategory, number> = {
  image: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
  video: 100 * 1024 * 1024, // 100MB
  audio: 20 * 1024 * 1024, // 20MB
};

export function validateFile(file: File, category: FileCategory): ValidationResult {
  // Verificar se o tipo de arquivo é permitido
  const allowedTypes = ALLOWED_FILE_TYPES[category];

  if (!allowedTypes.includes(file.type)) {
    const error = `Tipo de arquivo não permitido. Tipos permitidos: ${allowedTypes.join(', ')}`;
    logger.warn('File type validation failed', {
      fileType: file.type,
      allowedTypes,
    } as ValidationMetadata);
    return { isValid: false, error };
  }

  // Verificar o tamanho do arquivo
  if (file.size > FILE_SIZE_LIMITS[category]) {
    const maxSizeMB = FILE_SIZE_LIMITS[category] / (1024 * 1024);
    const error = `Arquivo muito grande. Tamanho máximo permitido: ${maxSizeMB}MB`;
    logger.warn('File size validation failed', {
      fileSize: file.size,
      maxSize: FILE_SIZE_LIMITS[category],
    } as ValidationMetadata);
    return { isValid: false, error };
  }

  return { isValid: true };
}

// Função para gerar um nome de arquivo seguro
export function generateSafeFileName(originalName: string): string {
  // Remover caracteres especiais e espaços
  const safeName = originalName
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-');

  // Adicionar timestamp para garantir unicidade
  const timestamp = Date.now();
  const extension = safeName.split('.').pop();

  return `${safeName.split('.')[0]}-${timestamp}.${extension}`;
}

// Função para gerar uma chave S3 baseada na categoria e nome do arquivo
export function generateS3Key(category: FileCategory, fileName: string): string {
  const safeName = generateSafeFileName(fileName);
  return `${category}/${safeName}`;
}

// Função para extrair a extensão do arquivo
export function getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

// Função para verificar se um arquivo é uma imagem
export function isImage(file: File): boolean {
  return ALLOWED_FILE_TYPES.image.includes(file.type);
}

// Função para verificar se um arquivo é um vídeo
export function isVideo(file: File): boolean {
  return ALLOWED_FILE_TYPES.video.includes(file.type);
}

// Função para verificar se um arquivo é um documento
export function isDocument(file: File): boolean {
  return ALLOWED_FILE_TYPES.document.includes(file.type);
}

// Função para verificar se um arquivo é um áudio
export function isAudio(file: File): boolean {
  return ALLOWED_FILE_TYPES.audio.includes(file.type);
}
