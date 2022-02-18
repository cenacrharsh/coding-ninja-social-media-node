//# Import NodeMailer Config
const nodeMailer = require("../config/nodemailer");

//! Function which will send the mail

//> another way of exporting a method
exports.newComment = (comment) => {
  console.log("inside new comment mailer", comment);

  //* sendMail() is used to send email
  nodeMailer.transporter.sendMail(
    {
      from: "Kumar Harsh",
      to: comment.user.email,
      subject: "New Comment Published!",
      html: "<h1>Your Comment is now Published!</h1>",
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      console.log("Mail Delivered! ", info);
      return;
    }
  );
};

//# whenever a new comment has been made, we have to call this mailer
