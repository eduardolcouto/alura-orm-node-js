const conversorDeString = require('../../src/utils/conversorDeStringHelper');

describe('conversorDeStringHelper', () => {
    it('deve converter propriedades com sufixo "Id" para Number', () => {
        const resultado = conversorDeString({ estudanteId: '1', curso_id: '2' });
        expect(resultado).toEqual({ estudanteId: 1, curso_id: 2 });
    });

    it('deve converter propriedade "id" minúsculo para Number', () => {
        const resultado = conversorDeString({ id: '5' });
        expect(resultado).toEqual({ id: 5 });
    });

    it('não deve alterar propriedades que não contêm "Id" ou "id"', () => {
        const resultado = conversorDeString({ status: 'matriculado', titulo: 'Node.js' });
        expect(resultado).toEqual({ status: 'matriculado', titulo: 'Node.js' });
    });

    it('deve lidar com objeto vazio', () => {
        expect(conversorDeString({})).toEqual({});
    });

    it('deve converter múltiplas propriedades com Id no mesmo objeto', () => {
        const resultado = conversorDeString({ estudanteId: '3', cursoId: '7', id: '1' });
        expect(resultado).toEqual({ estudanteId: 3, cursoId: 7, id: 1 });
    });
});
