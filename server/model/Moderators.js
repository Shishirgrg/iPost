const mongoose = require('mongoose');

const moderatorSchema = new mongoose.Schema({
    name: {
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
    moderator: {
        type : Boolean,
    }
});


module.exports = mongoose.model('Moderators', moderatorSchema);