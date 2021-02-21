const {
    Schema,
    model
} = require('mongoose');

const CategoriaSchema = new Schema({
    id: { type: String },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    calorias: { type: String, required: true },
    hdc: { type: String, required: true },
    lipidos: { type: String, required: true },
    proteinas: { type: String, required: true },
    imagen_url: { type: String },
    fecha_creacion: { type: Date, default: Date.now },
    estado: { type: Boolean}

});

module.exports = model('Categorias',CategoriaSchema);