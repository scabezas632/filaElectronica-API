const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let horarioEspecialSchema = new Schema({
    motivo: {
        type: String,
        required: [true, 'El motivo es obligatorio']
    },
    dia: {
        type: Date,
        required: [true, 'El dia es obligatorio']
    },
    horario: {
        type: String,
        required: [true, 'El horario es obligatorio']
    }
});

horarioEspecialSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('HorarioEspecial', horarioEspecialSchema);