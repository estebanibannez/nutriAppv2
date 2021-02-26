const {
    Schema,
    model,
    ObjectId
} = require('mongoose');



const PacienteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        maxlength: 70
    },
    apellidos: {
        type: String,
        trim: true,
        maxlength: 70
    },
    rut: {
        type: String,
    },
    edad: {
        type: String,
    },
    telefono: {
        type: String
    },
    email: {
        type: String
    },
    estado_civil: {
        type: String
    },
    ocupacion: {
        type: String
    },
    nacionalidad: {
        type: String
    },
    sexo: {
        type: String
    },
    direccion: {
        type: String
    },
    fecha_nacimiento: {
        type: Date
    },
    foto: {
        data: Buffer,
        contentType: String
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = model('Paciente', PacienteSchema);