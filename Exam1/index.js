//Require express so we can use it
var express = require('express');

//Require our configuration so we can use it also
var config = require('./config');

//Make the app object an express application
var app = express();

//put app and config through the express file to add the logic
require('./config/express')(app, config);

//initialize the server
require('http').createServer(app).listen(config.port, function() {
    console.log('application started on ' + config.port);
});