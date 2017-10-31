//require express
var express = require('express');

//require mongoose
var mongoose = require('mongoose');

//require bluebird for promises
var bluebird = require('bluebird');

//require body-parser for requests
var bodyParser = require('body-parser');

//module.exports is putting app and config through our logic
module.exports = function(app, config) {
    //start our mongoose connection
    var db = mongoose.connection;
    db.once('open', function() { console.log('connected to the database'); });
    mongoose.connect(config.db);

    //start up body-parser to handle requests
    app.use(bodyParser.json());

    //put app and config through polyController to add the routes
    require('../controllers/polygon')(app, config);

    //use for our static files
    app.use(express.static(config.root));

    //handle errors
    app.use(function(req, res, next) {
        res.type('plain/text');
        res.status(404);
        res.send('404 not found');
    });

    app.use(function(req, res, next) {
        res.type('plain/text');
        res.status(500);
        res.send('500 server error');
    });

    console.log('Starting application...');
};