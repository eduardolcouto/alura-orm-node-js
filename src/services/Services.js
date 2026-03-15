const dataSource = require('../database/models');

class Services {
    constructor(model) {
        this.model = model;
    }

    async pegaTodosOsRegistros() {
        return dataSource[this.model].findAll();
    }

    async pegaRegistrosPorScopo(escopo) {
        return dataSource[this.model].scope(escopo).findAll();
    }

    async pegaUmRegistroPorId(id) {
        return dataSource[this.model].findByPk(id);
    }

    async criaRegistro(dadosDoRegistro) {
        return dataSource[this.model].create(dadosDoRegistro);
    }

    async atualizaRegistro(dadosAtualizados, id) {
        const listaDeRegistrosAtualizados = await dataSource[this.model].update(dadosAtualizados, {
            where: { id: id }
        });

        if (listaDeRegistrosAtualizados[0] === 0) {
            return false;
        }

        return true;

    }

    async excluiRegistro(id) {
        return dataSource[this.model].destroy({ where: { id: id } });
    }

   async pegaUmRegistro(where) {
        return dataSource[this.model].findOne({ where: { ...where } });
    }

}

module.exports = Services;