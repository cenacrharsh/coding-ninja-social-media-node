//# Importing Model
const User = require("../models/user");
const Post = require("../models/post");

module.exports.home = function (req, res) {
  // Post.find({}, function (err, posts) {
  //   if (err) {
  //     console.log("Error in retireving posts");
  //     return;
  //   }

  //   return res.render("home", {
  //     title: "Codial | Home",
  //     posts: posts,
  //   });
  // });

  //* Prepopulating the user (a referred object in our post Schema) of each post
  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      if (err) {
        console.log("Error in retireving posts");
        return;
      }

      return res.render("home", {
        title: "Codial | Home",
        posts: posts,
      });
    });
};

/*
> module.exports.actionName = function(req, res) {}
*/
