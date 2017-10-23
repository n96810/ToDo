var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var todoSchema = new Schema(
{
    "userId": { type: Mongoose.SchemaTypes.ObjectId, required: true },
    "todo": { type: String, required: true },
    "description": { type: String },
    "dateCreated": { type: Date, default: Date.now() },
    "dateDue": { type: Date, default: Date.now() },
    "completed": { type: Boolean, default: false },
    "file":
    {
        fileName: { type: String },
        originalName: { type: String }
    }
});

module.exports = Mongoose.model('ToDo', todoSchema);