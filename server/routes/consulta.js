const express = require('express');
const Consulta = require('../models/consulta');

const app = express();

app.get('/consulta', function(req, res) {

    Consulta.find({})
        .exec((err, consultas) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Consulta.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    consultas,
                    length: conteo
                })
            });

        })

})

app.post('/consulta', function(req, res) {
    let body = req.body;

    let consulta = new Consulta({
        usuario: body.usuario,
        producto: body.producto,
        intent: body.intent,
        consulta: body.consulta
    });

    consulta.save((err, consultaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            consulta: consultaDB
        })

    });

})

app.put('/consulta/:id', function(req, res) {
    let id = req.params.id;

    Consulta.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, consultaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            consulta: consultaDB
        })
    });
})

app.delete('/consulta/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    Consulta.findByIdAndRemove(id, (err, consultaBorrado) => {

        // Cambiar estado del registro
        // consulta.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, consultaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            consulta: consultaDB
        })
    });

})

module.exports = app;