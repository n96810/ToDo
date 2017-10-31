//create the router object
var router = require('express').Router();

//require mongoose for database funcitonality
var mongoose = require('mongoose');

//require our model so we can create objects
var Polygon = require('../models/polygon');

//module.exports is the routes
module.exports = function(app, config) {
    //set up our base routes
    app.use('/exam1', router);
    
    //get all the polygons
    router.get('/shapes', function(req, res, next) {
        //set up the query
        var query = Polygon.find()
        .then(result => {
            //if we find something, send 200. If not, send 404. If there is an issue, hand the error to the next middleware
            if (result) {
                res.status(200).json({ result });
            } else {
                res.status(404).json({ "msg":"No polygons found." });
            }
        }).catch(err => { return next(err); });
    });

    router.post('/shapes', function(req, res, next) {
        //get our polygon model and save it as a shape
        var shape = new Polygon(req.body);
        
        //save the object
        shape.save()
        .then(result => {
            //check if the post worked
            if (result) {
                res.status(201).json(result);
            } else {
                res.status(500).json( { "msg":"Could not post polygon" });
            }
        }).catch(err => { return next(err); }); //hanlde any errors
    });
};