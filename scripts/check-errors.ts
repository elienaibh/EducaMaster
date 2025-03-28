import { checkErrors } from '../src/lib/error-checker';
import { logger } from '../src/lib/logger';

async function main() {
  logger.info('🔍 Iniciando verificação de erros...');

  const errors = await checkErrors();

  if (errors.length > 0) {
    logger.error(`❌ Encontrados ${errors.length} erros:`);
    errors.forEach(error => {
      logger.error(`- ${error.message} (Severidade: ${error.severity})`);
    });
    process.exit(1);
  }

  logger.info('✅ Verificação concluída com sucesso!');
  process.exit(0);
}

main().catch(error => {
  logger.error('Erro durante a verificação:', error);
  process.exit(1);
});
