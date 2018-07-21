const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let horarioSchema = new Schema({
    semana: {
        type: String,
        required: [true, 'El horario semanal es obligatorio']
    },
    domingo: {
        type: String,
        required: [true, 'El horario del domingo y festivos es obligatorio']
    }
});

horarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Horario', horarioSchema);