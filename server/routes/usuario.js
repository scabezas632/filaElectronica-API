const express = require('express');
const Usuario = require('../models/usuario');

const _ = require('underscore');

const app = express();

app.get('/usuario', function(req, res) {

    // Parametros para paginar los resultados
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    let query = { estado: true };
    if (req.query.idFacebook) {
        query = {
            $and: [{
                idFacebook: req.query.idFacebook
            }, {
                estado: true
            }, {
                rut: { $ne: null }
            }]
        };
    }
    Usuario.find(query)
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Usuario.count(query, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    length: conteo
                })
            });

        })

})

app.get('/usuario/:idFacebook', function(req, res) {

    let query = { idFacebook: req.params.idFacebook };

    Usuario.findOne(query)
        .exec((err, usuario) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Usuario.count(query, (err, conteo) => {
                res.json({
                    ok: true,
                    usuario,
                    length: conteo
                })
            });

        })

})

app.post('/usuario', function(req, res) {
    let body = req.body;


    let usuario = new Usuario({
        nombre: body.nombre,
        rut: body.rut,
        email: body.email,
        ultimaVisita: body.ultimaVisita,
        idFacebook: body.idFacebook,
        estado: body.estado
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });

})

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    // Campos que pueden ser modificados en el put
    let body = _.pick(req.body, ['nombre', 'rut', 'email', 'feNaci']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
})

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }

    // Eliminar registro
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    // Cambiar estado del registro
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

})

module.exports = app;