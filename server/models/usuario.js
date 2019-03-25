const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    rut: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    feNaci: {
        type: Date
    },
    idFacebook: {
        type: String,
        unique: true,
        required: [true, 'El id de Facebook es obligatorio']
    },
    posicion: {
        type: Number,
        unique: true,
    },
    notificacion: {
        type: Boolean,
        default: false,
    },
    estado: {
        type: Boolean,
        required: [true, 'El estado es obligatorio']
    }
});

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

module.exports = mongoose.model('Usuario', usuarioSchema);