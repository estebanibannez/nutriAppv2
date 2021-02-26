const { errorHandler } = require('../helpers/dberrorHandler');
const Categorias = require('../Backend/models/Categorias.model');

exports.getCategorias = async (req, res) => {
    try {
        const query = await Categorias.find();

        console.log('consulta.. ',query)
        return res.json({
            'status': 200,
            'message': 'OK',
            'data': query
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}


exports.postCategorias = async (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            calorias,
            hdc,
            lipidos,
            proteinas
        } = req.body;

        const newCategoria = new Categorias({
            nombre,
            descripcion,
            calorias,
            hdc,
            lipidos,
            proteinas
        });

        await newCategoria.save();

        // await newCategoria.save((err, res)=> {
        //     if(err){
        //         console.log('ocurrio un error',err)
        //         return res.status(400).json({
        //             error: errorHandler(err)
        //         })
        //     }else{
        //         return res.status(200).json({
        //             'status': 200,
        //             'message': 'Registro almacenado con éxito.',
        //             'data': newCategoria
        //         });

        //     }
           
        // });

        return res.json({
            'status': 200,
            'message': 'Registro almacenado con éxito.',
            'data': newCategoria
        });

    } catch (error) {
        return res.status(500).send(error);
    }
}

exports.getCategoriasbyId = async (req, res) => {

    try {
        const id = req.params.id;

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.

            let query = await Categorias.findById(id);

            if (query !== null)
                return res.json({
                    'status': 200,
                    'message': 'OK',
                    'data': query
                });
            else
                return res.json({
                    'status': 404,
                    'message': 'No éxisten datos.',
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


exports.deleteCategoria = async (req, res) => {
    try {
        const id = req.params.id;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {

            const query = await Categorias.findByIdAndDelete(req.params.id);

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


exports.putCategoria = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        await Categorias.findByIdAndUpdate(id, body, (err, docs) => {
            if (err) {
                return res.status(500).json({
                    'status': 200,
                    'message': `Ocurrió un error ${err}.`,
                });
            } else {
                return res.json({
                    'status': 200,
                    'message': 'Registro actualizado con éxito.'
                    // 'data': docs
                });
            }
        });
    } catch (error) {
        return res.status(500).send(error);
    }

}