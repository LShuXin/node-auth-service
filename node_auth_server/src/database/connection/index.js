/*
 * @Author: liushuxin admin@example.com
 * @Date: 2025-05-05 13:30:57
 * @LastEditors: liushuxin admin@example.com
 * @LastEditTime: 2025-05-05 14:22:36
 * @FilePath: /node-auth-service/node_auth_server/src/database/connection/index.js
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
let dbType;
if ('production' === process.env.APP_ENV) {
  dbType = process.env.DB_TYPE;
} else {
  const { DB_TYPE } = require('../../config/secrets.json');
  dbType = DB_TYPE;
}

let connection;
if ('MYSQL' === dbType) {
  connection = require('./MySqlDbConnection');
} else if ('MONGO' === dbType) {
  connection = require('./MongoDbConnection');
} else {
  throw 'Unknown dbType: ' + dbType;
}


module.exports = connection;