const { execSync } = require('child_process');
const { logger } = require('../src/lib/logger');
const { glob } = require('glob');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

async function fixFormatting() {
  try {
    logger.info('Iniciando correção de formatação...');

    // Executa o prettier em todos os arquivos
    execSync('npx prettier --write .', { stdio: 'pipe' });

    // Corrige problemas específicos de CRLF
    const files = glob.sync('src/**/*.{ts,tsx}');
    for (const file of files) {
      const content = readFileSync(file, 'utf-8');
      const fixedContent = content
        .replace(/\r\n/g, '\n') // Substitui CRLF por LF
        .replace(/\r/g, '\n') // Substitui CR por LF
        .replace(/\n{3,}/g, '\n\n') // Remove múltiplas linhas em branco
        .trim(); // Remove espaços em branco no início e fim

      writeFileSync(file, fixedContent, 'utf-8');
      logger.info(`Formatação corrigida em: ${file}`);
    }

    logger.info('Correção de formatação concluída com sucesso!');
  } catch (error) {
    logger.error(
      'Erro ao corrigir formatação:',
      error instanceof Error ? error : new Error(String(error))
    );
    process.exit(1);
  }
}

fixFormatting();
