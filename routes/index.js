const express = require("express");

const router = express.Router();

console.log(`Printing form routes/index.js`);

// Controllers
const homeController = require("../controllers/home_controller");

// Routes
router.get("/", homeController.home);
router.use("/users", require("./users"));

module.exports = router;
