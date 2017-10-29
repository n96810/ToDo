//initialize app and config so we can use them
var express = require('express');
var app = express();

var config = require('./config/config');

//put app and config through our express file before we do createServer on it
require('./config/express')(app, config);

//initialize the applicationb
require('http').createServer(app).listen(config.port, function() {
    console.log('HTTP server is listening on port %s', config.port);
});