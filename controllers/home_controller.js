module.exports.home = function (req, res) {
  console.log(`Printing from controllers/home_controller.js`);

  return res.render("home", {
    title: "Home",
  });
};

module.exports.about = function (req, res) {
  console.log(`Printing from controllers/home_controller.js`);

  return res.end("<h1>About Page</h1>");
};

/* module.exports.actionName = function(req, res) {} */
