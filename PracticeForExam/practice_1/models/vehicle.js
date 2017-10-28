//require mongoose so we can use it
var Mongoose = require('mongoose');

//create the model for vehicle
var vehicleSchema = new Mongoose.Schema(
    {
        "model": { "type": String, "required": true },
        "color": { "type": String, default: "Silver" } 
    }
);

//do module.exports so we can require this elsewhere
module.exports = Mongoose.model("vehicle", vehicleSchema);