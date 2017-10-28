//require path so we can use it
var path = require('path');

//gets our root path
var rootPath = path.normalize(__dirname + '/..');

//since we only want exactly one environment, we can skip all the other configurations and just export one object with all our properties
module.exports = {
    "root": rootPath,
    "app": { "name":"practice_1" },
    "port": 4000,
    "db": "mongodb://127.0.0.1/exam-practice1"
};