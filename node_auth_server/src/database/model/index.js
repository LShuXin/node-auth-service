/*
 * @Author: liushuxin admin@example.com
 * @Date: 2025-05-05 13:25:51
 * @LastEditors: liushuxin admin@example.com
 * @LastEditTime: 2025-05-05 14:13:19
 * @FilePath: /node-auth-service/node_auth_server/src/database/model/index.js
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

let models;

if ('MYSQL' === dbType) {
  models = require('./mysql_db_model/index');
} else if ('MONGO' === dbType) {
  models = require('./mongo_db_model/index');
} else {
  throw 'Unknown dbType: ' + dbType;
}

module.exports = models;