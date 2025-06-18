const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendWelcomeEmail = async (toEmail) => {
  const html = fs.readFileSync(path.join(__dirname, "../templates/welcomeEmail.html"), "utf8");
  await transporter.sendMail({
    from: `"Picknaut" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: "Welcome to Picknaut 🚀",
    html,
  });
};
