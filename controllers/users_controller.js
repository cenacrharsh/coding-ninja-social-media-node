module.exports.profile = function (req, res) {
  console.log(`Printing from controllers/users_controller.js`);

  return res.end("<h1>User Profile</h1>");
};

module.exports.post = function (req, res) {
  console.log(`Printing from controllers/users_controller.js`);

  return res.end("<h1>User Post</h1>");
};
