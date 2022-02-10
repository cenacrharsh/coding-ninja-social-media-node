//# Importing Model
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
  try {
    //* verify post exists in db first, before creating the comment
    let post = await Post.findById(req.body.post);

    //> if post found, create comment
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      //> if comment created successfully, update the post in db by adding the comment to it
      post.comments.push(comment);
      post.save();

      res.redirect("/");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

//! Action to delete a comment
module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    if (comment.user == req.user.id) {
      let postId = comment.post;

      comment.remove();

      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

//> fetch the post id on which the comment was made before deleting comment, as posts store the comment id's as well so we need to delete those as well
