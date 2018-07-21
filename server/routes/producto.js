const express = require('express');
const Producto = require('../models/producto');

const app = express();

app.get('/producto', function(req, res) {

    // Si se busca por algun codigo de barra especifico
    // de lo contrario se buscan todos los productos
    let query = {};
    if (req.query.codigoBarra) {
        query = {
            codigoBarra: req.query.codigoBarra
        };
    }

    Producto.find(query)
        .exec((err, productos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Producto.count(query, (err, conteo) => {
                res.json({
                    ok: true,
                    productos,
                    length: conteo
                })
            });

        })

})

app.post('/producto', function(req, res) {
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precio: body.precio,
        codigoBarra: body.codigoBarra
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            producto: productoDB
        })

    });

})

app.put('/producto/:id', function(req, res) {
    let id = req.params.id;

    Producto.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })
    });
})

app.delete('/producto/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    Producto.findByIdAndRemove(id, (err, productoBorrado) => {

        // Cambiar estado del registro
        // producto.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoBorrado
        })
    });

})

module.exports = app;