const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
      type: Number,
      default: 0,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

module.exports = mongoose.model('PostMessage', postSchema)