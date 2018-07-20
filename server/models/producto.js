const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    codigoBarra: {
        type: Number,
        required: [true, 'El codigo de barras es obligatorio']
    }
});

productoSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Producto', productoSchema);