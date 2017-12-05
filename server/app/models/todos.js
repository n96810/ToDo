var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var priorities = ["Low", "Medium", "High", "Critical"];

var todoSchema = new Schema(
{
    "userId": { type: Mongoose.SchemaTypes.ObjectId, required: true },
    "todo": { type: String, required: true },
    "description": { type: String },
    "dateCreated": { type: Date, default: Date.now() },
    "dateDue": { type: Date, default: Date.now() },
    "priority": { "type": String, "enum": priorities },
    "completed": { type: Boolean, default: false },
    "file":
    {
        "filename": { type: String },
        "originalName": { type: String },
        "dateUploaded": { type: Date, default: Date.now() }
    }
});

module.exports = Mongoose.model('ToDo', todoSchema);