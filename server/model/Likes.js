const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  postId: {
    type: String
  },
  LikedBy: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Likes = mongoose.model("Likes", likeSchema);
module.exports = Likes;
