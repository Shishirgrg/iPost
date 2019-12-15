const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    sender: {
        type: String
    },
    receiver: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean
    }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;