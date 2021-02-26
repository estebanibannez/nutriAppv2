if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//EXPORTANDO ROUTES
const CategoriasRouter = require('./routes/categorias.route');
const PacientesRouter = require('./routes/pacientes.route');


const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

//INCORPORACIÓN DE SWAGGER API
//swagger extended: https://swagger.io/specification/#info0bject
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				// url: "http://localhost:3000",
				url: process.env.PATHSWAGGER || "http://localhost:3000",
			},
		],
	},
	apis: ["./src/routes/*.js"],
};

const specs = swaggerJsDoc(options);

//RUN SERVE INITIALIZATION
const app = express();
require('./database');

//SETTINGS
app.set('port', process.env.PORT || 3000);

//MIDLEWARES
app.use(bodyParser.json());
app.use(morgan(`dev`));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));

    }
});
app.use(express.json());

//MULTER PARA LA CARGA DE IMAGENES
// app.use(multer({
//     storage
// }).single('image'));

//Seteo routes

app.use('/api/categorias', CategoriasRouter);
app.use('/api/pacientes', PacientesRouter);
app.use("/", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
  
//formulario desde el frontend , interpreta los datos como JSON
app.use(express.urlencoded({
    extended: false
}));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//RUN LISTEN SERVER
app.listen(app.get('port'), () => {
    console.log(`###################################`)
    console.log(`#########   PORT  ${app.get("port")}  ###########`);
    console.log(`#########   API REST    ###########`)
    console.log(`#########   AMBIENTE    ###########`);
    console.log(`#########   ${process.env.NODE_ENV} ###########`);
    console.log(`###################################`)
});