const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// Authentication Using Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user --> Passport");
          return done(err);
        }

        // if user not found or password entered is incoorect
        if (!user || user.password != password) {
          console.log("Invalid Username/Password");
          return done(null, false);
        }

        // if user found
        return done(null, user);
      });
    }
  )
);

/* The Local Strategy returns the User to Serializer which stores the user id in session cookie which is encrypted by Express-Session library */

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserializing the user from the key in cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> Passport");
      return done(err);
    }

    return done(null, user);
  });
});

module.exports = passport;
