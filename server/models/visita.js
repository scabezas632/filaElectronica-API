const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let visitaSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'La sucursal es obligatoria']
    },
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: 'Sucursal',
        required: [true, 'La sucursal es obligatoria']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    hora: {
        type: Date,
        required: [true, 'La hora es obligatoria']
    }
});

visitaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Visita', visitaSchema);