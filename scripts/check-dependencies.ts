import { execSync } from 'child_process';
import { logger } from '@/lib/logger';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface PackageJson {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

async function checkDependencies() {
  try {
    // Lê o package.json
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
    ) as PackageJson;

    // Verifica dependências desatualizadas
    logger.info('Verificando dependências desatualizadas...');
    const outdated = execSync('npm outdated --json').toString();
    const outdatedDeps = JSON.parse(outdated);

    if (Object.keys(outdatedDeps).length > 0) {
      logger.warn('Dependências desatualizadas encontradas:', outdatedDeps);

      // Atualiza dependências menores (patch e minor)
      logger.info('Atualizando dependências...');
      execSync('npm update', { stdio: 'inherit' });

      // Atualiza dependências maiores (major)
      logger.info('Atualizando dependências principais...');
      execSync('npm install -g npm-check-updates', { stdio: 'inherit' });
      execSync('ncu -u', { stdio: 'inherit' });
      execSync('npm install', { stdio: 'inherit' });
    } else {
      logger.info('Todas as dependências estão atualizadas!');
    }

    // Verifica vulnerabilidades
    logger.info('Verificando vulnerabilidades...');
    execSync('npm audit', { stdio: 'inherit' });

    // Verifica problemas de TypeScript
    logger.info('Verificando problemas de TypeScript...');
    execSync('npx tsc --noEmit', { stdio: 'inherit' });

    // Executa o linter
    logger.info('Executando linter...');
    execSync('npm run lint', { stdio: 'inherit' });
  } catch (error) {
    logger.error(
      'Erro ao verificar dependências:',
      error instanceof Error ? error : new Error(String(error))
    );
    process.exit(1);
  }
}

checkDependencies();
