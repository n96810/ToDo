'use strict'

var express = require('express'),
router = express.Router(),
logger = require('../../config/logger');

module.exports = function(app, config) {
    app.use('/', router);
    
    router.get('/user/:id', function(req, res, next) {
        logger.log("Get user id: " + req.params.id, "verbose");
        res.status(200).json({id: req.params.id});
    });
    
    router.get('/user/:id/:name', function(req, res, next) {
        logger.log("Get user id: " + req.params.id + " name: " + req.params.name, "verbose");
        res.status(200).json({id: req.params.id, name: req.params.name});
    });

    router.post('/login', function(req, res, next) {
        console.log(req.body);

        var email = req.body.email;
        var password = req.body.password;
        var obj = {'email': email, 'password': password};
        logger.log("email: " + email + "password: " + password);
        res.status(201).json(obj);
    });
};