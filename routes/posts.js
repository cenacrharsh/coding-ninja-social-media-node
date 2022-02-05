const express = require("express");
const passport = require("passport");

//# Controller
const postsController = require("../controllers/posts_controller");

const router = express.Router();

//! Routes
router.post("/create", postsController.create);

module.exports = router;
