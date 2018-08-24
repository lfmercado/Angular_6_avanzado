'use strict'
//Modulos
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');
//Modelos
var User = require('../models/user.module');

//Servicios
var jwt = require('../services/jwt.service');

//Accciones
function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador de usuarios y la accion pruebas',
        user : req.user 
    });
}

function saveUser(req, res){
    //Creo el objeto del usuario
    var user = new User();
    //Recoger lo parametros de la peticion
    var params = req.body;
    //Asegurarse de que los params no vengan vacios
    if(params.password && params.name && params.surname && params.email){
    //Asignar los valores que vienen por post al objeto usuario
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role =  'ROLE_USER';
    user.image = null;
    //Controlar que el email de registro sea unico
    User.findOne({email: user.email.toLowerCase()}, (err, issetUser) =>{
        if(err){
            res.status(500).send({
                message: 'error al comprobar que el usuario existe!!!'
            });
        }else{
            if(!issetUser){
                //Encriptamos la contraseña || estos parametros son para cambiar los metodos de cifrado
            bcrypt.hash(params.password, null, null, function (err, hash){
                user.password = hash;
                //Guardo el usuario en la base de datos
                user.save((err, userStored) =>{ 
                    if(err){
                        res.status(500).send({
                            message:'Error al guardar el usuario'
                        });
                    }else{
                        if(!userStored){
                            res.status(404).send({
                                message: 'No se ha podido guardar el Usuario'
                            });
                        }else{
                            res.status(200).send({
                                user : user,
                                message:'Se ha guardado el usuario con exito!!'
                            });
                        }
                     }
                  })  
                });
            }else{
                res.status(200).send({
                    message: 'Error, el usuario no se puede registrar, el correo ya ha sido utilizado!!!'
                });
            }
        }
    })
    }else{
        res.status(200).send({
            message : 'Introduce los datos correctamente'
        });
    }
}

function login(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) =>{
        if(err){
            res.status(500).send({
                message: 'error al comprobar que el usuario existe!!!'
            });
        }else{
            if(user){
                {   
                    bcrypt.compare(password, user.password, (err, check)=> {
                        if(check){
                            //Comprobar y generar el token
                            if(params.gettoken){
                                //Deolver el token con jwt
                                res.status(200).send({
                                    tokken: jwt.createToken(user)
                                });
                            }else{
                            res.status(200).send({
                                user
                            });
                        }
                        }else{
                            res.status(200).send({
                                message : 'Contraseña Incorrecta'
                            });
                        }
                    })
                }
            }
            else{
                res.status(404).send({
                    
                    message: 'error el usuario no se puede loguear porque no existe!!!'
                });
            }
        }
    });
}
function updateUser(req, res){
    
    var userId = req.params.id;
    var update = req.body;
    delete update.password;
    if(userId != req.user.sub){
        res.status(500).send({
            message: 'No tienes permiso para modificar las credenciales'
        });
    }
        User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdate)=>{
            if(err){
                res.status(500).send({
                    message : 'Error al actualizar usuario'
                });
            }else{
                if(!userUpdate){
                    res.status(404).send({
                        message: 'No se ha podido actualizar al usuario'
                    });
                }else{
                    res.status(200).send({userUpdate});
                }
            }
        });
    }

    function uploadImage(req, res){
        var userId = req.params.id;
        var fileName = 'no subido';
        if(req.files){
            //Consigo el nombre de la imagen
            var file_path = req.files.image.path;
            //Separo el caracter que me es util -> nombre exacto
            var fileSplit = file_path.split('\\');
            //lo asignoa una variable
            var file_name = fileSplit[2];
            //asegurar que si sea una imagen
            var image_split = file_path.split('\.');
            var image_ext = image_split[1];
            if(image_ext == 'png' || image_ext == 'jpg' || image_ext == 'jpeg' || image_ext == 'git' || image_ext == 'PNG'){
                if(userId != req.user.sub){
                    res.status(500).send({
                        message: 'No tienes permiso para modificar las credenciales'
                    });
                }
                    User.findByIdAndUpdate(userId, {image : file_name}, {new:true}, (err, userUpdate)=>{
                        if(err){
                            res.status(500).send({
                                message : 'Error al actualizar usuario'
                            });
                        }else{
                            if(!userUpdate){
                                res.status(404).send({
                                    message: 'No se ha podido actualizar al usuario'
                                });
                            }else{
                                res.status(200).send({userUpdate, image: file_name});
                            }
                        }
                    });
            }else{
                fs.unlink(file_path, (err)=>{
                    if(err){
                        res.status(200).send({message: 'Extension no valida y fichero no borrado'});
                    }else{
                        res.status(200).send({message: 'Extension no valida'});
                    }
                });
            }            
        }else{
            res.status(200).send({
                message : 'No se ha subido una imagen'
            });
        }
    }

    function getImageFile(req, res){
       var image_file = req.params.imageFile;
       var path_file = './uploads/users/' + image_file;
       fs.exists(path_file, function(exists){
           if(exists){
               res.sendFile(path.resolve(path_file));
           }else{
               res.status(404).send({
                   message :'Imagen no existe'
               });
           }
       });
    }

    function getKeepers(req, res){
      User.find({role:'ROLE_ADMIN'}).exec((err, users)=>{
          if(err){
            res.status(500).send({
                message :'Error en la peticion'
            });
          }else{
          if(!users){
            res.status(404).send({
                message :'No existen Cuidadores'
            });
          }
          else{
            res.status(200).send({users});
          }
          }
      })
    }


//Exportaciones
module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser,
    uploadImage, 
    getImageFile,
    getKeepers
};

