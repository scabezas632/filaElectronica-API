const express = require('express');
const Comuna = require('../models/comuna');

const app = express();

app.get('/comuna', function(req, res) {

    // Si se busca por alguna region en especifica
    // de lo contrario se buscan todas las comunas
    let query = {};
    if (req.query.region) {
        query = {
            region: req.query.region
        };
    }

    Comuna.find(query)
        .exec((err, comunas) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Comuna.count(query, (err, conteo) => {
                res.json({
                    ok: true,
                    comunas,
                    length: conteo
                })
            });

        })

})

app.post('/comuna', function(req, res) {
    let body = req.body;

    let comuna = new Comuna({
        nombre: body.nombre,
        region: body.region
    });

    comuna.save((err, comunaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            comuna: comunaDB
        })

    });

})

app.put('/comuna/:id', function(req, res) {
    let id = req.params.id;

    Comuna.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, comunaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            comuna: comunaDB
        })
    });
})

app.delete('/comuna/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    comuna.findByIdAndRemove(id, (err, comunaBorrado) => {

        // Cambiar estado del registro
        // Comuna.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, comunaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            comuna: comunaDB
        })
    });

})

module.exports = app;