const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    email: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    password: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    moderator: {
        type: Boolean,
    },
    fullName: {
        type: String,

    },
    address: {
        type: String,

    },
    contact: {
        type: String,

    },
    bio: {
        type: String,

    },
    ques1: {
        type: String,
        required: true
    },
    ans1: {
        type: String,
        required: true
    },
    ques2: {
        type: String,
        required: true
    },
    ans2: {
        type: String,
        required: true
    },
    imagePath: {
        type: String
    }

});


module.exports = mongoose.model('Users', userSchema);