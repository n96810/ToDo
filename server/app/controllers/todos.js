'use strict'

var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),
multer = require('multer'),
mkdirp = require('mkdirp');

var mongoose = require('mongoose'),
ToDo = mongoose.model('ToDo');

module.exports = function(app, config) {
    
    var storage = multer.diskStorage({
        "destination": function(req, file, cb) {
            var path = config.uploads + req.params.userId + "/" + req.params.todoId;
            mkdirp(path, function(err) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        "filename": function(req, file, cb) {
            let fileName = file.originalname.split(".");
            cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
        }
    });
    
    var upload = multer({ "storage": storage });

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
    
    router.get('/todos/:todoId', function(req, res, next) {
        logger.log('GET todo with id: ' + req.params.todoId, 'verbose');
        ToDo.findById(req.params.todoId)
        .then(todo => {
            if (todo) {
                res.status(200).json(todo);
            } else {
                res.status(404).json({ "msg":"No todo with id " + req.params.todoId + " found" });
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

    router.post("/todos/uploads/:userId/:todoId", upload.any(), function(req, res, next) {
        logger.log("Upload file for todo " + req.params.todoId + " and " + req.params.userId, "verbose");

        ToDo.findById(req.params.todoId, function(err, todo) {
            if (err) {
                return next(err);
            } else {
                if (req.files) {
                    todo.file = {
                        "filename": req.files[0].filename,
                        "originalName": req.files[0].originalname,
                        "dateUploaded": new Date()
                    };

                    todo.save()
                    .then(todo => {
                        res.status(200).json(todo);
                    })
                    .catch(error => {
                        return next(error);
                    });
                }
            }
        });
    });
    
    router.put('/todos/:todoId', function(req, res, next) {
        logger.log('Update a todo with id: ' + req.params.todoId, 'verbose');
        
        ToDo.findOneAndUpdate({ "_id":req.params.todoId }, req.body, { "new":true, "multi":false })
        .then(toDo => { res.status(200).json(toDo); })
        .catch(err => { return next(err); });
    });
    
    router.delete('/todos/:todoId', function(req, res, next) {
        logger.log('Delete a todo with id: ' + req.params.todoId, 'verbose');

        ToDo.remove({ "_id":req.params.todoId })
        .then(result => { res.status(200).json({ "msg":"ToDo deleted" }); })
        .catch(err => { return next(err); });
    });
};