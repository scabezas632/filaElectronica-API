const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let clienteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    rut: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    }
});

clienteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Cliente', clienteSchema);