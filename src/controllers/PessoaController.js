const Controller = require('../controllers/Controller.js');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
    constructor() {
        super(pessoaServices);
    }

    async pegaMatriculas(req, res) {
        const { estudanteId } = req.params;
        try {
            const matriculas = await pessoaServices.pegaMatriculasPorEstudante(Number(estudanteId));
            res.status(200).json(matriculas);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = PessoaController;