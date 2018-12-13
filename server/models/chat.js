const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let chatSchema = new Schema({
    usuario: {
        type: String,
        ref: 'Usuario',
        required: [true, 'El id de facebook es obligatorio'],
        unique: true
    },
    mensajes: {
        type: Array,
        required: [true, 'Los mensajes son obligatorios']
    }
});

chatSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Chat', chatSchema);