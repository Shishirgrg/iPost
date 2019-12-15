const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    postId: {
        type: String,

    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
            // [
            //     "1": "Liked",
            //     "2": "Commented",
            //     "3": "Followed",
            //     "4": "Unfollowed"
            // ]
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;