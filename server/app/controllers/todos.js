'use strict'

var express = require('express'),
router = express.Router(),
logger = require('../../config/logger');

var mongoose = require('mongoose'),
ToDo = mongoose.model('ToDo');

module.exports = function(app, config) {
    app.use('/api', router);
    
    router.get('/todos/user/:userId', function(req, res, next) {
        logger.log('GET todo\'s for user with id: ' + req.params.userId, 'verbose');
        ToDo.find({ "userId": req.params.userId })
        .then(todos => {
            if (todos) {
                res.status(200).json(todos);
            } else {
                res.status(404).json({ "msg":"No todos found for user " + req.params.userId });
            }
        });
    });
    
    router.get('/todos/:Id', function(req, res, next) {
        logger.log('GET todo with id: ' + req.params.id, 'verbose');
        ToDo.findById(req.params.id)
        .then(todo => {
            if (todo) {
                res.status(200).json(todo);
            } else {
                res.status(404).json({ "msg":"No todo with id " + req.params.id + " found" });
            }
        })
        .catch(err => { return next(err); });
    });
    
    router.post('/todos', function(req, res, next) {
        
        logger.log('Create a todo', 'verbose');
        var toDo = new ToDo(req.body);
        toDo.save()
        .then(result => { res.status(201).json(result); })
        .catch(err => { return next(err); });
    });
    
    router.put('/todos/:todoId', function(req, res, next) {
        logger.log('Update a todo with id: ' + req.params.id, 'verbose');

        var toDo = ToDo.findOneAndUpdate({ "_id":req.params.id }, req.body, { "new":true, "multi":false })
        .then(result => { res.status(200).json(toDo); })
        .catch(err => { return next(err); });
    });
    
    router.delete('/todos/:todoId', function(req, res, next) {
        logger.log('Delete a todo with id: ' + req.params.id, 'verbose');

        ToDo.remove({ "_id":req.params.id })
        .then(result => { res.status(200).json({ "msg":"ToDo deleted" }); })
        .catch(err => { return next(err); });
    });
};