//# Environment Variables
const env = require("../../../config/environment");

//# Importing User Model
const User = require("../../../models/user");

//# Importing jsonwebtoken Library
const jwt = require("jsonwebtoken");

//! Generate JWT corresponding to User
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "Invalid Username/Password",
      });
    } else {
      return res.status(200).json({
        message: "Sign in Successful, here is your token!",
        data: {
          token: jwt.sign(user.toJSON(), env.jwt_secret, {
            expiresIn: "100000",
          }),
        },
      });
    }
  } catch (err) {
    console.log("*****", err);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
