'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret  = 'clave_secreta_del_curso_de_angular_avanzado';
                                        //pasar a lo siguiente, en caso el uso de la accion del controlador
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({
            message : 'La peticion no tiene la cabecera de autentificacion'
        });
    }
       var token = req.headers.authorization.replace(/['"]+/g,'') ;
       try {
           var payload = jwt.decode(token, secret);
           if(payload.ex <= moment().unix()){
            res.status(401).send({
                message :' El token ha expirado'
            });
           }
       } catch (ex) {
        res.status(404).send({
            message :'El token no es valido'
        });
       }
    req.user = payload;
    next();
}