const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  likedBy: [String], 
});

const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;
