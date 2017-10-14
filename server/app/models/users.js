var mongoose = require('mongoose');

var userSchema = new mongoose.Schema('UserSchema',
{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    status: { type: Boolean, default: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    dateRegistered: { type: Date, default: Date.now() }
});