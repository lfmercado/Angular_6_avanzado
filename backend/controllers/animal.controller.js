'use strict'
//Modulos
var fs = require('fs');
var path = require('path');
//Modelos
var User = require('../models/user.module');
var Animal = require('../models/animal.module')

//Servicios
var jwt = require('../services/jwt.service');

//Accciones
function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador de animales y la accion pruebas',
        user : req.user 
    });
}

function saveAnimal(req, res){
   var animal = new Animal();
   var params = req.body;

   if(params.name){
    animal.name = params.name;
    animal.description = params.description;
    animal.year = params.year;
    animal.image = null;
    //De esta manera se toma el id de la persona que se encuetra logueada en el sistema
    animal.user = req.user.sub;

    animal.save((err, animalStored) =>{
        if(err){ 
            res.status(500).send({
                message: 'Error en el servidor'
            });
        }else{
            if(!animalStored){
                res.status(404).send({message:'No se ha guardado el animal'});
            }else{
                res.status(200).send({animal: animalStored});
            }
        }
    })
   }else{
       res.status(200).send({message:'Debes asignar un nombre al animal, es obligatorio!!'});
   }
}

function getAnimals(req, res){
                    //el metodo populate es para traer la relacion, se le pasa el parametro que se haya asignado en el modelo
    Animal.find({}).populate({path : 'user'}).exec((err, animals) =>{
        if(err){
            res.status(500).send({
                message: 'Error en el servidor'
            });
        }else{
            if(!animals){
                res.status(404).send({
                    message: 'No se han encontrado animales'
                });
            }else{
                res.status(200).send({
                   animals : animals
                });
            }
        }
    });
}

function getAnimal(req, res){
    var animalId = req.params.id;

    Animal.findById(animalId).populate({path : 'user'}).exec((err, animal)=>{
        if(err){
            res.status(500).send({
                message: 'Error en la consulta del animal'
            });
        }else{
            if(!animal){
                res.status(404).send({
                    message: 'Error, no se ha podido encontrar el animal'
                });
            }else{
                res.status(200).send({
                  animal : animal
                });
            }
        }
    });
}

function updateAnimal(req, res){
    var animalId = req.params.id;
    var update = req.body;
    
    Animal.findByIdAndUpdate(animalId, update, {new : true}, (err, animalUpdate)=>{
        if(err){
            res.status(500).send({
                message: 'Error en la actualizacion del animal'
            });
        }else{
            if(!animalUpdate){
                res.status(404).send({
                    message: 'Error, No se ha podido actualizar el animal'
                });
            }else{
                res.status(200).send({
                    animalUpdate
                });
            }
        }
    });

}

function uploadImage(req, res){
    var animalId = req.params.id;
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
        if(image_ext == 'png' || image_ext == 'jpg' || image_ext == 'jpeg' || image_ext == 'git'){

            /* Aqui se restrigira mas adelante....
            if(animalId != req.animal.sub){
                res.status(500).send({
                    message: 'No tienes permiso para modificar las credenciales'
                });
            }*/
                Animal.findByIdAndUpdate(animalId, {image : file_name}, {new:true}, (err, animalUpdate)=>{
                    if(err){
                        res.status(500).send({
                            message : 'Error al actualizar al Animal'
                        });
                    }else{
                        if(!animalUpdate){
                            res.status(404).send({
                                message: 'No se ha podido actualizar al Animal Linea 143',
                            });
                        }else{
                            res.status(200).send({animalUpdate, image: file_name});
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
   var path_file = './uploads/animals/' + image_file;
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

function deleteAnimal(req, res){
    var animalId = req.params.id;

    Animal.findByIdAndRemove(animalId, (err, animalRemoved) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion de borrar el animal'});
        }else{
            if(!animalRemoved){
                res.status(404).send({message:'No se ha podido borrar el animal'});
            }else{
                res.status(200).send({
                    message :'El animal se ha borrado correctamente',
                    animal : animalRemoved
            })
            }
        }
    });
}

module.exports={
    pruebas,
    saveAnimal,
    getAnimals,
    getAnimal,
    updateAnimal,
    getImageFile,
    uploadImage, 
    deleteAnimal
}
