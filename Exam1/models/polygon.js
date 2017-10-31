//require mongoose to use it
var Mongoose = require('mongoose');

//create our schema Polygon with two properties:name and sides
var polygonSchema = new Mongoose.Schema({
    "name": { "type":String, "required":true },
    "sides": { "type":Number, "default":4}
});

//the module.exports is the model() function of our polygonSchema
module.exports = Mongoose.model('Polygon', polygonSchema);