// services/mailService.js
const nodemailer = require("nodemailer");
require("dotenv").config();

// --- TRANSPORT for subscriber welcome emails ---
const subscribeTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SUBSCRIBE_USER,
    pass: process.env.SUBSCRIBE_PASS,
  },
});

// --- TRANSPORT for newsletters/updates ---
const newsletterTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.NEWSLETTER_USER,
    pass: process.env.NEWSLETTER_PASS,
  },
});

// --- TRANSPORT for default emails ---
const defaultTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.DEFAULT_USER,
    pass: process.env.DEFAULT_PASS,
  },
});

// --- SEND WELCOME EMAIL (subscribe@picknaut.com) ---
exports.sendWelcomeEmail = async (toEmail) => {
  const html = `<h2>Welcome to Picknaut 🎉</h2>
  <p>You're now subscribed!</p>
  <p>If you have any questions, feel free to contact us at support@picknaut.com</p>
  <p style="font-size: 12px; color: #666;">
    To unsubscribe from these emails, <a href="${process.env.WEBSITE_URL}/unsubscribe?email=${encodeURIComponent(toEmail)}">click here</a>
  </p>`;
  await subscribeTransporter.sendMail({
    from: `"Picknaut Subscriptions" <${process.env.SUBSCRIBE_USER}>`,
    to: toEmail,
    subject: "🎉 Welcome to Picknaut!",
    html,
    replyTo: "support@picknaut.com",
    headers: {
      'List-Unsubscribe': `<${process.env.WEBSITE_URL}/unsubscribe?email=${encodeURIComponent(toEmail)}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
    }
  });
};


// --- SEND NEWSLETTER UPDATE (newsletter@picknaut.com) ---
exports.sendNewsletterUpdate = async (toEmail, subject, htmlContent) => {
  await newsletterTransporter.sendMail({
    from: `"Picknaut Updates" <${process.env.NEWSLETTER_USER}>`,
    to: toEmail,
    subject,
    html: htmlContent,
  });
};
