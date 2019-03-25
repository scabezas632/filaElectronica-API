require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');

const portSocket = 3001;
var io = require('socket.io-client');
var socket = io.connect(`http://localhost:${portSocket}/`, {
    reconnection: true
});

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

// Configuracion global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true
}, (err, res) => {

    if (err) throw err;

    console.log('Base de datos online');

});

app.listen(process.env.PORT, () => console.log('server on port', process.env.PORT));

const port = new SerialPort("COM4", {
    baudRate: 9600
});

const parser = port.pipe(new ReadLine({
    delimiter: '\r\n'
}));

port.on("open", () => {
    console.log('WeMos connected');
});

socket.on('connect', function () {
    console.log('Socket connected on port ' + portSocket);
    socket.on('clientEvent', function (data) {
        console.log('message from the server:', data);
    });
});

parser.on('data', data => {
    console.log(data);
    socket.emit('sendCounter', data);
});

parser.on('error', (err) => console.log(err));
port.on('error', (err) => console.log(err));