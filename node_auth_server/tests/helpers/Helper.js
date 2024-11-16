/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 01:25:34
 * @FilePath: /node-auth-service/node_auth_server/tests/helpers/Helper.js
 * @Description:
 *
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved.
 */
const supertest = require("supertest");
const app = require("../../index");

class Helper {
  constructor(model) {
    this.apiServer = supertest(app);
  }
}

module.exports = Helper;
