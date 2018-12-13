const express = require('express');
const Mensaje = require('../models/mensaje');

const app = express();

app.get('/mensaje', function(req, res) {

    Mensaje.find(query)
        .exec((err, mensajes) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Mensaje.count(query, (err, conteo) => {
                res.json({
                    ok: true,
                    mensajes,
                    length: conteo
                })
            });

        })

})

app.post('/mensaje', function(req, res) {
    let body = req.body;

    let mensaje = new mensaje({
        fromUser: body.fromUser,
        producto: body.producto,
        fecha: body.fecha,
        intent: body.intent,
        consulta: body.consulta
    });

    Mensaje.save((err, mensajeDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            mensajes: mensajeDB
        })

    });

})

app.put('/mensaje/:id', function(req, res) {
    let id = req.params.id;

    Mensaje.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, mensajeDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            mensaje: mensajeDB
        })
    });
})

app.delete('/mensaje/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    Mensaje.findByIdAndRemove(id, (err, mensajeBorrado) => {

        // Cambiar estado del registro
        // mensaje.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, mensajeDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            mensaje: mensajeBorrado
        })
    });

})

module.exports = app;