const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let consultaSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
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

consultaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Consulta', consultaSchema);