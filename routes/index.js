const express = require("express");

const router = express.Router();

//! Controllers
const homeController = require("../controllers/home_controller");

//! Routes
router.get("/", homeController.home);

router.use("/users", require("./users"));

/*
 > for any further routes access form here:
 > router.use('/routerName', require('./routerFile'));
*/

module.exports = router;
