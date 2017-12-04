var express = require('express'),
config = require('./config/config');

var app = express();

require('./config/express')(app, config);

require('http').createServer(app).listen(config.port, function()
{
    console.log("HTTP Server listening on port: %s in %s mode", config.port, app.get('env'));
});

module.exports = app;