//# Environment Variables
const env = require("./environment");

const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

//! Transporter (sends the emails) - defines how communication will take place
let transporter = nodemailer.createTransport(env.smtp);
//* auth is the authentication object in the transporter

//! Templates - defines whenever we will send an html email where the file would be place inside views/mailers
let renderTemplate = (data, relativePath) => {
  //> relativePath, from where the mail is being sent

  let mailHTML;
  //* storing all the html to be sent in the mail

  //> using ejs to render the template and send it, we'll pass the required data along (context)
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("Error in returning template", err);
        return;
      }

      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
