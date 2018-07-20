const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let direccionSchema = new Schema({
    calle: {
        type: String,
        required: [true, 'El nombre de la calle es obligatorio']
    },
    comuna: {
        type: Schema.Types.ObjectId,
        ref: 'Comuna',
        required: [true, 'La comuna es obligatoria']
    }
});

direccionSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Direccion', direccionSchema);