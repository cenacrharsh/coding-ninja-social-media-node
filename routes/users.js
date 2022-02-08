const express = require("express");
const passport = require("passport");

//# Controller
const usersController = require("../controllers/users_controller");

const router = express.Router();

//! Routes
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  usersController.profile
);

router.get("/sign-up", usersController.signUp);

router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

//> Using Passport as a Middleware to Authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

router.get("/sign-out", usersController.destroySession);

module.exports = router;
