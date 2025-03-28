import {
  formatarPreco,
  formatarData,
  formatarDuracao,
  gerarSlug,
  truncarTexto,
  validarEmail,
  validarSenha,
  validarCPF,
  validarCNPJ,
} from '../utils';

describe('Funções Utilitárias', () => {
  describe('formatarPreco', () => {
    it('deve formatar preço corretamente', () => {
      expect(formatarPreco(1000)).toBe('R$ 1.000,00');
      expect(formatarPreco(99.9)).toBe('R$ 99,90');
      expect(formatarPreco(0)).toBe('R$ 0,00');
    });
  });

  describe('formatarData', () => {
    it('deve formatar data corretamente', () => {
      const data = new Date('2024-03-15');
      expect(formatarData(data)).toBe('15/03/2024');
    });
  });

  describe('formatarDuracao', () => {
    it('deve formatar duração corretamente', () => {
      expect(formatarDuracao(3665)).toBe('1h 1min 5s');
      expect(formatarDuracao(300)).toBe('5min');
      expect(formatarDuracao(45)).toBe('45s');
    });
  });

  describe('gerarSlug', () => {
    it('deve gerar slug corretamente', () => {
      expect(gerarSlug('Curso de JavaScript')).toBe('curso-de-javascript');
      expect(gerarSlug('Programação & Web')).toBe('programacao-web');
      expect(gerarSlug('Título com Acentos é Válido')).toBe('titulo-com-acentos-e-valido');
    });
  });

  describe('truncarTexto', () => {
    it('deve truncar texto corretamente', () => {
      expect(truncarTexto('Texto longo para teste', 10)).toBe('Texto long...');
      expect(truncarTexto('Texto curto', 20)).toBe('Texto curto');
    });
  });

  describe('validarEmail', () => {
    it('deve validar email corretamente', () => {
      expect(validarEmail('usuario@exemplo.com')).toBe(true);
      expect(validarEmail('usuario@exemplo')).toBe(false);
      expect(validarEmail('usuario.exemplo.com')).toBe(false);
    });
  });

  describe('validarSenha', () => {
    it('deve validar senha corretamente', () => {
      expect(validarSenha('Abc123456')).toBe(true);
      expect(validarSenha('abc123')).toBe(false);
      expect(validarSenha('abcdefgh')).toBe(false);
      expect(validarSenha('12345678')).toBe(false);
    });
  });

  describe('validarCPF', () => {
    it('deve validar CPF corretamente', () => {
      expect(validarCPF('529.982.247-25')).toBe(true);
      expect(validarCPF('111.111.111-11')).toBe(false);
      expect(validarCPF('123.456.789-00')).toBe(false);
    });
  });

  describe('validarCNPJ', () => {
    it('deve validar CNPJ corretamente', () => {
      expect(validarCNPJ('11.444.777/0001-61')).toBe(true);
      expect(validarCNPJ('11.111.111/1111-11')).toBe(false);
      expect(validarCNPJ('12.345.678/9012-34')).toBe(false);
    });
  });
});
