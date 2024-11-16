/*
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 01:27:57
 * @FilePath: /node-auth-service/node_auth_server/src/config/MongoDbConnection.js
 * @Description:
 *
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved.
 */
const mongoose = require("mongoose");

let mongoDBUrl;

if (process.env.APP_ENV == "production") {
  mongoDBUrl = process.env.MDB_DATABASE_CONNECT;
} else {
  const { MDB_DATABASE_CONNECT } = require("./secrets.json");
  mongoDBUrl = MDB_DATABASE_CONNECT;
}

console.log("connect to mongodb...");

mongoose
  .connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("-----> mongoDB connected..."))
  .catch((err) =>
    console.log("-----> Error trying to connect to mongoDB: ", err)
  );

mongoose.connection.on(
  "error",
  console.error.bind(console, "-----> mongoDB connection error")
);
