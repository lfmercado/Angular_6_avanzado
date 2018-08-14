'use strict'

function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador de usuarios y la accion pruebas'
    });
}

module.exports = {
    pruebas
};
