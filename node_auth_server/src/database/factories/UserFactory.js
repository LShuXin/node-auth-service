/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 01:29:42
 * @FilePath: /node-auth-service/node_auth_server/src/database/factories/UserFactory.js
 * @Description: 
 * 
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved. 
 */
const authRepository = require("../../app/http/repositories/AuthRepository");

class UserFactory {
  async create(status = "active") {
    //Hash Password
    const hashedPassword = await authRepository.hashPassword("Password@123");

    const payload = {
      firstName: "Abraham",
      lastName: "Udele",
      email: "codeflashtech@gmail.com",
      password: hashedPassword,
      status: status,
    };

    //Saves user to database
    const user = await authRepository.createUser(payload);
    return user;
  }
}

module.exports = UserFactory;
