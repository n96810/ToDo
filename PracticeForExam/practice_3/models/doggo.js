//require mongoose so we can use it
var Mongoose = require('mongoose');

//make the doggo schema
var doggoSchema = new Mongoose.Schema({
    "name": { "type":String, "required":true },
    "size": { "type":String, "default":"Big ol' doggo" }
});

//export the Mongoose.model of our schema so we can use it elsewhere
module.exports = Mongoose.model('doggo', doggoSchema);