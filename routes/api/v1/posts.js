const express = require("express");

const router = express.Router();

//# Posts API Controller
const postsApi = require("../../../controllers/api/v1/posts_api");

router.get("/", postsApi.index);

module.exports = router;
