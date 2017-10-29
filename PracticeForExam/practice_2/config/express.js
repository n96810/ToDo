//require the modules we are using
var
express = require('express'),
mongoose = require('mongoose'),
bluebird = require('bluebird'),
bodyParser = require('body-parser'),
glob = require('glob'); // <-- Needed for just one model/controller?

module.exports = function(app, config) {
    //connect to mongoose
    var db = mongoose.connection;

    db.once('open', function() { console.log('connection has been opened')});

    mongoose.connect(config.db);
    
    //use bodyparser
    app.use(bodyParser.json());

    require('../controllers/cake')(app, config);

    //use public folder
    app.use(express.static(config.root + '/public'));
    
    //handle errors
    app.use(function(req, res) {
        res.type('text/plain');
        res.status(404);
        res.send('404 not found');
    });
        
    //handle errors
    app.use(function(req, res, next) {
        res.type('text/plain');
        res.status(500);
        res.send('500 server error');
    });

    console.log('starting application...');
};