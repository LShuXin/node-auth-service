/*
 * @Author: liushuxin admin@example.com
 * @Date: 2025-05-05 12:56:21
 * @LastEditors: liushuxin admin@example.com
 * @LastEditTime: 2025-05-05 14:40:12
 * @FilePath: /node-auth-service/node_auth_server/src/database/connection/MySqlDbConnection.js
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
const { Sequelize } = require('sequelize');

let dbUrl;
if ('production' === process.env.APP_ENV) {
  dbUrl = process.env.MYSQL_DATABASE_CONNECT;
} else {
  const { MYSQL_DATABASE_CONNECT } = require('../../config/secrets.json');
  dbUrl = MYSQL_DATABASE_CONNECT;
}

const mSequelize = new Sequelize(dbUrl, {
  dialect: 'mysql',
  logging: console.log,
});


const connect = async () => {
  try {
    await mSequelize.authenticate();
    console.log('MySQL connected...');
    await mSequelize.sync(); // or { force: true } / { alter: true }
  } catch (error) {
    console.error('Unable to connect to MySQL:', error);
  }
}

module.exports = {
  mSequelize,
  connect
}
