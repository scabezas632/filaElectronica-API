const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var chatSchema = new Schema({
    idFacebook: {
        type: String,
        required: [true, 'El id de facebook es obligatorio'],
        unique: true
    }
});

chatSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });


module.exports = mongoose.model('Chat', chatSchema);
