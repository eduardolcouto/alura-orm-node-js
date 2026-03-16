const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');



const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
    constructor() {
        super(matriculaServices);
    }

    async pegaMatriculasPorEstudante(req, res) {
            const { estudanteId } = (req.params);           
      
            try {
                const listaMatriculaPorEstudante = await matriculaServices.pegaEContaRegistros({
                    estudante_id: Number(estudanteId),
                    status: 'matriculado'
                });
                
                
                return res.status(200).json(listaMatriculaPorEstudante);
            } catch (error) {
                 return res.status(500).json({ error: error.message });
            }
        }

    async contaMatriculasPorCurso(_req, res) {
        try {
            const contagem = await matriculaServices.contaMatriculasPorCurso();
            return res.status(200).json(contagem);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MatriculaController;