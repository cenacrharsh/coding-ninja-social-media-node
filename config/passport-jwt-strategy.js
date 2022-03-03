//# Environment Variables
const env = require("./environment");

//# Importing Passport and Passport-JWT
const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

//# To extract JWT from Headers
const ExtractJWT = require("passport-jwt").ExtractJwt;

//# Importing User Model
const User = require("../models/user");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_strategy,
};

passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function (err, user) {
      if (err) {
        console.log("Error in User from JWT");
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
