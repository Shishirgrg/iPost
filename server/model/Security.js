const mongoose = require('mongoose');

const securitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
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
    }


});


module.exports = mongoose.model('Security', securitySchema);