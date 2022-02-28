//# Importing Post Schema
const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

//! Action to submit the data of the post form and save it in the DB
module.exports.create = async function (req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    //> check if it's an AJAX request, if yes then return some json
    if (req.xhr) {
      //* if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
      post = await post.populate([{ path: "user", select: "name" }]);
      // console.log("posting post", post);

      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Published via xhr!",
      });
    }

    req.flash("success", "Post Published!");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", err);
    //> added this to view the error on console as well
    console.log(err);
    return res.redirect("back");
  }
};

//! Action to delete a post, and all the comments associated with it
module.exports.destroy = async function (req, res) {
  //* finding whether the post we are trying to delete, exists in the DB or not

  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      // CHANGE :: delete the associated likes for the post and all its comments' likes too
      await Like.deleteMany({ likeable: post, onModel: "Post" });
      await Like.deleteMany({ _id: { $in: post.comments } });

      post.remove();

      await Comment.deleteMany({
        post: req.params.id,
      });

      //> check if it's an AJAX request, if yes then return some json
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "Post Deleted via xhr in heading!",
        });
      }

      req.flash("success", "Post & Associated Comments Deleted");

      return res.redirect("back");
    } else {
      //* if user is not authorized to delete
      req.flash("error", "You cannot delete this post");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return res.redirect("back");
  }

  //* checking whether the user who is deleting the post, created the post i.e. is authorized to delete it

  /*
    > to compare both need to be in string format, user property stores id of user as per schema and won't contain user object unless populated first so it returns a string id 
    > .id means converting object id into string - provided by mongoose
    */
};

/* 
* diffrence between user.id & user._id ?

> user.id gets the string of the user._id, & user._id is of type ObjectId
*/
