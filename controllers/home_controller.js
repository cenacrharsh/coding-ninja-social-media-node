module.exports.home = function (req, res) {
  console.log(`Printing from controllers/home_controller.js`);

  return res.end("<h1>Express is up for Codeial!</h1>");
};

module.exports.about = function (req, res) {
  console.log(`Printing from controllers/home_controller.js`);

  return res.end("<h1>About Page</h1>");
};

/* module.exports.actionName = function(req, res) {} */
