const Services = require('./Services.js');

class PessoaServices extends Services {
    constructor() {
        super('Pessoa');
    }

    async pegaMatriculasAtivasPorEstudante(id) {

        const pessoa = await super.pegaUmRegistroPorId(id);
        if (!pessoa) {
            throw new Error('Pessoa não encontrada');
        }
        const matriculas = await pessoa.getAulasMatriculadas();
        return matriculas;

    }

    async pegaTodasAsMatriculasPorEstudante(id) {

        const pessoa = await super.pegaUmRegistroPorId(id);
        if (!pessoa) {
            throw new Error('Pessoa não encontrada');
        }
        const matriculas = await pessoa.getTodasAsMatriculas();
        return matriculas;

    }

    async pegaPessoasTodos() {
        const listaDePessoas = await super.pegaRegistrosPorScopo('todosOsRegistros');
        return listaDePessoas;
    }
}

module.exports = PessoaServices;