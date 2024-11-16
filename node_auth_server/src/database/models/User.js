/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 01:29:58
 * @FilePath: /node-auth-service/node_auth_server/src/database/models/User.js
 * @Description:
 *
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved.
 */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    lastName: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

//Model
const User = mongoose.model("User", userSchema);

module.exports = User;
