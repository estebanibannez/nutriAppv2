const Pacientes = require('../models/Pacientes.model');
const _ = require('lodash');
const fs = require('fs');
const formidable = require('formidable');
const {
    errorHandler
} = require('../helpers/dberrorHandler');

exports.getPacientes = async (req, res) => {
    try {
        const query = await Pacientes.find();

        return res.json({
            'status': 200,
            'message': 'OK',
            'data': query
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}



exports.postPaciente = (req, res) => {
    try {

        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {

            if (err) {
                return res.status(400).json({
                    error: 'image could not be uploaded'
                })
            }

            const {
                nombre,
                apellidos,
                rut,
                edad,
                telefono,
                email,
                estado_civil
            } = fields;

            let paciente = new Pacientes(fields);

            if (files.foto) {
                if (files.foto.size > 1000000) {
                    return res.status(400).json({
                        error: 'La imagen pesa mas de 1MB.'
                    })
                }
                paciente.foto.data = fs.readFileSync(files.foto.path);
                paciente.foto.contentType = files.foto.type;
            }


            paciente.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(error)
                    })
                }

                res.json({
                    'status': 200,
                    'message': 'Registro almacenado con éxito.',
                    'data': result
                });

            })


        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.deletePaciente = async (req, res) => {

    try {
        const id = req.params.id;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {

            const query = await Pacientes.findByIdAndDelete(req.params.id);

            if (query !== null)
                return res.json({
                    'status': 200,
                    'message': 'Registro eliminado con éxito.',
                    'data': query
                });
            else
                return res.json({
                    'status': 404,
                    'message': 'No éxisten datos para eliminar.',
                });
        } else {
            return res.json({
                'status': 500,
                'message': 'Indique un ID valido',
            });
        }
    } catch (error) {
        return res.status(500).send(error);
    }


}

//paso el parametro  hago la busqueda y asigno el objeto a req.paciente
//se puede utilizar varias veces.
exports.pacientesbyId = (req, res, next, id) => {
    Pacientes.findById(id)
    //   .populate("category")
      .exec((err, paciente) => {
        if (err || !paciente) {
          return res.status(400).json({
            error: "Paciente no encontrado."
          });
        }
        req.paciente = paciente;
        next();
      })
  }

exports.read = (req, res) => {
    req.paciente.photo = undefined;
    return res.json(req.paciente);
}

exports.getPhoto = (req, res, next) => {
    console.log(req.paciente)
    if (req.paciente.foto.data) {
        res.set('Content-Type', req.paciente.foto.contentType)
        return res.send(req.paciente.foto.data)
    }
    next();
}