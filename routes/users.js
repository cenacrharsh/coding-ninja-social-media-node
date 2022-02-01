const express = require("express");

const router = express.Router();

console.log(`Printing form routes/users.js`);

// Controller
const usersController = require("../controllers/users_controller");

// Routes
router.get("/", function (req, res) {
  return res.end("<p>hello user</p>");
});

router.get("/profile", usersController.profile);

/* for any further routes access form here:
router.use('/routerName', require('./routerFile'));
*/


module.exports = router;
