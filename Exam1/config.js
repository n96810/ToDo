//require path so we can parse the root path for the configuration
var path = require('path');

//make rootpath the normalization of the directory
var rootPath = path.normalize(__dirname + '/public');

//since we only want one configuration, we can do a module.export for our object, and not need an array
module.exports = {
    "root": rootPath,
    "app": { "name": "exam1" },
    "port": 5000,
    "db": "mongodb://127.0.0.1/sn-exam1"
};