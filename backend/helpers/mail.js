const nodemailer = require("nodemailer");
const config = require("../config");

const { generateHash } = require("./hashing");

const sendVerificationMail = async (protocol, hostname, user) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASSWORD,
    }
  });
  let message = {
    from: config.EMAIL,
    to: user.email,
    subject: "Verify your account",
    html: `
           <p>Your link is ${generateVerificationLink(protocol, hostname, user)}
            `,
  };
  transporter.sendMail(message, (err, info) => {
    if (err) throw err;
    console.log(info);
  });
};

const generateVerificationLink = (protocol, hostname, user) => {
  const hash = generateHash(user);
  const link =
    protocol +
    "://" +
    hostname +
    ":5000/api/users/verify/" +
    user.username +
    "/" +
    hash;

  return link;
};


module.exports = {
  sendVerificationMail,
};
