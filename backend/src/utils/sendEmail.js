// src/utils/sendEmail.js
// Simple wrapper around nodemailer - suitable for dev/testing

const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, text, html }) {
  // create a test account if no SMTP configured (nodemailer ethereal for dev)
  let transporter;
  if (process.env.SMTP_HOST) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
  } else {
    // use ethereal (no real email)
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: { user: testAccount.user, pass: testAccount.pass }
    });
  }

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'no-reply@eventhive.test',
    to,
    subject,
    text,
    html
  });

  console.log('Email sent:', info.messageId);
  if (nodemailer.getTestMessageUrl(info)) {
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  }
  return info;
}

module.exports = sendEmail;
