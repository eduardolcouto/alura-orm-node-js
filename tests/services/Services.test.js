const Services = require('../../src/services/Services');

// Mock do dataSource (models do Sequelize)
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

describe('Services', () => {
    let service;

    beforeEach(() => {
        service = new Services('Pessoa');
        jest.clearAllMocks();
    });

    describe('pegaTodosOsRegistros', () => {
        it('deve chamar findAll e retornar todos os registros', async () => {
            const registrosMock = [{ id: 1, nome: 'João' }, { id: 2, nome: 'Maria' }];
            dataSource.Pessoa.findAll.mockResolvedValue(registrosMock);

            const resultado = await service.pegaTodosOsRegistros();

            expect(dataSource.Pessoa.findAll).toHaveBeenCalledTimes(1);
            expect(resultado).toEqual(registrosMock);
        });
    });

    describe('pegaRegistrosPorScopo', () => {
        it('deve chamar scope e findAll com o escopo fornecido', async () => {
            const registrosMock = [{ id: 1, nome: 'João', ativo: false }];
            const findAllMock = jest.fn().mockResolvedValue(registrosMock);
            dataSource.Pessoa.scope.mockReturnValue({ findAll: findAllMock });

            const resultado = await service.pegaRegistrosPorScopo('todosOsRegistros');

            expect(dataSource.Pessoa.scope).toHaveBeenCalledWith('todosOsRegistros');
            expect(findAllMock).toHaveBeenCalledTimes(1);
            expect(resultado).toEqual(registrosMock);
        });
    });

    describe('pegaUmRegistroPorId', () => {
        it('deve chamar findByPk com o id correto', async () => {
            const registroMock = { id: 1, nome: 'João' };
            dataSource.Pessoa.findByPk.mockResolvedValue(registroMock);

            const resultado = await service.pegaUmRegistroPorId(1);

            expect(dataSource.Pessoa.findByPk).toHaveBeenCalledWith(1);
            expect(resultado).toEqual(registroMock);
        });

        it('deve retornar null quando o registro não existe', async () => {
            dataSource.Pessoa.findByPk.mockResolvedValue(null);

            const resultado = await service.pegaUmRegistroPorId(999);

            expect(resultado).toBeNull();
        });
    });

    describe('criaRegistro', () => {
        it('deve chamar create com os dados fornecidos', async () => {
            const dados = { nome: 'Ana', email: 'ana@email.com', cpf: '52998224725' };
            const criado = { id: 3, ...dados };
            dataSource.Pessoa.create.mockResolvedValue(criado);

            const resultado = await service.criaRegistro(dados);

            expect(dataSource.Pessoa.create).toHaveBeenCalledWith(dados);
            expect(resultado).toEqual(criado);
        });
    });

    describe('atualizaRegistro', () => {
        it('deve retornar true quando ao menos um registro é atualizado', async () => {
            dataSource.Pessoa.update.mockResolvedValue([1]);

            const resultado = await service.atualizaRegistro({ nome: 'Novo Nome' }, 1);

            expect(dataSource.Pessoa.update).toHaveBeenCalledWith(
                { nome: 'Novo Nome' },
                { where: { id: 1 } }
            );
            expect(resultado).toBe(true);
        });

        it('deve retornar false quando nenhum registro é atualizado', async () => {
            dataSource.Pessoa.update.mockResolvedValue([0]);

            const resultado = await service.atualizaRegistro({ nome: 'Novo Nome' }, 999);

            expect(resultado).toBe(false);
        });
    });

    describe('excluiRegistro', () => {
        it('deve chamar destroy com o id correto', async () => {
            dataSource.Pessoa.destroy.mockResolvedValue(1);

            await service.excluiRegistro(1);

            expect(dataSource.Pessoa.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
        });
    });

    describe('pegaUmRegistro', () => {
        it('deve chamar findOne com o where fornecido', async () => {
            const registroMock = { id: 2, estudante_id: 1 };
            dataSource.Pessoa.findOne.mockResolvedValue(registroMock);

            const resultado = await service.pegaUmRegistro({ estudante_id: 1, id: 2 });

            expect(dataSource.Pessoa.findOne).toHaveBeenCalledWith({
                where: { estudante_id: 1, id: 2 },
            });
            expect(resultado).toEqual(registroMock);
        });

        it('deve retornar null quando nenhum registro é encontrado', async () => {
            dataSource.Pessoa.findOne.mockResolvedValue(null);

            const resultado = await service.pegaUmRegistro({ estudante_id: 99, id: 99 });

            expect(resultado).toBeNull();
        });
    });
});
