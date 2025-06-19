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
  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    <style>@media only screen and (min-width:1025px){#subscription-notice{font-size:13px!important}}@media only screen and (min-width:601px) and (max-width:1024px){#subscription-notice{font-size:12px!important}}@media only screen and (max-width:600px){#subscription-notice{font-size:11px!important}}@media only screen and (max-width:480px){#subscription-notice{font-size:10px!important}}</style>    
    <style type="text/css" rel="stylesheet" media="all">@media only screen and (max-width:600px){.email-body_inner,.email-footer{width:100%!important}.content-cell p{font-size:12px!important}.button{font-size:12px!important;padding:10px 14px!important}.sub{font-size:8px!important}}@media only screen and (min-width:601px) and (max-width:1024px){.content-cell p{font-size:16px!important}.button{font-size:16px!important;padding:12px 18px!important}.sub{font-size:12px!important}}@media only screen and (min-width:1025px){.content-cell p{font-size:18px!important}.button{font-size:18px!important;padding:14px 20px!important}.sub{font-size:14px!important}}.button:hover{background-color:#784464!important;color:#FFF!important;border-color:#784464!important}.button--green:hover{background-color:#22BC66!important}.button--red:hover{background-color:#FF6136!important}</style>  </head>
  <body style="font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif; box-sizing: border-box; height: 100%; margin: 0; line-height: 1.4; color: #000000; background-color: #FFFFFF; -webkit-text-size-adjust: none; width: 100% !important;">
    <span class="preheader" style="font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif; box-sizing: border-box; visibility: hidden; display: none; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden;"></span>    
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;width:100%;margin:0;padding:0;-premailer-width:100%;-premailer-cellpadding:0;-premailer-cellspacing:0"><tbody style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box"><tr><td align="center" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box"><table class="email-masthead" width="100%" cellpadding="0" cellspacing="0" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;width:100%;margin:0;padding:0;-premailer-width:100%;-premailer-cellpadding:0;-premailer-cellspacing:0;text-align:center"><tbody style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box"><tr><td class="email-masthead" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;width:100%;margin:0;padding:0;-premailer-width:100%;-premailer-cellpadding:0;-premailer-cellspacing:0;text-align:center"><a href="https://www.picknaut.com/" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;color:#9568F7;font-weight:700"><img src="https://www.picknaut.com/images/picknaut-header-light.png" alt="Picknaut" style="width:100%;max-width:570px;height:auto;font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;border:none"></a></td></tr><tr><td class="email-body" width="100%" cellpadding="0" cellspacing="0" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;width:100%;margin:0;padding:0;-premailer-width:100%;-premailer-cellpadding:0;-premailer-cellspacing:0;border-bottom:1px solid #EDEFF2;background-color:#FFF"><table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;width:570px;margin:0 auto;padding:0;-premailer-width:570px;-premailer-cellpadding:0;-premailer-cellspacing:0;background-color:#FFF"><tbody style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box"><tr><td class="content-cell" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;padding:35px"><p style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;color:#000;font-size:16px;margin-top:0;margin-bottom:15px">Hi there,</p><p style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;color:#000;font-size:16px;margin-top:0;margin-bottom:15px">Thanks for subscribing to Picknaut - We're very excited to have you onboard!</p><p class="center" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:center;color:#000;font-size:16px;margin-top:0;margin-bottom:15px"><a class="button" href="https://www.picknaut.com" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;color:#000;font-weight:500;background-color:#FFF;border:2px solid #000;display:inline-block;padding:12px 18px;text-decoration:none;border-radius:0;-webkit-text-size-adjust:none;margin-top:5px;margin-bottom:10px">Explore Blog ›</a></p><p style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;color:#000;font-size:16px;margin-top:0;margin-bottom:15px">Keep an eye out for our next update. Until then — explore, learn, and stay curious!</p><p style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;line-height:1.5em;text-align:left;color:#000;font-size:16px;margin-top:0;margin-bottom:15px">Best,<br>The Picknaut Team.</p><p id="subscription-notice" style="color:#888">You're receiving this email because you subscribed at picknaut.com.<br>Want to stop getting updates? <a href="https://www.picknaut.com/unsubscribe">Unsubscribe here</a></p><table width="100%" class="body-sub" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;margin-top:25px;padding-top:25px;border-top:1px solid #EDEFF2"><tbody style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box"><tr><td class="content-cell" align="center" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;padding:35px"><p class="sub align-center" style="font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;box-sizing:border-box;line-height:1;text-align:center;color:#000;font-size:12px;margin-top:0;margin-bottom:15px">© 2025 Picknaut | <a href="https://www.picknaut.com/policy">Policy</a> | <a href="https://www.picknaut.com/terms">Terms</a></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table> </body>
</html>`;
  await subscribeTransporter.sendMail({
    from: `"Picknaut Team" <${process.env.SUBSCRIBE_USER}>`,
    to: toEmail,
    subject: "Welcome to Picknaut!",
    html,
    replyTo: "support@picknaut.com",
    headers: {
      "List-Unsubscribe": `<mailto:unsubscribe@picknaut.com?subject=unsubscribe>, <https://www.picknaut.com/unsubscribe>`,
    },
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
