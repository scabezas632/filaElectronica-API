const express = require('express');
const HorarioEspecial = require('../models/horarioEspecial');

const app = express();

app.get('/horarioEspecial', function(req, res) {

    HorarioEspecial.find({})
        .exec((err, horarioEspeciales) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            HorarioEspecial.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    horarioEspeciales,
                    length: conteo
                })
            });

        })

})

app.post('/horarioEspecial', function(req, res) {
    let body = req.body;

    let horarioEspecial = new HorarioEspecial({
        dia: body.dia,
        horarioInicio: body.horarioInicio,
        horarioFin: body.horarioFin
    });

    horarioEspecial.save((err, horarioEspecialDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            horarioEspecial: horarioEspecialDB
        })

    });

})

app.put('/horarioEspecial/:id', function(req, res) {
    let id = req.params.id;

    HorarioEspecial.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, horarioEspecialDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            horarioEspecial: horarioEspecialDB
        })
    });
})

app.delete('/horarioEspecial/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    HorarioEspecial.findByIdAndRemove(id, (err, horarioEspecialBorrado) => {

        // Cambiar estado del registro
        // horarioEspecial.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, horarioEspecialDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            horarioEspecial: horarioEspecialBorrado
        })
    });

})

module.exports = app;