'use strict'

var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = Schema({
    name: String,
    description: String,
    year: Number,
    image: String,
            //Esta es la forma de hacer una relacion entre bdd no relacionales
    user: { type: Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Animal', AnimalSchema);