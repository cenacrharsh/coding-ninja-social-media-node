const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.toggleLike = async function (req, res) {
  try {
    //* likes/toggle/?id=abc&type=Post
    let likeable;
    let deleted = false; /* to let user know, like has been created or deleted */

    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    //* check if like already exists
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    //* if like already exists then delete it, else make a new like
    if (existingLike) {
      //* pull like form post/comment
      likeable.likes.pull(existingLike._id);
      likeable.save();

      //* delete comment object
      existingLike.remove();
      deleted = true;
    } else {
      let newLike = await Like.create({
        user: req.user.id,
        likeable: req.query.id,
        onModel: req.query.type,
      });

      //* push new like into post/comment
      likeable.likes.push(newLike._id);
      likeable.save();
    }

    return res.json(200, {
      message: "Request Successful",
      data: {
        deleted: deleted,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
