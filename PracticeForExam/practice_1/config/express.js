//require express to do express things
var express = require('express');

//require mongoose to connect to the database
var mongoose = require('mongoose');

//require bluebird to use promises
var bluebird = require('bluebird');

//require body-parser to... parse bodies
var bodyParser = require('body-parser');

//require glob to initialize our models and controllers easier
var glob = require('glob');

//set module.exports as this function, so anything that require()'s it can apply this logic to app and config
module.exports = function(app, config)
{
    console.log('root path is: ' + config.root);
    //set mongoose debug to true so we can see what's going on just in case
    mongoose.set("debug", true);
    
    //store our mongoose connection as db so we can access it easier
    var db = mongoose.connection;
    
    //once the connection is open, let us know
    db.once('open', function() {
        console.log('mongoose connected to the database');
    });

    //start the connection to the database
    mongoose.connect(config.db);

    //get all of our models using glob and store them in 'models' so they are more accessible
    var models = glob.sync(config.root + '/models/*.js');
    //require each of the models we recover from this directory
    models.forEach(m => { require(m); });
    
    //get all of our controllers using glob and store them in 'models' so they are more accessible
    var controllers = glob.sync(config.root + '/controller/*.js');
    //require each of the controllers we recover from the directory
    controllers.forEach(c => { require(c); });

    //use our middleware logic here
    app.use(bodyParser.json());

    //require this so our site gets routing
    require('../controllers/vehicle')(app, config);

    app.get('/examPractice/vehicles', function(req, res) {
        console.log('app.get working');
        res.status(200).json(vehicles);
    });

    //initializes the public folder
    app.use(express.static(config.root + '/public'));

    //handle errors
    app.use(function(req, res) {
        res.type('text/plain');
        res.status(404);
        res.send('404 not found');
    });

    app.use(function(req, res, next) {
        res.type('text/plain');
        res.status(500);
        res.send('500 server error');
    });

    console.log('starting application...');
}