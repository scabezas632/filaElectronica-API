const express = require('express');
const Turno = require('../models/turno');

const app = express();

app.get('/turno', function (req, res) {

    Turno.find()
        .exec((err, turnos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                turnos: turnos[0] ? turnos[0] : turnos,
                length: turnos.length
            })

        })

})

app.post('/turno', function (req, res) {
    let body = req.body;

    let sucursal = new Turno({
        actualCaja: body.actualCaja,
        actualClientes: body.actualClientes,
    });

    sucursal.save((err, turnoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            turno: turnoDB
        })

    });

})

app.put('/turno/:id', function (req, res) {
    let id = req.params.id;

    Turno.findByIdAndUpdate(id, req.body, (err, turnoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            turno: turnoDB
        })
    });
})

app.delete('/turno/:id', function (req, res) {

    let id = req.params.id;

    // Eliminar registro
    Turno.findByIdAndRemove(id, (err, turnoBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            turno: turnoBorrado
        })
    });

})

module.exports = app;