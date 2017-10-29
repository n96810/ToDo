var path = require('path');

var rootPath = path.normalize(__dirname + '/..');

//export the config so it can be used
module.exports = {
    "root":rootPath,
    "app": { "name":"practice_2" },
    "port": 5000,
    "db": "mongodb://127.0.0.1/exam-practice2"
};