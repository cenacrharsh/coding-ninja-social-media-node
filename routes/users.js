const express = require("express");

const router = express.Router();

console.log(`Printing from routes/users.js`);

// Controller
const usersController = require("../controllers/users_controller");

// Routes
router.get("/profile", usersController.profile);
router.get("/sign-up", usersController.signUp);
router.get("/sign-in", usersController.signIn);

module.exports = router;
