'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar Rutas
var user_routes = require('./routes/user.routes');


//middleswares de body parser
app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json());

//Configurar cabeceras y CORS


//Rutas body parser

app.use('/api', user_routes);

app.get('/probando', (req, res) =>{
   res.status(200).send({
    message: 'Probando una Ruta'
   })
});

module.exports = app;