const { fn, col } = require('sequelize');
const Services = require('./Services.js');
const dataSource = require('../database/models');

class MatriculaServices extends Services {
    constructor() {
        super('Matricula');
    }

    async contaMatriculasPorCurso() {
        return dataSource['Matricula'].findAll({
            attributes: [
                'curso_id',
                [fn('COUNT', col('curso_id')), 'matriculados']
            ],
            where: { status: 'matriculado' },
            group: ['curso_id'],
            order: [[fn('COUNT', col('curso_id')), 'DESC']]
        });
    }
}

module.exports = MatriculaServices;