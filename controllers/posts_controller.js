//# Importing Post Schema
const Post = require("../models/post");

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
