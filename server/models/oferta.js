const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let ofertaSchema = new Schema({
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'El producto es obligatorio']
    },
    precioOferta: {
        type: Number,
        required: [true, 'El precio de oferta es obligatorio']
    },
    ofertaInicio: {
        type: Date,
        required: [true, 'La fecha inicio es obligatoria']
    },
    ofertaFin: {
        type: Date,
        required: [true, 'La fecha fin es obligatoria']
    }
});

ofertaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Oferta', ofertaSchema);