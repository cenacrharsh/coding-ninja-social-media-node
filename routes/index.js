const express = require("express");

const router = express.Router();

//! Controllers
const homeController = require("../controllers/home_controller");

//! Routes
router.get("/", homeController.home);

//* Forwarding other routes
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));

/*
 > for any further routes access form here:
 > router.use('/routerName', require('./routerFile'));
*/

module.exports = router;
