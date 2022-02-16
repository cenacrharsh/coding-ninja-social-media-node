const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");

const User = require("../models/user");
const { Strategy } = require("passport-jwt");

//! Tell Passport to use Google Strategy for Social Authentication
passport.use(
  new googleStrategy(
    {
      clientID:
        "697562612153-b6v3ptklhidjtoqemc62th9gi2tbplo0.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/uers/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //> find a user
      User.findOne({ email: profile.emails[0].value }).exec(
        function (err, user) {
          if (err) {
            console.log("Error in Google Strategy Passprot: ", err);
            return;
          }

          console.log(profile);

          if (user) {
            //> if found, set this user as req.user i.e. sign in the user
            return done(null, user);
          } else {
            //> if not found, create the user and set it as req.user
            User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            });
          }
        },
        function (err, user) {
          if (err) {
            console.log("Error in Creating User: ", err);
            return;
          }

          return done(null, user);
        }
      );
    }
  )
);

module.exports = passport;
