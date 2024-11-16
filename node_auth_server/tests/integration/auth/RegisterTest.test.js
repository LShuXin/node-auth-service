/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 01:24:07
 * @FilePath: /node-auth-service/node_auth_server/tests/integration/auth/RegisterTest.test.js
 * @Description:
 *
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved.
 */
const Helper = require("../../helpers/Helper");
const helper = new Helper();
const urlPrefix = "/api/auth";

describe("Register Test", () => {
  const payload = {
    firstName: "Jude",
    lastName: "Udele",
    email: "codeflashtech@gmail.com",
    password: "Abkeys@1993",
    confirmPassword: "Abkeys@1993",
  };
  const wrongPayload = {
    firstName: "Jude",
    lastName: "Udele",
    email: "codeflashtech",
    password: "Abkeys",
    confirmPassword: "Abkeys",
  };

  it("Should register user with right credentials", async () => {
    const { res } = await helper.apiServer
      .post(`${urlPrefix}/register`)
      .send(payload);

    expect(res.statusCode).toEqual(200);
    expect(res.statusMessage).toBe("OK");
  }, 80000);

  it("Should not register user with wrong credentials", async () => {
    const { res } = await helper.apiServer
      .post(`${urlPrefix}/register`)
      .send(wrongPayload);

    expect(res.statusCode).toEqual(422);
    expect(res.statusMessage).toBe("Unprocessable Entity");
  }, 80000);
});
