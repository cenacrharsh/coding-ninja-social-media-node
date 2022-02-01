const express = require("express");

const router = express.Router();

console.log(`Printing from routes/index.js`);

// Controllers
const homeController = require("../controllers/home_controller");

// Routes
router.get("/", homeController.home);
router.get("/about", homeController.about);

router.use("/users", require("./users"));

/* for any further routes access form here:
router.use('/routerName', require('./routerFile'));
*/

module.exports = router;
