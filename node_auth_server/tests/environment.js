/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 01:23:04
 * @FilePath: /node-auth-service/node_auth_server/tests/environment.js
 * @Description:
 *
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved.
 */
const NodeEnvironment = require("jest-environment-node");

const MemoryDatabaseServer = require("../src/config/MemoryDatabaseServer");

class CustomEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    this.global.__DB_URL__ = await MemoryDatabaseServer.getConnectionString();
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;

/*
    testEnvironment is the test environment that will be used for testing.
*/
