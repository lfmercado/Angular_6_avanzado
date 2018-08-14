'use strict'

var express = require('express');
var userController = require('../controllers/user.controller');

var api = express.Router();

api.get('/pruebas-del-controllador', userController.pruebas);

module.exports = api;