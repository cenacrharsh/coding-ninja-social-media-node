module.exports.home = function (req, res) {
  console.log(`Printing from controllers/home_controller.js`);

  return res.render("home", {
    title: "Home",
  });
};

/* module.exports.actionName = function(req, res) {} */
