//require express to use it
var express = require('express');

//require config
var config = require('./config');

//start the app object
var app = express();

require('./express')(app, config);

//create and start the server
require('http').createServer(app).listen(config.port, function() {
    console.log('Started on port ' + config.port);
});