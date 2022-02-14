//# Importing Post & Comment Schema
const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.status(200).json({
    message: "List of Posts in DB!",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    // if (post.user == req.user.id) {
    post.remove();

    await Comment.deleteMany({
      post: req.params.id,
    });

    return res.status(200).json({
      message: "Posts and Associated Comments Deleted Successfully!",
    });
    // } else {
    //   req.flash("error", "You cannot delete this post");
    //   return res.redirect("back");
    // }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
