'use strict'

var app = require('./app');
var port = process.env.PORT || 3789;
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/zoo')
    .then(() =>{
            console.log("La conexion a la base de dato se ha realizado correctamente!!!");
            app.listen(port, ()=>{
                console.log("El servidor Local Con Node Y Express Esta Corriendo Correctamente!!!");
            });
    })
    .catch(err => console.log(err));
  