//require express so we can use it
var express = require('express');

//set app as express
var app = express();

//require config so we can use it
var config = require('./config/config');

//run app and config through the express file to prepare it for createServer()
require('./config/express')(app, config);

//initialize the application
require('http').createServer(app).listen(config.port, function()
{
    console.log("HTTP server listening on port: %s", config.port);
});