const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let mensajeSchema = new Schema({
    fromUser: {
        type: String,
        ref: 'Usuario',
        required: [true, 'El id de facebook es obligatorio']
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    intent: {
        type: String,
        required: [true, 'El intent es obligatorio']
    },
    consulta: {
        type: String,
        required: [true, 'La consulta es obligatoria']
    }
});

mensajeSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Mensaje', consultaSchema);