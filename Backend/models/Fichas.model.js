const {
    ObjectId
} = require('mongodb');
const {
    Schema,
    model,
    ObjectId
} = require('mongoose');



const FichaSchema = new Schema({
    idFicha: {
        type: String
    },
    patologias: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300
    },
    detalle: {
        type: String,
        trim: true,
    },
    talla: {
        type: String,
        trim: true,
        maxlength: 20
    },
    otros: {
        type: String,
        trim: true,
        maxlength: 800
    },

    paciente: {
        type: ObjectId,
        ref: "Paciente",
        require: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Ficha', FichaSchema);