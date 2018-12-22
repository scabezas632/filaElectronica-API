const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let mensajeSchema = new Schema({
    idFacebook: {
        type: String,
        required: [true, 'El id de facebook es obligatorio']
    },
    emisor: {
        type: String,
        required: [true, 'El id del emisor es obligatorio']
    },
    intent: {
        type: String,
        required: [true, 'El intent es obligatorio']
    },
    state: {
        type: String,
        required: [true, 'El state es obligatorio']
    },
    mensaje: {
        type: String,
        required: [true, 'El mensaje es obligatorio']
    },
    paramsProxMensaje: {
        type: String
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
    }
},
{ timestamps: true });

mensajeSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Mensaje', mensajeSchema);