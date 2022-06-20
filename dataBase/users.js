const {Schema, model} = require('mongoose');

// Make a structure of data for db
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },

    age: {
        type: Number,
        required: true,
    },

    password: {
        type: String,
        required: true
    }
}, {timestamps: true});


// Use the 'users' collection of db
module.exports = model('users', UserSchema);
