//# Importing Post Schema
const Post = require("../models/post");
const Comment = require("../models/comment");

//! Action to submit the data of the post form and save it in the DB
module.exports.create = function (req, res) {
  Post.create(
    {
      content: req.body.content,
      user: req.user._id,
    },
    function (err, post) {
      if (err) {
        console.log("Error in creating a post");
        return;
      }

      return res.redirect("back");
    }
  );
};

//! Action to delete a post, and all the comments associated with it
module.exports.destroy = function (req, res) {
  //* finding whether the post we are trying to delete, exists in the DB or not
  Post.findById(req.params.id, function (err, post) {
    //* checking whether the user who is deleting the post, created the post i.e. is authorized to delete it
    if (post.user == req.user.id) {
      post.remove();

      Comment.deleteMany(
        {
          post: req.params.id,
        },
        function (err) {
          return res.redirect("back");
        }
      );
    } else {
      //* if user is not authorized to delete
      return res.redirect("back");
    }
    /*
    > to compare both need to be in string format, user property stores id of user as per schema and won't contain user object unless populated first so it returns a string id 
    > .id means converting object id into string - provided by mongoose
    */
  });
};
