const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Escola - ORM com Node.js',
            version: '1.0.0',
            description: 'Documentação da API de gerenciamento de pessoas, cursos, categorias e matrículas',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
        components: {
            schemas: {
                Pessoa: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nome: { type: 'string', example: 'João Silva' },
                        email: { type: 'string', format: 'email', example: 'joao@email.com' },
                        cpf: { type: 'string', example: '12345678909' },
                        ativo: { type: 'boolean', example: true },
                        role: { type: 'string', example: 'estudante' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                PessoaInput: {
                    type: 'object',
                    required: ['nome', 'email', 'cpf'],
                    properties: {
                        nome: { type: 'string', example: 'João Silva' },
                        email: { type: 'string', format: 'email', example: 'joao@email.com' },
                        cpf: { type: 'string', example: '12345678909' },
                        ativo: { type: 'boolean', example: true },
                        role: { type: 'string', example: 'estudante' },
                    },
                },
                Curso: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        titulo: { type: 'string', example: 'Node.js do Zero' },
                        descricao: { type: 'string', example: 'Aprenda Node.js com Express e Sequelize' },
                        data_inicio: { type: 'string', format: 'date', example: '2025-01-15' },
                        categoria_id: { type: 'integer', example: 1 },
                        docente_id: { type: 'integer', example: 2 },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                CursoInput: {
                    type: 'object',
                    required: ['titulo'],
                    properties: {
                        titulo: { type: 'string', example: 'Node.js do Zero' },
                        descricao: { type: 'string', example: 'Aprenda Node.js com Express e Sequelize' },
                        data_inicio: { type: 'string', format: 'date', example: '2025-01-15' },
                        categoria_id: { type: 'integer', example: 1 },
                        docente_id: { type: 'integer', example: 2 },
                    },
                },
                Categoria: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        titulo: { type: 'string', example: 'Back-end' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                CategoriaInput: {
                    type: 'object',
                    required: ['titulo'],
                    properties: {
                        titulo: { type: 'string', example: 'Back-end' },
                    },
                },
                Matricula: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        status: { type: 'string', example: 'matriculado' },
                        estudante_id: { type: 'integer', example: 1 },
                        curso_id: { type: 'integer', example: 1 },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                MatriculaInput: {
                    type: 'object',
                    required: ['status', 'curso_id'],
                    properties: {
                        status: { type: 'string', example: 'matriculado' },
                        curso_id: { type: 'integer', example: 1 },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: { type: 'string', example: 'Mensagem de erro' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
