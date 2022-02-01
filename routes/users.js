const express = require("express");

const router = express.Router();

console.log(`Printing from routes/users.js`);

// Controller
const usersController = require("../controllers/users_controller");

// Routes
router.get("/", function (req, res) {
  return res.end("<p>hello user</p>");
});

router.get("/profile", usersController.profile);
router.get("/post", usersController.post);

module.exports = router;
