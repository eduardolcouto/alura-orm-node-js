const PessoaServices = require('../../src/services/PessoaServices');

jest.mock('../../src/database/models', () => ({
    Pessoa: {
        findAll: jest.fn(),
        scope: jest.fn(),
        findByPk: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}));

const dataSource = require('../../src/database/models');

describe('PessoaServices', () => {
    let pessoaServices;

    beforeEach(() => {
        pessoaServices = new PessoaServices();
        jest.clearAllMocks();
    });

    describe('pegaMatriculasAtivasPorEstudante', () => {
        it('deve retornar apenas matrículas ativas quando a pessoa existe', async () => {
            const matriculasMock = [{ id: 1, status: 'matriculado', curso_id: 2 }];
            const pessoaMock = {
                id: 1,
                nome: 'João',
                getAulasMatriculadas: jest.fn().mockResolvedValue(matriculasMock),
            };
            dataSource.Pessoa.findByPk.mockResolvedValue(pessoaMock);

            const resultado = await pessoaServices.pegaMatriculasAtivasPorEstudante(1);

            expect(dataSource.Pessoa.findByPk).toHaveBeenCalledWith(1);
            expect(pessoaMock.getAulasMatriculadas).toHaveBeenCalledTimes(1);
            expect(resultado).toEqual(matriculasMock);
        });

        it('deve lançar erro quando a pessoa não é encontrada', async () => {
            dataSource.Pessoa.findByPk.mockResolvedValue(null);

            await expect(pessoaServices.pegaMatriculasAtivasPorEstudante(999))
                .rejects
                .toThrow('Pessoa não encontrada');
        });
    });

    describe('pegaTodasAsMatriculasPorEstudante', () => {
        it('deve retornar todas as matrículas (todos os status) quando a pessoa existe', async () => {
            const todasMatriculas = [
                { id: 1, status: 'matriculado', curso_id: 2 },
                { id: 2, status: 'concluido', curso_id: 3 },
            ];
            const pessoaMock = {
                id: 1,
                nome: 'João',
                getTodasAsMatriculas: jest.fn().mockResolvedValue(todasMatriculas),
            };
            dataSource.Pessoa.findByPk.mockResolvedValue(pessoaMock);

            const resultado = await pessoaServices.pegaTodasAsMatriculasPorEstudante(1);

            expect(dataSource.Pessoa.findByPk).toHaveBeenCalledWith(1);
            expect(pessoaMock.getTodasAsMatriculas).toHaveBeenCalledTimes(1);
            expect(resultado).toEqual(todasMatriculas);
        });

        it('deve lançar erro quando a pessoa não é encontrada', async () => {
            dataSource.Pessoa.findByPk.mockResolvedValue(null);

            await expect(pessoaServices.pegaTodasAsMatriculasPorEstudante(999))
                .rejects
                .toThrow('Pessoa não encontrada');
        });
    });

    describe('pegaPessoasTodos', () => {
        it('deve retornar todas as pessoas incluindo inativas', async () => {
            const todasAsPessoas = [
                { id: 1, nome: 'João', ativo: true },
                { id: 2, nome: 'Maria', ativo: false },
            ];
            const findAllMock = jest.fn().mockResolvedValue(todasAsPessoas);
            dataSource.Pessoa.scope.mockReturnValue({ findAll: findAllMock });

            const resultado = await pessoaServices.pegaPessoasTodos();

            expect(dataSource.Pessoa.scope).toHaveBeenCalledWith('todosOsRegistros');
            expect(resultado).toEqual(todasAsPessoas);
        });
    });
});
