//require express (we may not need it for anything besides routing, but the require and Router() are different just in case)
var express = require('express');

//require mongoose so we can do database operations
var mongoose = require('mongoose');

//create the router variable
var router = express.Router();

//get our vehicle model so we can use it
var Vehicle = require('../models/vehicle');

//assign module.exports to the routing function so we can require it elsewhere
module.exports = function(app, config) {
    
    //establish the base route here
    app.use('/examPractice', router);

    //create a route for GET so we can get all the vehicles
    router.get('/vehicles', function(req, res, next) {
        console.log('Getting all vehicles...');

        var query = Vehicle.find()
        .then(result => {
            if (Vehicle) {
                res.status(200).json(result);
            } else {
                res.status(500).json({ "msg":"No vehicles found."});
            }
        });
    });

    //create a route for POST so we can save a vehicle
    router.post('/vehicles', function(req, res, next) {
        console.log('Saving vehicle...');

        var car = new Vehicle(req.body);

        car.save()
        .then(result => { res.status(201).json(result) })
        .catch(err => { return next(err); });
    })
}