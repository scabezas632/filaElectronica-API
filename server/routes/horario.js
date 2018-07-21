const express = require('express');
const Horario = require('../models/horario');

const app = express();

app.get('/horario', function(req, res) {

    Horario.find({})
        .exec((err, horarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Horario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    horarios,
                    length: conteo
                })
            });

        })

})

app.post('/horario', function(req, res) {
    let body = req.body;

    let horario = new Horario({
        semanaApertura: body.semanaApertura,
        semanaCierre: body.semanaCierre,
        sabadoApertura: body.sabadoApertura,
        sabadoCierre: body.sabadoCierre,
        domingoApertura: body.domingoApertura,
        domingoCierre: body.domingoCierre,
        horarioEspecial: body.horarioEspecial
    });

    horario.save((err, horarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            horario: horarioDB
        })

    });

})

app.put('/horario/:id', function(req, res) {
    let id = req.params.id;

    Horario.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, horarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            horario: horarioDB
        })
    });
})

app.delete('/horario/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    Horario.findByIdAndRemove(id, (err, horarioBorrado) => {

        // Cambiar estado del registro
        // horario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, horarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            horario: horarioBorrado
        })
    });

})

module.exports = app;