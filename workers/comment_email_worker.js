const queue = require("../config/kue");

const commentsMailer = require("../mailers/comments_mailer");

//! Process Function
queue.process("emails", function (job, done) {
  // console.log("Email Worker is processing a job: ", job.data);

  commentsMailer.newComment(job.data);

  done();
});
