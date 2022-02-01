module.exports.profile = function (req, res) {
  console.log(`Printing from controllers/users_controller.js`);

  return res.render("user", {
    title: "User Profile",
  });
};

module.exports.post = function (req, res) {
  console.log(`Printing from controllers/users_controller.js`);

  return res.render("user", {
    title: "User Post",
  });
};
