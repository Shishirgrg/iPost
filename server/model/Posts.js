const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    like: {
        type: Boolean,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    imagePath: {
        type: String
    }
});

const Posts = mongoose.model('Posts', postSchema);
module.exports = Posts