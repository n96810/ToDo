var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(app, config)
{
    if (process.env.NODE_ENV !== 'test')
    {
        app.use(require('morgan')('dev'));
        app.use(function(req, res, next)
        {
            log('Request from ' + req.connection.remoteAddress);
            next();
        });
    }
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({"extended": true}));

    require('../app/controllers/users')(app, config);
    
    var users =
    [
        {name: 'John', email:'woo@hoo.com'},
        {name: 'Betty', email:'loo@hoo.com'},
        {name: 'Hal', email:'boo@hoo.com'}
    ];

    app.get('api/users', function(req, res){
        res.status(200).json(users);
    });
    
    app.use(express.static(config.root + '/public'));
    
    app.use(function(req, res)
    {
        res.type('text/plan');
        res.status(404);
        res.send('404 not found');
    });
    
    app.use(function(err, req, res, next)
    {
        log(err.stack);
        res.type('text/plan');
        res.status(500);
        res.send('500 server error');
    });
    
    log('Starting application');
};