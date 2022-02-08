//# Importing Model
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = function (req, res) {
  //* verify post exists in db first, before creating the comment
  Post.findById(req.body.post, function (err, post) {
    if (err) {
      console.log("Error in finding post on which comment is made");
      return;
    }

    //> if post found, create comment
    if (post) {
      Comment.create(
        {
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        },
        function (err, comment) {
          if (err) {
            console.log("Error in creating comment");
            return;
          }

          //> if comment created successfully, update the post in db by adding the comment to it
          post.comments.push(comment);
          post.save();

          res.redirect("/");
        }
      );
    }
  });
};

//! Action to delete a comment
module.exports.destroy = function (req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if (comment.user == req.user.id) {
      let postId = comment.post;

      comment.remove();

      Post.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        function (err, post) {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  });
};

//> fetch the post id on which the comment was made before deleting comment, as posts store the comment id's as well so we need to delete those as well
