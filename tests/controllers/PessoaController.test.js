const mockPessoaServicesInstance = {
    pegaMatriculasPorEstudante: jest.fn(),
    pegaPessoasTodos: jest.fn(),
    pegaTodosOsRegistros: jest.fn(),
    pegaUmRegistroPorId: jest.fn(),
    criaRegistro: jest.fn(),
    atualizaRegistro: jest.fn(),
    excluiRegistro: jest.fn(),
};

// Variáveis prefixadas com "mock" podem ser usadas dentro de factories do jest.mock
jest.mock('../../src/services/PessoaServices', () =>
    jest.fn().mockImplementation(() => mockPessoaServicesInstance)
);

const PessoaController = require('../../src/controllers/PessoaController');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('PessoaController', () => {
    let controller;

    beforeAll(() => {
        controller = new PessoaController();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('pegaMatriculas', () => {
        it('deve responder com status 200 e as matrículas do estudante', async () => {
            const matriculas = [{ id: 1, status: 'matriculado' }];
            mockPessoaServicesInstance.pegaMatriculasPorEstudante.mockResolvedValue(matriculas);
            const req = { params: { estudanteId: '1' } };
            const res = mockRes();

            await controller.pegaMatriculas(req, res);

            expect(mockPessoaServicesInstance.pegaMatriculasPorEstudante).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(matriculas);
        });

        it('deve responder com status 500 quando o estudante não é encontrado', async () => {
            mockPessoaServicesInstance.pegaMatriculasPorEstudante.mockRejectedValue(
                new Error('Pessoa não encontrada')
            );
            const req = { params: { estudanteId: '999' } };
            const res = mockRes();

            await controller.pegaMatriculas(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Pessoa não encontrada' });
        });
    });

    describe('pegaTodosAsPessoas', () => {
        it('deve responder com status 200 e todas as pessoas incluindo inativas', async () => {
            const pessoas = [
                { id: 1, nome: 'João', ativo: true },
                { id: 2, nome: 'Maria', ativo: false },
            ];
            mockPessoaServicesInstance.pegaPessoasTodos.mockResolvedValue(pessoas);
            const req = {};
            const res = mockRes();

            await controller.pegaTodosAsPessoas(req, res);

            expect(mockPessoaServicesInstance.pegaPessoasTodos).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(pessoas);
        });

        it('deve responder com status 500 quando o service lançar erro', async () => {
            mockPessoaServicesInstance.pegaPessoasTodos.mockRejectedValue(new Error('Erro interno'));
            const req = {};
            const res = mockRes();

            await controller.pegaTodosAsPessoas(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno' });
        });
    });
});
