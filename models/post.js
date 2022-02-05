const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId /* ObjectId always unique */,
      ref: "User" /* refer to user schema */,
    },
  },
  {
    timestamps: true,
  }
);

//> make it a model in the database
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
