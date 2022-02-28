//# Importing Model
const User = require("../models/user");
const Post = require("../models/post");

//! Rewriting as async/await
module.exports.home = async function (req, res) {
  try {
    // CHANGE :: populate the likes of each post and comment
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        // populate: {
        //   path: "likes",
        // },
      });
    // .populate("likes");

    //console.log("post: ", posts);

    let users = await User.find({});

    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

/*
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

      User.find({}, function (err, users) {
        return res.render("home", {
          title: "Codeial | Home",
          posts: posts,
          all_users: users,
        });
      });
    });
};
*/

/*
> module.exports.actionName = function(req, res) {}
*/
