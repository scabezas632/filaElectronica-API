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

            let defaultData = {
                actualCaja: 0,
                actualClientes: 0,
            }

            if (turnos.length === 0) {
                Turno.create({
                    actualCaja: 0,
                    actualClientes: 0,
                });
            }

            return res.json({
                ok: true,
                turnos: turnos[0] ? turnos[0] : defaultData,
                length: turnos.length
            })
        })

})

app.post('/turno', function (req, res) {
    let body = req.body;

    let turno = new Turno({
        actualCaja: body.actualCaja,
        actualClientes: body.actualClientes,
    });

    turno.save((err, turnoDB) => {

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

app.put('/turno', function (req, res) {
    let id = req.params.id;

    Turno.find()
        .exec(function (err, docs) {
            const ids = docs.map(doc => doc._id);

            Turno.update({
                "_id": {
                    "$in": ids
                }
            }, req.body, {
                "multi": true
            }, (err, turnoDB) => {
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
        });
})

// app.delete('/turno/:id', function (req, res) {

//     let id = req.params.id;

//     // Eliminar registro
//     Turno.findByIdAndRemove(id, (err, turnoBorrado) => {

//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }

//         res.json({
//             ok: true,
//             turno: turnoBorrado
//         })
//     });

// })

module.exports = app;