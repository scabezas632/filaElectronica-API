const express = require('express');
const Region = require('../models/region');

const app = express();

app.get('/region', function(req, res) {

    Region.find({})
        .exec((err, regiones) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Region.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    regiones,
                    length: conteo
                })
            });

        })

})

app.post('/region', function(req, res) {
    let body = req.body;

    let region = new Region({
        nombre: body.nombre
    });

    region.save((err, regionDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            region: regionDB
        })

    });

})

app.put('/region/:id', function(req, res) {
    let id = req.params.id;

    Region.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, regionDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            region: regionDB
        })
    });
})

app.delete('/region/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    Region.findByIdAndRemove(id, (err, regionBorrado) => {

        // Cambiar estado del registro
        // region.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, regionDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            region: regionBorrado
        })
    });

})

module.exports = app;