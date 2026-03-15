const Services = require('./Services.js');

class PessoaServices extends Services {
    constructor() {
        super('Pessoa');
    }

    async pegaMatriculasPorEstudante(id) {

        const pessoa = await super.pegaUmRegistroPorId(id);
        if (!pessoa) {
            throw new Error('Pessoa não encontrada');
        }
        const matriculas = await pessoa.getAulasMatriculadas();
        return matriculas;

    }
}

module.exports = PessoaServices;