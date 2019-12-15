const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    postId: {
        type: String
    },
    name: {
        type: String
    },
    comment: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    imagePath: {
        type: String
    }
});

const Comments = mongoose.model('Comments', commentSchema);
module.exports = Comments