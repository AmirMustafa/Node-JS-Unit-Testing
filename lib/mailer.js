exports.sendWelcomeEmail = function (email, name) {
  // console.log('--- in mailer > sendWelcomeEmail');
  if (!email || !name) {
    return Promise.reject(new Error("Invalid input")); // write test for this
  }

  var body = `Dear ${name}, welcome to our family!`;

  return sendEmail(email, body); //write test for this
};

exports.sendPasswordResetEmail = function (email) {
  // console.log('--- in mailer > sendPasswordResetEmail');
  if (!email) {
    return Promise.reject(new Error("Invalid input"));
  }

  var body = "Please click http://some_link to reset your password.";

  return sendEmail(email, body);
};

function sendEmail(email, body) {
  // console.log('--- in mailer > sendEmail');
  if (!email || !body) {
    return Promise.reject(new Error("Invalid input")); // write test for this
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Email Sent!");
      // return reject(new Error('Fake Error'));
      return resolve("Email sent"); // write test for this
    }, 100);
  });
}
