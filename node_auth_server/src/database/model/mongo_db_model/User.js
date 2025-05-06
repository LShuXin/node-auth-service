/*
 * @Author: liushuxin admin@example.com
 * @Date: 2025-01-12 09:23:14
 * @LastEditors: liushuxin admin@example.com
 * @LastEditTime: 2025-05-05 14:37:22
 * @FilePath: /node-auth-service/node_auth_server/src/database/model/mongo_db_model/User.js
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
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
      default: 'user',
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;