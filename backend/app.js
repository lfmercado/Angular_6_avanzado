'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar Rutas
var user_routes = require('./routes/user.routes');
var animal_router = require('./routes/animal.routes');

//middleswares de body parser
app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json());

//Configurar cabeceras y CORS
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requestes-With, Content-Type, Accept, Access-Allow-Request-Method'); 
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Rutas body parser

app.use('/api', user_routes);
app.use('/api', animal_router);

app.get('/probando', (req, res) =>{
   res.status(200).send({
    message: 'Probando una Ruta'
   })
});

module.exports = app;