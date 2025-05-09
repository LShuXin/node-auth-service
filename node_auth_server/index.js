/*
 * @LastEditors: liushuxin admin@example.com
 * @LastEditTime: 2025-05-05 14:56:22
 * @FilePath: /node-auth-service/node_auth_server/index.js
 * @Description:
 *
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved.
 */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const compression = require('compression');
const csurf = require('csurf');
const authApiRoutes = require('./src/routes/AuthRoutes');
const exception = require('./src/app/http/middlewares/Exception');
const cookieSession = require('cookie-session');
const { connect } = require('./src/database/connection/index');

dotenv.config();

let secrets, port;
if ('production' === process.env.APP_ENV) {
  secrets = process.env;
  port = process.env.APP_PORT;
} else {
  secrets = require('./src/config/secrets');
  port = secrets.APP_PORT;
}

// Database Connection
connect();

// Declare our Express App
const app = express();

// Register View Engine
// app.set('view engine', 'ejs');

// #Middleware
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(compression());
app.use(cors());

app.use((req, res, next) => {
  res.locals.secrets = secrets;
  next();
});

// #Cookie Session
app.use(
  cookieSession({
    secret: secrets.COOKIE_SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    httpOnly: true,
    secure: false,
  })
);

// #CSRF security for Production
if (process.env.NODE_ENV == 'production') {
  app.use(csurf());
  app.use((req, res, next) => {
    res.set('x-frame-options', 'DENY');
    res.cookie('mytoken', req.csrfToken());
    next();
  });
}

//Auth APi
app.use('/api/auth', authApiRoutes);

//Exception Handlers Middleware
app.use(exception.handleValidationError);
app.use(exception.handleTypeError);
app.use(exception.handleDatabaseError);
app.use(exception.handleServerError);
app.use(exception.handleReferenceError);
app.use(exception.handleNotFoundError);

const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}`)
);

module.exports = server;
