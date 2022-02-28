//# Importing Model
const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

//# Importing Mailer
const commentsMailer = require("../mailers/comments_mailer");

//# Importing Comment Email Worker and Queue
const commentEmailWorker = require("../workers/comment_email_worker");
const queue = require("../config/kue");

//! Action to create a comment
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

      //> populating comments.user everytime, email required for mailer
      comment = await comment.populate([
        { path: "user", select: "name email" },
      ]);

      // console.log("comment: ", comment);

      // console.log("Just populated comments user", comment);

      // calling the mailer everytime a new comment is made
      // commentsMailer.newComment(comment);

      //> pushing into queue the job of sending emails
      let job = queue.create("emails", comment).save(function (err) {
        if (err) {
          console.log("error in adding job to queue");
          return;
        }

        // console.log("job enqueued", job.id);
      });

      //> check if it's an xhr request
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Comment Published via xhr!",
        });
      }

      req.flash("success", "Comment Published!");

      res.redirect("/");
    }
  } catch (err) {
    req.flash("error", err);
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

      // CHANGE :: destroy the associated likes for this comment
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });

      //> check if it's an xhr request
      // send the comment id which was deleted back to the views
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment_id: req.params.id,
          },
          message: "Comment Deleted via xhr in heading!",
        });
      }

      req.flash("success", "Comment Deleted!");

      return res.redirect("back");
    } else {
      req.flash("error", "Unauthorized");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return;
  }
};

//> fetch the post id on which the comment was made before deleting comment, as posts store the comment id's as well so we need to delete those as well
