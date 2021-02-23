const {
    Router
} = require('express');
const router = Router();
const Categorias = require('../models/categorias.model')


/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Categorias nutriAppv2 managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Categorias:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: Definir
 *         title:
 *           type: string
 *           description: Definir
 *         author:
 *           type: string
 *           description: Definir
 *       example:
 *         _id: 6030ac97f2974445947f3355
 *         id: 13
 *         nombre: Azúcar
 *         descripcion: ""
 *         calorias: 20
 *         hdc: 5
 *         lipidos: 0
 *         proteinas: 0
 *         imagen_url: ""
 *         fecha_creacion: "2021-11-02T17:20:00.000Z"
 *         estado: true
 * 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoriasID:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: Definir
 *         title:
 *           type: string
 *           description: Definir
 *         author:
 *           type: string
 *           description: Definir
 *       example:
 *         nombre: Test
 *         descripcion: ""
 *         calorias: 20
 *         hdc: 5
 *         lipidos: 0
 *         proteinas: 0
 *         imagen_url: ""
 *         estado: true
 * 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ResponseSuccess:
 *       example:
 *        status: 200,
 *        message: Registro almacenado con éxito.
 *        data: 
 *         id: 13
 *         nombre: Azúcar
 *         descripcion: ""
 *         calorias: 20
 *         hdc: 5
 *         lipidos: 0
 *         proteinas: 0
 *         imagen_url: ""
 *         estado: true 
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Retorna un listado de todas las categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Retona una lista de todas las categorias almacenadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categorias'
 */


//GET
router.get('/', async (req, res) => {
    const query = await Categorias.find();

    return res.json({
        'status': 200,
        'message': 'OK',
        'data': query
    })
});


/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crea una nueva categoria
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaID'
 *     responses:
 *       200:
 *         description: La categoria fue creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseSuccess'
 *       500:
 *         description: Some server error
 */


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

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Permite buscar una categoria por su id
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Indique un id
 *     responses:
 *       200:
 *         description: Devuelve solo una categoria.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categorias'
 *       404:
 *         description: No éxisten datos.
 *       500:
 *         description: El id no es valido.
 */

//GET BY ID
router.get('/:id', async (req, res) => {
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
});


/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Elimina una categoria por id
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id categoria
 * 
 *     responses:
 *       200:
 *         description: Registro eliminado con éxito.
 *       404:
 *         description: No éxisten datos para eliminar.
 */

router.delete('/:id', async (req, res) => {
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
});


/**
 * @swagger
 * /api/categorias/{id}:
 *  put:
 *    summary: Actualiza una categoria
 *    tags: [Categorias]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id categoria
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CategoriasID'
 *    responses:
 *      200:
 *        description: Registro actualizado con éxito.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseSuccess'
 *      404:
 *        description: The categoria was not found
 *      500:
 *        description: Some error happened
 */

//PUT
router.put('/:id', async (req, res) => {
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