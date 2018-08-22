'use strict'

var express = require('express');
var animalController = require('../controllers/animal.controller');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var md_admin = require('../middlewares/isAdmin');

var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir : './uploads/animals'});

api.get('/pruebas-animales', md_auth.ensureAuth, animalController.pruebas);
api.post('/save-animal', [md_auth.ensureAuth, md_admin.isAdmin], animalController.saveAnimal);
api.get('/animals', animalController.getAnimals);
api.get('/animal/:id', animalController.getAnimal);
api.put('/update-animal/:id', [md_auth.ensureAuth,md_admin.isAdmin], animalController.updateAnimal);
api.post('/upload-image-animal/:id', [md_upload, md_auth.ensureAuth, md_admin.isAdmin], animalController.uploadImage);
api.get('/get-image-animal/:imageFile', animalController.getImageFile);
api.delete('/animal/:id', [md_auth.ensureAuth, md_admin.isAdmin], animalController.deleteAnimal);
module.exports = api;