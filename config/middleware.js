//! we need to pass the flash msg form req to response, can't pass everytime as part of locals so we need a custom middleware

module.exports.setFlash = function (req, res, next) {
  //> find out the flash from the req, and set it up in the locals of the res - we access the locals from template

  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };

  next();
};
