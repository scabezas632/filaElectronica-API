const express = require('express');
const Sucursal = require('../models/sucursal');

const app = express();

app.get('/sucursal', function(req, res) {

    Sucursal.find({})
        .exec((err, sucursales) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Sucursal.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    sucursales,
                    length: conteo
                })
            });

        })

})

app.post('/sucursal', function(req, res) {
    let body = req.body;

    let sucursal = new Sucursal({
        nombre: body.nombre,
        telefono: body.telefono,
        direccion: body.direccion,
        horario: body.horario
    });

    sucursal.save((err, sucursalDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            sucursal: sucursalDB
        })

    });

})

app.put('/sucursal/:id', function(req, res) {
    let id = req.params.id;

    Sucursal.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, sucursalDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            sucursal: sucursalDB
        })
    });
})

app.delete('/sucursal/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    Sucursal.findByIdAndRemove(id, (err, sucursalBorrado) => {

        // Cambiar estado del registro
        // sucursal.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, sucursalDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            sucursal: sucursalBorrado
        })
    });

})

module.exports = app;