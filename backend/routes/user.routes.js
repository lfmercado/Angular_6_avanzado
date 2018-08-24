'use strict'

var express = require('express');
var userController = require('../controllers/user.controller');

var md_auth = require('../middlewares/authenticated');
var api = express.Router();

var md_admin = require('../middlewares/isAdmin');
var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir : './uploads/users'})

api.get('/pruebas-del-controllador', md_auth.ensureAuth, userController.pruebas);
api.post('/register', userController.saveUser);
api.post('/login', userController.login);
api.put('/update-user/:id',md_auth.ensureAuth,  userController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], userController.uploadImage);
api.get('/get-image-file/:imageFile', userController.getImageFile);
api.get('/keepers', userController.getKeepers);
module.exports = api;