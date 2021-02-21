const { Router } = require('express');
const router = Router();
const categorias = require('../models/categorias.model')

router.get('/' , async (req, res)=> {

    const query = await categorias.find();
    return res.json({
        'status': 200,
        'message': 'OK',
        'data': query
    })
})

module.exports = router;