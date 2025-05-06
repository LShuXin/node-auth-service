/*
 * @Author: liushuxin admin@example.com
 * @Date: 2025-01-12 09:23:14
 * @LastEditors: liushuxin admin@example.com
 * @LastEditTime: 2025-05-05 14:58:52
 * @FilePath: /node-auth-service/node_auth_server/src/app/http/middlewares/VerifyJwtToken.js
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
const jwt = require('jsonwebtoken');
const { httpStatus } = require('../../../config/status');
const httpError = require('../../../config/errors');
const JsonResponse = require('../../modules/JsonResponse');

let jsonResponse = new JsonResponse();

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send(jsonResponse.notFound('Access Denied, token required'));
  }

  try {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, res.locals.secrets.JWT_SECRET);

    if (!verified) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send(jsonResponse.unauthorized('Invalid Token'));
    }

    req.user = verified;

    next();
  } catch (err) {
    return res
      .status(httpStatus.CONFLICT)
      .send(jsonResponse.error('Something went wrong, token invalid'));
  }
};
