//require path to parse the base directory
var path = require('path');

//get the base directory
var rootPath = path.normalize(__dirname + '/');

//export the configuration object
module.exports = {
    "root":rootPath,
    "port":5000,
    "app": { "name":"practice3"},
    "db": "mongodb://127.0.0.1/exam-practice3"
};