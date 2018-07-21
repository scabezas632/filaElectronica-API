const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let horarioSchema = new Schema({
    semanaApertura: {
        type: Date,
        required: [true, 'El horario de apertura semanal es obligatorio']
    },
    semanaCierre: {
        type: Date,
        required: [true, 'El horario de cierre semanal es obligatorio']
    },
    domingoApertura: {
        type: Date,
        required: [true, 'El horario de apertura del domingo y festivos es obligatorio']
    },
    domingoCierre: {
        type: Date,
        required: [true, 'El horario de cierre del domingo y festivos es obligatorio']
    },
    horarioEspecial: {
        type: Schema.Types.ObjectId,
        ref: 'HorarioEspecial',
    }
});

horarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Horario', horarioSchema);