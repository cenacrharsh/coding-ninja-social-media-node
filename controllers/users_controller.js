// Render the Profile Page
module.exports.profile = function (req, res) {
  console.log(`Printing from controllers/users_controller.js`);

  return res.render("user_profile", {
    title: "User Profile",
  });
};

// Render the Sign Up Page
module.exports.signUp = function (req, res) {
  console.log(`Printing from controllers/users_controller.js`);

  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// Render the Sign In Page
module.exports.signIn = function (req, res) {
  console.log(`Printing from controllers/users_controller.js`);

  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};
