const validaCpf = require('../../src/utils/validaCpfHelper');

describe('validaCpfHelper', () => {
    describe('comprimento', () => {
        it('deve retornar false para CPF com menos de 11 dígitos', () => {
            expect(validaCpf('1234567890')).toBe(false);
        });

        it('deve retornar false para CPF com mais de 11 dígitos', () => {
            expect(validaCpf('123456789012')).toBe(false);
        });

        it('deve retornar false para string vazia', () => {
            expect(validaCpf('')).toBe(false);
        });
    });

    describe('dígitos iguais', () => {
        it('deve retornar false para CPF com todos os dígitos iguais (00000000000)', () => {
            expect(validaCpf('00000000000')).toBe(false);
        });

        it('deve retornar false para CPF com todos os dígitos iguais (11111111111)', () => {
            expect(validaCpf('11111111111')).toBe(false);
        });

        it('deve retornar false para CPF com todos os dígitos iguais (99999999999)', () => {
            expect(validaCpf('99999999999')).toBe(false);
        });
    });

    describe('dígito verificador', () => {
        it('deve retornar false para CPF com primeiro dígito verificador inválido', () => {
            // CPF válido seria 52998224725, alteramos o décimo dígito
            expect(validaCpf('52998224715')).toBe(false);
        });

        it('deve retornar false para CPF com segundo dígito verificador inválido', () => {
            // CPF válido seria 52998224725, alteramos o último dígito
            expect(validaCpf('52998224726')).toBe(false);
        });

        it('deve retornar true para CPF válido (529.982.247-25)', () => {
            expect(validaCpf('52998224725')).toBe(true);
        });

        it('deve retornar true para CPF válido (111.444.777-35)', () => {
            expect(validaCpf('11144477735')).toBe(true);
        });

        it('deve retornar true para CPF válido (071.569.450-25)', () => {
            expect(validaCpf('07156945025')).toBe(true);
        });
    });
});
