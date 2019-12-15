const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model('image', imageSchema);