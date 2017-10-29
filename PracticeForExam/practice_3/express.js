//require various modules so we can use them
var
express = require('express'),
mongoose = require('mongoose'),
bluebird = require('bluebird'),
bodyParser = require('body-parser');

//module exports so other files can see this
module.exports = function(app, config) {

    //start our mongoose connection
    db = mongoose.connection;
    mongoose.connect(config.db);
    db.once('open', function() { console.log('mongoose connected')});

    //middleware goes here
    app.use(bodyParser.json());

    //put app and config through the controller to add routes
    require('./controllers/doggo')(app, config);

    //set up our public folder
    app.use(express.static(config.root + '/public'));

    //handle errors
    app.use(function(req, res, next) {
        res.type('text/plain');
        res.status(404);
        res.send('404 not found');
    });

    app.use(function(req, res, next) {
        res.type('text/plain');
        res.status(500);
        res.send('500 server error');
    });

    console.log('starting application right now...');
}