const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let sucursalSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    telefono: {
        type: Number,
        required: [true, 'El telefono es obligatorio']
    },
    direccion: {
        type: Schema.Types.ObjectId,
        ref: 'Direccion',
        required: [true, 'La direccion es obligatoria']
    },
    gerente: {
        type: String,
        required: [true, 'El gerente es obligatorio']
    },
    horario: {
        type: Schema.Types.ObjectId,
        ref: 'Horario',
        required: [true, 'El horario es obligatorio']
    }
});

sucursalSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Sucursal', sucursalSchema);