if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

//inicialización
const app = express();
require('./database')

//settings 
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan(`dev`));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));

    }
})
app.use(multer({
    storage
}).single('image'));

//routes
app.use('/api/categorias', require('./routes/categorias.route'));


//static files
app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'))
//formulario desde el frontend , interpreta los datos como JSON
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//empezar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto ${app.get("port")}`);
    console.log(`Trabajando en ambiente de : ${process.env.NODE_ENV}`);
});