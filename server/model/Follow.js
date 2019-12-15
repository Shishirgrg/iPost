const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    userPhoto: {
        type: String
    },
    followedBy: {
        type: String,
        required: false
    },
    followedById: {
        type: String,
        required: false
    },
    followedByPhoto: {
        type: String
    },
    friend: {
        type: Boolean,
        required: false
    }
});

const Follow = mongoose.model('Follow', followSchema);
module.exports = Follow