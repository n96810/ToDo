//declare the router
var router = require('express').Router();

//require mongoose so we can use it
var mongoose = require('mongoose');

//import our doggo model
var doggo = require('../models/doggo');

//export our routes
module.exports = function(app, config) {

    //set up the base for our routes
    app.use('/examPractice3', router);

    //GET for all doggos
    router.get('/doggos', function(req, res, next) {
        console.log('Getting doggos...');

        var query = doggo.find()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ "msg":"No doggos found" });
            }
        }).catch(err => {return next(err); });
    });

    //POST a doggo
    router.post('/doggos', function(req, res, next) {
        console.log('Posting doggo...');

        var dog = new doggo(req.body);

        dog.save()
        .then(result => {
            res.status(201).json(result);
        }).catch(err => { return next(err); });
    });
}