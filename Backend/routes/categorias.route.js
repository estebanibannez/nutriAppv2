const { Router } = require('express');

const router = Router();


router.get('/' , (req, res)=> {
    return res.json({
        'status': 200,
        'message': 'OK'
    })
})

module.exports = router;