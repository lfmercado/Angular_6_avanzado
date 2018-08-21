'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret  = 'clave_secreta_del_curso_de_angular_avanzado';
exports.createToken = function(user){

    //el payload es un objeto con el cual trabaja jwt para generar un cifrado y el token
    var payload = {
        sub: user._id,
        name: user.name,
        surname : user.surname,
        email: user.email, 
        role: user.role,
        image: user.image,
        //fecha de creacion del token
        iat : moment().unix(),
        //fecha de expiacion
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret)
};