const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let regionSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    }
});

regionSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Region', regionSchema);