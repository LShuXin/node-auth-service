/*
 * @Author: liushuxin admin@example.com
 * @Date: 2025-05-05 14:18:37
 * @LastEditors: liushuxin admin@example.com
 * @LastEditTime: 2025-05-05 14:46:42
 * @FilePath: /node-auth-service/node_auth_server/src/database/model/mysql_db_model/Code.js
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
// src/database/models/Code.js
const { DataTypes } = require('sequelize');
const { mSequelize } = require('../../connection/MySqlDbConnection')

const Code = mSequelize.define(
  'Code',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, 
  {
    timestamps: false,
    tableName: 'Codes',
  }
);

module.exports = Code;