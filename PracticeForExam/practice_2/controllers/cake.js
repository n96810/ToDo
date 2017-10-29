//require express so we can use it
var express = require('express');

//require mongoose so we can access the database
var mongoose = require('mongoose');

//declare the router
var router = express.Router();

//require the model
var Cake = require('../models/cake');

module.exports = function(app, config) {

    //set up the base route
    app.use('/examPractice2', router);

    //for getting cakes
    router.get('/cakes', function(req, res, next) {
        console.log('Getting all cakes...');
        
        //make the query a find all objects
        var query = Cake.find()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ "msg":"No cakes found"});
            }
        }).catch(err => { return next(err)});
    });

    //for posting cakes
    router.post('/cakes', function(req, res, next) {
        console.log('Saving cake...');

        //create a new cake to save using the request body
        var pastry = new Cake(req.body);

        console.log('body: '+ req.body);
        //save the cake
        pastry.save()
        .then(result => { res.status(201).json(result); })
        .catch(err => { return next(err); });
    });
}