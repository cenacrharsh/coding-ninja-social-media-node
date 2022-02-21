//# Import NodeMailer Config
const nodeMailer = require("../config/nodemailer");

//! Function which will send the mail

//> another way of exporting a method
exports.newComment = (comment) => {
  // console.log("content of comment is: ", comment);
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );

  //* sendMail() is used to send email
  nodeMailer.transporter.sendMail(
    {
      from: "harsh.nishant.superstar@gmail.com",
      to: comment.user.email,
      subject: "New Comment Published!",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }

      // console.log("Mail Delivered! ", info);
      return;
    }
  );
};

//# whenever a new comment has been made, we have to call this mailer
