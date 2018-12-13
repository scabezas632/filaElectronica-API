const express = require('express');
const Chat = require('../models/chat');

const app = express();

app.get('/chat', function(req, res) {

    Chat.find(query)
        .exec((err, chats) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Chat.count(query, (err, conteo) => {
                res.json({
                    ok: true,
                    chats,
                    length: conteo
                })
            });

        })

})

app.post('/chat', function(req, res) {
    let body = req.body;

    let chat = new chat({
        usuario: body.usuario,
        mensajes: body.mensajes
    });

    chat.save((err, chatDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            chat: chatDB
        })

    });

})

app.put('/chat/:id', function(req, res) {
    let id = req.params.id;

    chat.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, chatDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            chat: chatDB
        })
    });
})

app.delete('/chat/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    chat.findByIdAndRemove(id, (err, chatBorrado) => {

        // Cambiar estado del registro
        // chat.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, chatDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            chat: chatBorrado
        })
    });

})

module.exports = app;