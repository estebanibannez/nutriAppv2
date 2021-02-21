const {
    Router
} = require('express');
const router = Router();
const Categorias = require('../models/categorias.model')


//GET
router.get('/', async (req, res) => {
    const query = await Categorias.find();

    return res.json({
        'status': 200,
        'message': 'OK',
        'data': query
    })
});

//POST
router.post('/', async (req, res) => {
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

    return res.json({
        'status': 200,
        'message': 'Registro almacenado con éxito.',
        'data': newCategoria
    });
});

//DELETE
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const query = await Categorias.findByIdAndDelete(req.params.id);

    return res.json({
        'status': 200,
        'message': 'Registro eliminado con éxito.',
        'data': query
    });

});

//UPDATE
router.patch('/:id', async (req, res) => {
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

});

module.exports = router;