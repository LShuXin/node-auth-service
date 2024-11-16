/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 01:30:45
 * @FilePath: /node-auth-service/node_auth_server/src/routes/AuthRoutes.js
 * @Description: 
 * 
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved. 
 */
const express = require("express");
const authController = require("../app/http/controllers/auth/AuthController");
const verifyJwtToken = require("../app/http/middlewares/VerifyJwtToken");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/verification/get-activation-email",
  verifyJwtToken,
  authController.getActivationEmail
);
router.get(
  "/verification/verify-account/:userId/:secretCode",
  authController.verifyAccount
);
router.post("/password-reset/get-code", authController.passWordResetGetCode);
router.post("/password-reset/verify", authController.passWordResetVerify);
router.post("/logout", verifyJwtToken, authController.logout);
router.post("/delete-account", verifyJwtToken, authController.deleteAccount);

module.exports = router;
