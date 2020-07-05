'use strict'

var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
const path = require('path');

var app = express();
var router = express.Router();

var env = require('dotenv').load();

/**
 * Moogo DB Connection
 */
//Local MongoDB Connection
//mongoose.connect('mongodb://192.168.1.34/kth');
mongoose.connect(process.env.LOCAL,{useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect('mongodb://kth:WlPFZhgaiMSEuFoYXGHb73GbDX04vndb1GPwhBfeKxqC1swLqcDUWgdvpoeP7JKnBgXsEgD9QnkWLwFbvCVekw%3D%3D@kth.documents.azure.com:10255/?ssl=true&replicaSet=globaldb');
// MS Azure Cosmosdb Connection
// mongoose.connect(process.env.COSMOSDB_CONSTR+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb");
// MongoDB Atlas Connection
// mongoose.connect(process.env.ATLAS_CONSTR), {useNewUrlParser: true, useUnifiedTopology: true};
var db = mongoose.connection;
//bind error info
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to DB');
});

// var mongoClient = require("mongodb").MongoClient;
// mongoClient.connect("mongodb://kth:9DhGsFCI8WBgLMquFJPjWzaE01GXPIXttQEVIUj1yVj2WEJGyqJZi5C8kKicENP65CVxGTUK3OfMQQrWoECcFg%3D%3D@kth.documents.azure.com:10255/?ssl=true", function (err, client) {
//   client.close();
// });

//var port = process.env.DEV || 8080;


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/users');
var homePageApi = require('./routes/home');
var salesBoardApi = require('./routes/salesBoard');
var returnBoardApi = require('./routes/returnBoard');
var resetPasswordApi = require('./routes/resetPassword');
var customerApi = require('./routes/customer');
var dailyCollectionApi = require('./routes/dailyCollection');
var newVoucherApi = require('./routes/newVoucher');
var returnItems = require('./routes/returnItems');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     //and remove cacheing so we get the most recent
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });


// app.use('/api', router);
app.use('/', indexRouter);
app.use('/api', customerApi);
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', homePageApi);
app.use('/api', salesBoardApi);
app.use('/api', returnBoardApi);
app.use('/api', resetPasswordApi);
app.use('/api', dailyCollectionApi);
app.use('/api', newVoucherApi);
app.use('/api', returnItems);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//starts the server and listens for requests
var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log('api now running on port', port);
});

// app.listen(9000);
