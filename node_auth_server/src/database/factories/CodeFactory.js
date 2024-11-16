/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 01:29:29
 * @FilePath: /node-auth-service/node_auth_server/src/database/factories/CodeFactory.js
 * @Description: 
 * 
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved. 
 */
const authRepository = require("../../app/http/repositories/AuthRepository");
const cryptoRandomString = require("crypto-random-string");

class CodeFactory {
  async create(email) {
    const secretCode = cryptoRandomString({
      length: 6,
    });

    const payload = {
      code: secretCode,
      email: email,
    };
    //Create Code
    const code = await authRepository.createCode(payload);

    return code;
  }
}

module.exports = CodeFactory;
