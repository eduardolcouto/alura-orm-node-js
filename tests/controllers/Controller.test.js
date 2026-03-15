const Controller = require('../../src/controllers/Controller');

const mockService = {
    pegaTodosOsRegistros: jest.fn(),
    pegaUmRegistroPorId: jest.fn(),
    pegaUmRegistro: jest.fn(),
    criaRegistro: jest.fn(),
    atualizaRegistro: jest.fn(),
    excluiRegistro: jest.fn(),
};

const mockReq = (params = {}, body = {}) => ({ params, body });
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Controller', () => {
    let controller;

    beforeEach(() => {
        controller = new Controller(mockService);
        jest.clearAllMocks();
    });

    describe('pegaTodosOsRegistros', () => {
        it('deve responder com status 200 e a lista de registros', async () => {
            const registros = [{ id: 1 }, { id: 2 }];
            mockService.pegaTodosOsRegistros.mockResolvedValue(registros);
            const req = mockReq();
            const res = mockRes();

            await controller.pegaTodosOsRegistros(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(registros);
        });

        it('deve responder com status 500 quando o service lançar erro', async () => {
            mockService.pegaTodosOsRegistros.mockRejectedValue(new Error('Erro de banco'));
            const req = mockReq();
            const res = mockRes();

            await controller.pegaTodosOsRegistros(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro de banco' });
        });
    });

    describe('pegaUmPorId', () => {
        it('deve responder com status 200 e o registro encontrado', async () => {
            const registro = { id: 1, nome: 'João' };
            mockService.pegaUmRegistroPorId.mockResolvedValue(registro);
            const req = mockReq({ id: '1' });
            const res = mockRes();

            await controller.pegaUmPorId(req, res);

            expect(mockService.pegaUmRegistroPorId).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(registro);
        });

        it('deve responder com status 500 quando o service lançar erro', async () => {
            mockService.pegaUmRegistroPorId.mockRejectedValue(new Error('Não encontrado'));
            const req = mockReq({ id: '999' });
            const res = mockRes();

            await controller.pegaUmPorId(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Não encontrado' });
        });
    });

    describe('criaNovo', () => {
        it('deve responder com status 200 e o registro criado', async () => {
            const dados = { nome: 'Ana', email: 'ana@email.com' };
            const criado = { id: 3, ...dados };
            mockService.criaRegistro.mockResolvedValue(criado);
            const req = mockReq({}, dados);
            const res = mockRes();

            await controller.criaNovo(req, res);

            expect(mockService.criaRegistro).toHaveBeenCalledWith(dados);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(criado);
        });

        it('deve responder com status 500 quando o service lançar erro', async () => {
            mockService.criaRegistro.mockRejectedValue(new Error('CPF inválido'));
            const req = mockReq({}, { nome: 'Teste' });
            const res = mockRes();

            await controller.criaNovo(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'CPF inválido' });
        });
    });

    describe('atualiza', () => {
        it('deve responder com status 200 quando o registro é atualizado', async () => {
            mockService.atualizaRegistro.mockResolvedValue(true);
            const req = mockReq({ id: '1' }, { nome: 'Novo Nome' });
            const res = mockRes();

            await controller.atualiza(req, res);

            expect(mockService.atualizaRegistro).toHaveBeenCalledWith({ nome: 'Novo Nome' }, 1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('Registro atualizado');
        });

        it('deve responder com status 400 quando nenhum registro é atualizado', async () => {
            mockService.atualizaRegistro.mockResolvedValue(false);
            const req = mockReq({ id: '999' }, { nome: 'Novo Nome' });
            const res = mockRes();

            await controller.atualiza(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith('Registro não foi atualizado');
        });

        it('deve responder com status 500 quando o service lançar erro', async () => {
            mockService.atualizaRegistro.mockRejectedValue(new Error('Erro ao atualizar'));
            const req = mockReq({ id: '1' }, {});
            const res = mockRes();

            await controller.atualiza(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao atualizar' });
        });
    });

    describe('exclui', () => {
        it('deve responder com status 200 e mensagem de confirmação', async () => {
            mockService.excluiRegistro.mockResolvedValue(1);
            const req = mockReq({ id: '1' });
            const res = mockRes();

            await controller.exclui(req, res);

            expect(mockService.excluiRegistro).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ mensagem: 'id 1 deletado' });
        });

        it('deve responder com status 500 quando o service lançar erro', async () => {
            mockService.excluiRegistro.mockRejectedValue(new Error('Erro ao deletar'));
            const req = mockReq({ id: '1' });
            const res = mockRes();

            await controller.exclui(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    describe('pegaUm', () => {
        it('deve converter params para snake_case com IDs numéricos e chamar pegaUmRegistro', async () => {
            const matriculaMock = { id: 2, estudante_id: 1, status: 'matriculado' };
            mockService.pegaUmRegistro.mockResolvedValue(matriculaMock);
            // estudanteId → estudante_id (snake_case) e id permanecem como números
            const req = mockReq({ estudanteId: '1', id: '2' });
            const res = mockRes();

            await controller.pegaUm(req, res);

            expect(mockService.pegaUmRegistro).toHaveBeenCalledWith({
                estudante_id: 1,
                id: 2,
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(matriculaMock);
        });

        it('deve responder com status 500 quando o service lançar erro', async () => {
            mockService.pegaUmRegistro.mockRejectedValue(new Error('Registro não encontrado'));
            const req = mockReq({ estudanteId: '1', id: '99' });
            const res = mockRes();

            await controller.pegaUm(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Registro não encontrado' });
        });
    });
});
