/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 01:28:55
 * @FilePath: /node-auth-service/node_auth_server/src/config/status.js
 * @Description: 
 * 
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved. 
 */
const httpStatus = {
  OK: 200,
  NOT_FOUND: 404,
  UNPROCESSIBLE_ENTITY: 402,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  METHOD_NOT_FOUND: 405,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
module.exports = {
  httpStatus,
};
