var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema('TodoSchema',
{
    userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
    todo: { type: String, required: true },
    description: { type: String },
    dateCreated: { type: Date, default: Date.now() },
    dateDue: { type: Date, default: Date.now() },
    completed: { type: Boolean, default: false },
    file:
    {
        fileName: { type: String },
        originalName: { type: String}
    }
});