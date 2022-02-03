const express = require("express");
const passport = require("passport");

const router = express.Router();

console.log(`Printing from routes/users.js`);

// Controller
const usersController = require("../controllers/users_controller");

// Routes
router.get("/profile", passport.checkAuthentication, usersController.profile);

router.get("/sign-up", usersController.signUp);

router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

/* Using Passport as a Middleware to Authenticate */
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

router.get("/sign-out", usersController.destroySession);

module.exports = router;
