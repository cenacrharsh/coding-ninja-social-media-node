const express = require("express");
const passport = require("passport");

//# Controller
const postsController = require("../controllers/posts_controller");

const router = express.Router();

//! Routes

//> checking authentication of user before creating a post, so if user is not signed in it will not reach the action of creating a post
router.post("/create", passport.checkAuthentication, postsController.create);

router.get(
  "/destroy/:id",
  passport.checkAuthentication,
  postsController.destroy
);

module.exports = router;
