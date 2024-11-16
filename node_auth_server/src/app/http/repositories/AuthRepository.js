/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 02:15:41
 * @FilePath: /node-auth-service/node_auth_server/src/app/http/repositories/AuthRepository.js
 * @Description:
 *
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved.
 */
const User = require("../../../database/models/User");
const Code = require("../../../database/models/Code");
const { mailgunService, emailService } = require("../../../config/nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (payload) => {
  const newUser = await new User(payload);
  await newUser.save();
  return newUser;
};

const createCode = async (payload) => {
  const newSecretCode = await new Code(payload);
  await newSecretCode.save();
  return newSecretCode;
};
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const createToken = async (tokenData, tokenSecret, tokenExpiry) => {
  const token = await jwt.sign(tokenData, tokenSecret, tokenExpiry);
  return token;
};

const validPassword = async (password, inPassword) => {
  const isValidPassword = await bcrypt.compare(password, inPassword);
  return isValidPassword;
};

// const sendEmail = async (from, to, subject, template) => {
//   const emailData = {
//     from: from,
//     to: to,
//     subject: subject,
//     template: template,
//   };
//   return await mailgunService.sendMail(emailData);
// };

const sendEmail = async (from, to, subject, html) => {
  const emailData = {
    from,
    to,
    subject,
    html,
  };
  console.log("send email:");
  console.log(emailData);
  return await emailService.sendMail(emailData);
};

module.exports = {
  createUser,
  createCode,
  sendEmail,
  getUserByEmail,
  hashPassword,
  createToken,
  validPassword,
  getUserById,
};
