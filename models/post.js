const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    //> post belongs to a user
    user: {
      type: mongoose.Schema.Types.ObjectId /* ObjectId always unique */,
      ref: "User" /* refer to user schema */,
    },

    //> include the array of id's of all comments & likes in this post schema itself for faster access, as everytime a post is loaded we will need all the comments
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//> make it a model in the database
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
