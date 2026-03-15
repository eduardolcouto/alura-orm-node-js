const convertIds = require('../utils/conversorDeStringHelper.js');
const convertToSnakeCase = require('../utils/convertToSnakeCaseHelper.js');
class Controller {
    constructor(service) {
        this.entidadeService = service;
    }
    async pegaTodosOsRegistros(req, res) {
        try {
            const registros = await this.entidadeService.pegaTodosOsRegistros();
            return res.status(200).json(registros);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async pegaUmPorId(req, res) {
        const { id } = req.params;
        try {
            const umRegistro = await this.entidadeService.pegaUmRegistroPorId(Number(id));
            return res.status(200).json(umRegistro);
        } catch (error) {
             return res.status(500).json({ error: error.message });
        }
    }

    async criaNovo(req, res) {
        const dadosParaCriacao = req.body;
        try {
            const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
            return res.status(200).json(novoRegistroCriado);
        } catch (error) {
             return res.status(500).json({ error: error.message });
        }
    }

    async atualiza(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        try {
            const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id));

            if (!foiAtualizado) {
                return res.status(400).json('Registro não foi atualizado');
            }

            return res.status(200).json('Registro atualizado');

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async exclui(req, res) {
        const { id } = req.params;
        try {
            await this.entidadeService.excluiRegistro(Number(id));
            return res.status(200).json({ mensagem: `id ${id} deletado` });


        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async pegaUm(req, res) {
        const { ...params } = (req.params);
        const where = convertToSnakeCase(convertIds(params));
  
        try {
            const umRegistro = await this.entidadeService.pegaUmRegistro(where);
            return res.status(200).json(umRegistro);
        } catch (error) {
             return res.status(500).json({ error: error.message });
        }
    }
 

}

module.exports = Controller;