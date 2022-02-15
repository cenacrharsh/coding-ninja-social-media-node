//# Importing Passport and Passport-Local-Strategy
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//# Importing User Model
const User = require("../models/user");

//! Authentication Using Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
      //* allows us to set first arguemnt as req
    },
    function (req, email, password, done) {
      //* find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", err);
          return done(err);
        }

        //* if user not found or password entered is incoorect
        if (!user || user.password != password) {
          req.flash("error", "Invalid Username/Password");
          return done(null, false);
        }

        //* if user found
        return done(null, user);
      });
    }
  )
);

/*
> The Local Strategy returns the User to Serializer which stores the user id in session cookie which is encrypted by Express-Session library
*/

//! Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//! Deserializing the user from the key in cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> Passport");
      return done(err);
    }

    return done(null, user);
  });
});

//! Check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  /*
  >If the user is signed in, then pass on the request to the next function(controller's action)
  */
  if (req.isAuthenticated()) {
    return next();
  }

  /* If user is not signed in */
  return res.redirect("/users/sign-in");
};

//! Set the user for the views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    /*
    > req.user contains the current signed in user from session cookies, & we are just sending this to the locals for the view
    */
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
