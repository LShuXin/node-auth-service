/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 01:28:11
 * @FilePath: /node-auth-service/node_auth_server/src/config/nodemailer.js
 * @Description:
 *
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved.
 */
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

let secrets;
if (process.env.APP_ENV == "production") {
  secrets = process.env;
} else {
  secrets = require("./secrets");
}

const mailgunAuth = {
  auth: {
    api_key: secrets.MAILGUN_SECRET,
    domain: secrets.MAILGUN_DOMAIN,
  },
  host: secrets.EMAIL_HOST,
  //proxy: 'http://user:pass@localhost:8080' // optional proxy, default is false
};

const emailServiceAuth = {
  host: secrets.EMAIL_HOST,
  port: secrets.EMAIL_PORT,
  // mailer docs: secure
  // – if true the connection will use TLS when connecting to server.
  // - if false (the default) then TLS is used if server supports the STARTTLS extension.
  // - In most cases set this value to true if you are connecting to port 465.
  // - For port 587 or 25 keep it false
  secure: true,
  auth: {
    user: secrets.EMAIL_USERNAME,
    pass: secrets.EMAIL_PASSWORD,
  },
};

const emailService = nodemailer.createTransport(emailServiceAuth);
const mailgunService = nodemailer.createTransport(mg(mailgunAuth));

module.exports = {
  emailService,
  mailgunService,
};
