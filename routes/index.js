
var express = require('express');
const routes = express.Router();

const user = require('./users');
const auth =  require('./auth');
const salesBoard = require('./salesBoard');
const returnBoard = require('./returnBoard');
const resetPassword = require('./resetPassword');

routes.get('/', function (req, res) {
    res.send({ message: 'API Initialized!' });
    console.log('Api initialized');
});


module.exports = routes;