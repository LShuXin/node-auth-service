/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 01:27:04
 * @FilePath: /node-auth-service/node_auth_server/src/app/modules/Helpers.js
 * @Description: 
 * 
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved. 
 */
const httpStatus = require("../../config/status");
const JsonResponse = require("./JsonResponse");

class Helpers {
  /**
   * Validates Password
   *
   * @param {string} password
   *
   * @return \json
   */
  validatePassword(password) {
    const isValidPassowrd = password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/
    );

    if (isValidPassowrd) {
      return true;
    }
  }

  /**
   * Checks empty Object
   *
   * @param {object} obj
   *
   * @return \boolean
   */
  isEmptyObject(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
}

module.exports = Helpers;
