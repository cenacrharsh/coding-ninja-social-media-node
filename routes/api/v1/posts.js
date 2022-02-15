const express = require("express");

const router = express.Router();

//# Passport
const passport = require("passport");

//# Posts API Controller
const postsApi = require("../../../controllers/api/v1/posts_api");

router.get("/", postsApi.index);

//! Authenticating user before they can delete a post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsApi.destroy
);

module.exports = router;
