const express = require('express');
const Oferta = require('../models/oferta');

const app = express();

app.get('/oferta', function(req, res) {

    Oferta.find({})
        .exec((err, ofertas) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Oferta.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    ofertas,
                    length: conteo
                })
            });

        })

})

app.post('/oferta', function(req, res) {
    let body = req.body;

    let oferta = new Oferta({
        producto: body.producto,
        precioOferta: body.precioOferta,
        ofertaInicio: body.ofertaInicio,
        ofertaFin: body.ofertaFin
    });

    oferta.save((err, ofertaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            oferta: ofertaDB
        })

    });

})

app.put('/oferta/:id', function(req, res) {
    let id = req.params.id;

    Oferta.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, ofertaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            oferta: ofertaDB
        })
    });
})

app.delete('/oferta/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    Oferta.findByIdAndRemove(id, (err, ofertaBorrado) => {

        // Cambiar estado del registro
        // oferta.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, ofertaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            oferta: ofertaBorrado
        })
    });

})

module.exports = app;