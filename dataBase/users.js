const {Schema, model} = require('mongoose');

// Make a structure of data for DB
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
    avatar: String
}, {timestamps: true});


// Use the 'aws_s3_users' collection of db
module.exports = model('aws_s3_users', UserSchema);
