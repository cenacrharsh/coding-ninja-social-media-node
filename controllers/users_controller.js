const fs = require("fs");
const path = require("path");

//# Importing User Model
const User = require("../models/user");

//! Render the Profile Page
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

//! Update the user profile
module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
  //     return res.redirect("back");
  //   });
  // } else {
  //   return res.status(401).send("Unauthorized");
  // }

  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);

      //> body parser can't parse multipart files, so multer does it for us, it takes req as a parameter and can process it, so we pass req & res to it
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("Multer Error: ", err);
        }

        user.name = req.body.name;
        user.email = req.body.email;

        // console.log("req.file: ", req.file);

        if (req.file) {
          //> if avatar exists already, then we remove it first and then save new one
          //todo: throws an error for the first time when there is no file available to unlink, so check first that whether file exists or not as well using fs
          // if (user.avatar) {
          //   fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          // }

          //> this is saving the path of the uploaded file into the avatar field in the user schema
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();

        req.flash("success", "Profile Updated Successfully!!!");

        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized");
    return res.status(401).send("Unauthorized");
  }
};

//! Render the Sign Up Page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

//! Render the Sign In Page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

//! Get the Sign Up Data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      req.flash("error", err);
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          req.flash("error", err);
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      req.flash("success", "You have signed up, login to continue!");
      return res.redirect("back");
    }
  });
};

//! Sign In and Create Session for User
module.exports.createSession = function (req, res) {
  //> Setting up the flash object
  req.flash("success", "Logged in Successfully!!!");

  return res.redirect("/");
};

//! Sign Out and Removing User's Session Cookies
module.exports.destroySession = function (req, res) {
  req.logout();
  /* logout func is provided by passport to req */

  req.flash("success", "You have logged out!!!");

  return res.redirect("/");
};
