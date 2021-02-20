const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
//inicialización
const app = express();

//settings 
app.set('port', 3000);

//middlewares
app.use(morgan(`dev`));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));

    }
})
app.use(multer({storage}).single('image'));

//formulario desde el frontend , interpreta los datos como JSON
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//empezar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ', app.get('port'));
});