const express = require('express');

const app = express();

app.use(require('./cliente'));
app.use(require('./comuna'));
app.use(require('./consulta'));
app.use(require('./direccion'));
app.use(require('./horario'));
app.use(require('./horarioEspecial'));
app.use(require('./oferta'));
app.use(require('./producto'));
app.use(require('./region'));
app.use(require('./sucursal'));
app.use(require('./usuario'));
app.use(require('./visita'));

module.exports = app;