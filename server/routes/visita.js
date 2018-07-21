const express = require('express');
const Visita = require('../models/visita');

const app = express();

app.get('/visita', function(req, res) {

    Visita.find({})
        .exec((err, visitas) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Visita.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    visitas,
                    length: conteo
                })
            });

        })

})

app.post('/visita', function(req, res) {
    let body = req.body;

    let visita = new Visita({
        usuario: body.usuario,
        sucursal: body.sucursal,
        fecha: body.fecha,
        hora: body.hora
    });

    visita.save((err, visitaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            visita: visitaDB
        })

    });

})

app.put('/visita/:id', function(req, res) {
    let id = req.params.id;

    Visita.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, visitaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            visita: visitaDB
        })
    });
})

app.delete('/visita/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    Visita.findByIdAndRemove(id, (err, visitaBorrado) => {

        // Cambiar estado del registro
        // visita.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, visitaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            visita: visitaBorrado
        })
    });

})

module.exports = app;