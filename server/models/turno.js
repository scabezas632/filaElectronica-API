const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let turnoSchema = new Schema({
    actualCaja: {
        type: Number,
        required: [true, 'El nombre es obligatorio'],
        default: 0,
    },
    actualClientes: {
        type: Number,
        required: [true, 'El correo es obligatorio'],
        default: 0,
    },
});

module.exports = mongoose.model('Turno', turnoSchema);