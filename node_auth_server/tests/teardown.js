/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 01:15:15
 * @FilePath: /node-auth-service/node_auth_server/tests/teardown.js
 * @Description: 
 * 
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved. 
 */
const MemoryDatabaseServer = require("../src/config/MemoryDatabaseServer");

module.exports = async () => {
  await MemoryDatabaseServer.stop();
};

/* Note:
globalTeardown is a path to a module which exports an async function that is triggered once after all test suites.
*/
