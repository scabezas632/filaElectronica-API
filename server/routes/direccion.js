const express = require('express');
const Direccion = require('../models/direccion');

const app = express();

app.get('/direccion', function(req, res) {

    // Si se busca por alguna comuna en especifica
    // de lo contrario se buscan todas las direcciones
    let query = {};
    if (req.query.comuna) {
        query = {
            comuna: req.query.comuna
        };
    }

    Direccion.find(query)
        .populate({
            path: 'comuna',
            populate: {
                path: 'region'
            }
        })
        .exec((err, direcciones) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Direccion.count(query, (err, conteo) => {
                res.json({
                    ok: true,
                    direcciones,
                    length: conteo
                })
            });

        })

})

app.post('/direccion', function(req, res) {
    let body = req.body;

    let direccion = new Direccion({
        calle: body.calle,
        comuna: body.comuna
    });

    direccion.save((err, direccionDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            direccion: direccionDB
        })

    });

})

app.put('/direccion/:id', function(req, res) {
    let id = req.params.id;

    Direccion.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, direccionDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            direccion: direccionDB
        })
    });
})

app.delete('/direccion/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    Direccion.findByIdAndRemove(id, (err, direccionBorrado) => {

        // Cambiar estado del registro
        // direccion.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, direccionDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            direccion: direccionDB
        })
    });

})

module.exports = app;