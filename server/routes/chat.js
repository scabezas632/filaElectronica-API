// Requires
const express = require('express');
const moment = require('moment');

// Inicializar variables
const app = express();
const Chat = require('../models/chat');
const Mensaje = require('../models/mensaje');

// ===========================================
// Obtener todos los chats
// ===========================================
// app.get('/chat', (req, res, next) =>{

//   Chat.find({ participantes: req.usuario._id })
//     .select('_id')
//     .exec(function(err, chats) {

//       if (err) {
//         res.send({ error: err });
//         return next(err);
//       }

//       if(chats.length===0) {
//         return res.status(200).json({
//           message: 'No hay conversaciones registradas'
//         });
//       }else{
//         // Set up empty array to hold chats + most recent message
//         let fullChats = [];
//         chats.forEach(function(chat) {
//           Mensaje.find({ 'chatId': chat._id })
//           .sort('-createdAt')
//           .select('mensaje visto createdAt')
//           .limit(1)
//           .populate({
//             path: 'autor',
//             select: 'nombre apellido'
//           })
//           .populate({
//             path: 'chatId',
//             populate: {
//               path: 'participantes',
//               select: 'nombre apellido img'
//             }
//           })
//           .exec(function(err, mensaje) {
//             if (err) {
//               res.send({ error: err });
//               return next(err);
//             }

//             fullChats.push(mensaje);

//             if(fullChats.length === chats.length) {
//               return res.status(200).json({
//                 ok:true,
//                 chats: fullChats
//               });
//             }
//           });
//         });
//       }

//   });

// });

// ===========================================
// Obtener chatID mediante las id de los participantes
// ===========================================
app.get('/chat/:idFacebook', (req, res, next) =>{

  var idFacebook = req.params.idFacebook;

  Chat.findOne({ idFacebook })
    .sort('createdAt')
    .exec(function(err, chats) {

      if (err) {
        res.send({ error: err });
        return next(err);
      }

      console.log(`${moment().format('HH:mm:ss')}: Petición del chat ${idFacebook}`);

      Chat.count({ idFacebook }, (err, conteo) => {
        res.status(200).json({
            ok:true,
            chat: chats,
            length: conteo
        })
    });

  });

});

// ===========================================
// Obtener último mensaje del chatID mediante las id de los participantes
// ===========================================
app.get('/chat/last/:idFacebook', (req, res, next) =>{

  var idFacebook = req.params.idFacebook;

  Chat.findOne({ idFacebook })
    .sort('createdAt')
    .limit(1)
    .exec(function(err, chats) {

      if (err) {
        res.send({ error: err });
        return next(err);
      }

      // Chat.count({ idFacebook }, (err, conteo) => {
      //   res.status(200).json({
      //       ok:true,
      //       chat: chats,
      //       length: conteo
      //   })
      // });

        Mensaje.find({ 'idFacebook': idFacebook })
        .sort('-createdAt')
        .limit(1)
        .exec(function(err, mensaje) {
          if (err) {
            res.send({ error: err });
            return next(err);
          }

          console.log(`${moment().format('HH:mm:ss')}: Petición del último mensaje en el chat ${idFacebook}`);

          return res.status(200).json({
            ok:true,
            chats: mensaje
          });
        });

  });

});

// ===========================================
// Actualizar chat
// ===========================================
app.put('/chat/:id', (req, res)=>{

  var idChat = req.params.id;
  var idUsuario = req.usuario._id;

  Chat.find({ $and : [
        { '_id': idChat }, { 'autor': idUsuario }
    ]}, function(err, mensaje) {

    if(err){
      res.send({ error: err});
      return next(err);
    }

    if( !chat ){
      return res.status(400).json({
        ok: false,
        chat: 'El chat con el id '+ id +' no existe.',
        errors: { message: 'No existe un chat con ese ID' }
      });
    }

    mensaje.mensaje = req.body.mensaje;

    mensaje.save(function (err, mensajeGuardado) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({
        ok:true,
        chat: chatGuardado
      });
      return next();
    });

  });

});


// ===========================================
// Crear una nueva conversacion
// ===========================================
app.post('/chat', (req, res, next)=>{

  if(!req.body.idFacebook) {
    res.status(422).send({ error: 'Por favor selecciona un idFacebook valido para enviar tu mensaje.' });
    return next();
  }

  if(!req.body.mensaje) {
    res.status(422).send({ error: 'Por favor, ingrese un mensaje.' });
    return next();
  }

  const chat = new Chat({
    idFacebook: req.body.idFacebook
  });

  chat.save(function(err, nuevoChat) {
    if (err) {
      res.send({ error: err });
      return next(err);
    }

    const mensaje = new Mensaje({
      idFacebook: req.body.idFacebook,
      emisor: req.body.emisor,
      intent: req.body.intent,
      state: req.body.state,
      mensaje: req.body.mensaje,
      paramsProxMensaje: req.body.paramsProxMensaje
    });

    mensaje.save(function(err, nuevoMensaje) {
        if (err) {
            res.status(400).json({
                ok: false,
                chat: 'Error al crear chat',
                errors: err
            });
            return next(err);
        }

        console.log(`${moment().format('HH:mm:ss')}: Se creó un nuevo chat para ${req.body.idFacebook}`);

        res.status(200).json({
            ok: true,
            message: 'Chat creado!',
            chat: chat
        });
        return next();
    });
  });

});


// ===========================================
// Enviar un Mensaje
// ===========================================
app.post('/chat/send', (req, res, next)=>{

  const mensaje = new Mensaje({
      idFacebook: req.body.idFacebook,
      emisor: req.body.emisor,
      intent: req.body.intent,
      state: req.body.state,
      mensaje: req.body.mensaje,
      paramsProxMensaje: req.body.paramsProxMensaje
  });

  mensaje.save(function(err, enviarMensaje) {
    if (err) {
      res.status(500).json({
        error: err,
        message: 'Error al enviar mensaje',
        mensaje: enviarMensaje
      });
      return next(err);
    }

    let receptor = req.body.emisor === 'FilaElectronica' ? req.body.idFacebook : 'FilaElectronica';

    console.log(`${moment().format('HH:mm:ss')}: ${req.body.emisor} envió un mensaje a ${receptor}
          Mensaje: ${req.body.mensaje}`);

    res.status(200).json({
      message: 'Mensaje enviado correctamente!',
      mensaje: enviarMensaje
    });

    return(next);
  });
});


// ===========================================
// Borrar un chat por el id
// ===========================================
app.delete('/chat/:id', (req, res, next)=>{

  var idConversacion = req.params.id;
  var idUsuario = req.usuario._id;

  Chat.findByIdAndRemove({ $and : [
            { '_id': idConversacion }, { 'participantes': idUsuario }
  ]}, ( err, colaboradorBorrado )=>{

    if(err){
      res.status(500).json({
        ok: false,
        chat: 'Error al borrar chat',
        errors: err
      });
      return next(err);
    }

    if(!chatBorrado){
      return res.status(400).json({
        ok: false,
        chat: 'No existe un chat con ese id.',
        errors: { message: 'No existe un chat con ese id.' }
      });
      return next(err);
    }

    res.status(200).json({
      ok:true,
      chat: chatBorrado
    });

    return next(err);

  });

});

module.exports = app;
