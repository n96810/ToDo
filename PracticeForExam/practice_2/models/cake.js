//require mongoose so we can use modeling
var Mongoose = require('mongoose');

//declare cakeSchema for our model
var cakeSchema = new Mongoose.Schema({
    "flavor": { "type":String, "required":true },
    "layers": { "type":Number, "default":7 }
});

//export the modeled cakeSchema as 'Cake' so we can require it elsewhere
module.exports = Mongoose.model('Cake', cakeSchema);