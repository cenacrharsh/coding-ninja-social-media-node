const express = require("express");
const passport = require("passport");

//# Controller
const commentsController = require("../controllers/comments_controller");

const router = express.Router();

//! Routes

//> checking authentication of user before creating a comment, so if user is not signed in it will not reach the action of creating a comment
router.post("/create", passport.checkAuthentication, commentsController.create);

module.exports = router;
