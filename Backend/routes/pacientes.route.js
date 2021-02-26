const express = require('express');
const router = express.Router();
const {
    getPacientes,
    postPaciente,
    deletePaciente,
    getPhoto,
    pacientesbyId,
    read
} = require('../Backend/controllers/pacientes.controller')

router.get('/', getPacientes);
router.get('/foto/:pacientesId', getPhoto);
router.get('/:pacientesId', read)
router.post('/', postPaciente);

//pacienteId lo sacamos del metodo pacientesbyId desde el controlador
//el parametro que se entrega en la ruta será buscado con este metodo.
router.param("pacientesId", pacientesbyId);

router.delete('/:id', deletePaciente);

module.exports = router;