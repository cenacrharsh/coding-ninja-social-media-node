//# Importing Model
const User = require("../models/user");
const Post = require("../models/post");

module.exports.home = function (req, res) {
  const posts = Post.find({}, function (err, post) {
    if (err) {
      console.log("Error in retireving posts");
      return;
    }

    //- post.map((p) => console.log(p.content));

    return res.render("home", {
      title: "Home",
      post: post,
    });
  });
};

/*
> module.exports.actionName = function(req, res) {}
*/
