const convertToSnakeCase = require('../../src/utils/convertToSnakeCaseHelper');

describe('convertToSnakeCaseHelper', () => {
    it('deve converter chave camelCase para snake_case', () => {
        const resultado = convertToSnakeCase({ estudanteId: 1 });
        expect(resultado).toEqual({ estudante_id: 1 });
    });

    it('deve converter múltiplas chaves camelCase', () => {
        const resultado = convertToSnakeCase({ estudanteId: 1, cursoId: 2, dataInicio: '2025-01-01' });
        expect(resultado).toEqual({ estudante_id: 1, curso_id: 2, data_inicio: '2025-01-01' });
    });

    it('não deve alterar chaves já em snake_case', () => {
        const resultado = convertToSnakeCase({ estudante_id: 1, curso_id: 2 });
        expect(resultado).toEqual({ estudante_id: 1, curso_id: 2 });
    });

    it('não deve alterar chaves sem letras maiúsculas', () => {
        const resultado = convertToSnakeCase({ status: 'matriculado', id: 1 });
        expect(resultado).toEqual({ status: 'matriculado', id: 1 });
    });

    it('deve lidar com objeto vazio', () => {
        expect(convertToSnakeCase({})).toEqual({});
    });

    it('deve preservar os valores ao converter as chaves', () => {
        const resultado = convertToSnakeCase({ nomeCompleto: 'João Silva' });
        expect(resultado).toEqual({ nome_completo: 'João Silva' });
    });
});
