# Node-Auth-Service

[TOC]

A Simple Token-Based User Authentication Service using JWT in Node JS and MongoDB/MySql.

## Description

With this you can quickly craft a token-based user authentication system using JWT and continue your project implementation. This comes with `User Registration`, `Email Verification`, `Login`, `Password Reset`, `Account Deletion`, `Logout`.

## Documentation

### Registration (Manual Activation)

#### Call the registration endpoint to receive an activation email

- Request

```bash
curl --location 'localhost:3000/api/auth/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: express:sess=eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTJPREU0Tm1ReU4yTmlNVGt5WlRBd01XVXdOREUwWmpBaUxDSnBZWFFpT2pFM05EWTBNekV5TnpFc0ltVjRjQ0k2TVRjME56WTBNRGczTVgwLkdMWFMtQzAwS3MwZmozSjFSTWE1RDgyLUVIQ0I4b3FTVWEyNnNJY1hERVEifQ==; express:sess.sig=v7upEp-Mt0lDM-ApPnx1iS21b8I' \
--data-raw '{
    "firstName" : "Simon",
    "lastName" : "Liu",
    "email" : "17853314162@163.com",
    "password" : "Password@123",
    "confirmPassword" : "Password@123"
}'
```

- Response

```json
{
  "status": "Success",
  "statusCode": 200,
  "message": "Registration Successful, Check Email for Activation Link"
}
```

#### Activate your account via the email link

You will receive an email containing a link like this:

```bash
http://localhost:3000/api/auth/verification/verify-account/68186d27cb192e001e0414f0/55ed1e
```

Note: You must activate your account before logging in.

### Resend Activation Code

If the activation code has expired, you can request a new one. This request requires a valid token.

- Request

```bash
curl --location --request GET 'localhost:3000/api/auth/verification/get-activation-email' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE4NzY4OTgyZjUzYzAwMWU0ZGNlZWEiLCJpYXQiOjE3NDY0MzM5MjgsImV4cCI6MTc0NzY0MzUyOH0.-hj9GcTvScHGcOqZzuPX5mMDl2R5RocaNljt3_VKc64' \
--header 'Content-Type: application/json' \
--header 'Cookie: express:sess=eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTJPREU0TnpZNE9UZ3laalV6WXpBd01XVTBaR05sWldFaUxDSnBZWFFpT2pFM05EWTBNek0yTnpNc0ltVjRjQ0k2TVRjME56WTBNekkzTTMwLnNMajJkN0xmM012Y1lqMWpRRnAzX2N3VVBYWUx0VkRMY3VjcDhlaWl0UjQifQ==; express:sess.sig=HWfN6H0-pbKQkrE8wMOWuZcw98w' \
--data '{
    "user": {
        "id": "68186d27cb192e001e0414f0"
    }
}'
```

- Response

```json
{ 
  "status": "Success",
  "statusCode": 200,
  "message": "Successful, Check Email for Activation Link"
}
```

### Registration (Auto Activation)

- Request

```bash
curl --location 'localhost:3000/api/auth/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: express:sess=eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTJPREU0TnpZNE9UZ3laalV6WXpBd01XVTBaR05sWldFaUxDSnBZWFFpT2pFM05EWTBNek0yTnpNc0ltVjRjQ0k2TVRjME56WTBNekkzTTMwLnNMajJkN0xmM012Y1lqMWpRRnAzX2N3VVBYWUx0VkRMY3VjcDhlaWl0UjQifQ==; express:sess.sig=HWfN6H0-pbKQkrE8wMOWuZcw98w' \
--data-raw '{
    "firstName" : "Simon",
    "lastName" : "Liu",
    "email" : "17853314162@163.com",
    "password" : "Password@123",
    "confirmPassword" : "Password@123",
    "autoActivate": true
}'
```

- Response

```json
{
  "status": "Success",
  "statusCode": 200,
  "message": "Account Activated you can proceed to login"
}
```

### Login

- Request

```bash
curl --location 'localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: express:sess=eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTJPREU0TnpZNE9UZ3laalV6WXpBd01XVTBaR05sWldFaUxDSnBZWFFpT2pFM05EWTBNek0yTnpNc0ltVjRjQ0k2TVRjME56WTBNekkzTTMwLnNMajJkN0xmM012Y1lqMWpRRnAzX2N3VVBYWUx0VkRMY3VjcDhlaWl0UjQifQ==; express:sess.sig=HWfN6H0-pbKQkrE8wMOWuZcw98w' \
--data-raw '{
    "email" : "17853314162@163.com",
    "password" : "Password@123"
}'
```

- Response

```json
{
  "status": "Success",
  "statusCode": 200,
  "message": "Logged in Successfully",
  "data": [
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE4NzY4OTgyZjUzYzAwMWU0ZGNlZWEiLCJpYXQiOjE3NDY0MzM5MjgsImV4cCI6MTc0NzY0MzUyOH0.-hj9GcTvScHGcOqZzuPX5mMDl2R5RocaNljt3_VKc64"
    }
  ]
}
```

### Account Activation

This step can also be handled automatically on the server during registration. If manually activating via email:

- Request

```bash
curl --location 'localhost:3000/api/auth/verification/verify-account/68187f59b5522b001e5784c8/4e61ea' \
--header 'Cookie: express:sess=eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTJPREU0TjJZMU9XSTFOVEl5WWpBd01XVTFOemcwWXpnaUxDSnBZWFFpT2pFM05EWTBNelU1TWprc0ltVjRjQ0k2TVRjME56WTBOVFV5T1gwLk10OHVKckZ2cVpNVEgyYm9qWjFaVDktOUZBeGNfVDFVWEZOc2I3cC0yUVEifQ==; express:sess.sig=xJNQUt5bqe6VBPxnrufheIKw5gg'
```

- Response

```json
{
  "status": "Success",
  "statusCode":200,
  "message": "Account Activated you can proceed to login"
}
```

### Password Reset

#### Step 1: Request Verification Code

- Request

```bash
curl --location 'localhost:3000/api/auth/password-reset/get-code' \
--header 'Content-Type: application/json' \
--header 'Cookie: express:sess=eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTJPREU0TjJZMU9XSTFOVEl5WWpBd01XVTFOemcwWXpnaUxDSnBZWFFpT2pFM05EWTBNelU1TWprc0ltVjRjQ0k2TVRjME56WTBOVFV5T1gwLk10OHVKckZ2cVpNVEgyYm9qWjFaVDktOUZBeGNfVDFVWEZOc2I3cC0yUVEifQ==; express:sess.sig=xJNQUt5bqe6VBPxnrufheIKw5gg' \
--data-raw '{
    "email" : "17853314162@163.com"
}'
```

- Response

```json
{
  "status": "Success",
  "statusCode": 200,
  "message": "Password reset code Sent to your registered email"
}

```

A verification code will be sent to your email. For example: a745d3

#### Step 2: Reset Password Using the Code

- Request

```bash
curl --location 'localhost:3000/api/auth/password-reset/verify' \
--header 'Content-Type: application/json' \
--header 'Cookie: express:sess=eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTJPREU0T0RReU1UTmlPVFF6WVRBd01XVTNPR0UxTWpRaUxDSnBZWFFpT2pFM05EWTBNemN4TlRNc0ltVjRjQ0k2TVRjME56WTBOamMxTTMwLmxDUDRoZEJNeW1HcHFlTmkwekdGdDZNT2dCRml3YnNDWXpMZWtEVWxUajQifQ==; express:sess.sig=4MUR_EKBd5RnfsEtK5VN9R_K9tY' \
--data-raw '{
    "email" : "17853314162@163.com",
    "code" : "a745d3",
    "password" : "Password@1234",
    "confirmPassword" : "Password@1234"
}'

```

- Response

```json
{
   "status": "Success",
   "statusCode": 200,
   "message": "Password updated Successfully"
}
```

#### Step 3: Login with New Password

- Request

```bash
curl --location 'localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: express:sess=eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpmYVdRaU9pSTJPREU0T0RReU1UTmlPVFF6WVRBd01XVTNPR0UxTWpRaUxDSnBZWFFpT2pFM05EWTBNemN4TlRNc0ltVjRjQ0k2TVRjME56WTBOamMxTTMwLmxDUDRoZEJNeW1HcHFlTmkwekdGdDZNT2dCRml3YnNDWXpMZWtEVWxUajQifQ==; express:sess.sig=4MUR_EKBd5RnfsEtK5VN9R_K9tY' \
--data-raw '{
    "email" : "17853314162@163.com",
    "password" : "Password@1234"
}'
```

- Response

```json
{
   "status": "Success",
   "statusCode": 200,
   "message": "Logged in Successfully",
   "data": [
      { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE4ODQyMTNiOTQzYTAwMWU3OGE1MjQiLCJpYXQiOjE3NDY0MzcyNzksImV4cCI6MTc0NzY0Njg3OX0.bV3EQEj7fbuN0yYkUxyC8LgIWhQ9aPBVTwS5EgBvfrQ"
      }
   ]
}
```

### Logout

- Request

```bash
curl --location --request POST 'localhost:3000/api/auth/logout' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE4ODQyMTNiOTQzYTAwMWU3OGE1MjQiLCJpYXQiOjE3NDY0MzcyNzksImV4cCI6MTc0NzY0Njg3OX0.bV3EQEj7fbuN0yYkUxyC8LgIWhQ9aPBVTwS5EgBvfrQ' \
--header 'Authorization: Bearer oat_MTc.M0tUcEhuNEhZZmNqTmtZQ29TNFpNT2V1VzRJMEZSeGRVTTZCbldjQzI4MzI1ODMzMTQ'
```

- Response

```json
{
   "status": "Success",
   "statusCode": 200,
   "message": "Logout Successfully"
}
```

### Deletion

- Request

```bash
curl --location 'localhost:3000/api/auth/delete-account' \
--header 'auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE4ODQyMTNiOTQzYTAwMWU3OGE1MjQiLCJpYXQiOjE3NDY0Mzc0MjIsImV4cCI6MTc0NzY0NzAyMn0.vUCJfmJdNkt6HK_VDrPcy50etUeTZCqY4pN1wfaqhRo' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer oat_MTc.M0tUcEhuNEhZZmNqTmtZQ29TNFpNT2V1VzRJMEZSeGRVTTZCbldjQzI4MzI1ODMzMTQ' \
--data-raw '{
    "password" : "Password@1234"
}'
```

- Response

```json
{
   "status": "Success",
   "statusCode": 200,
   "message": "Account deleted Successfully"
}
```

## How to use

### Step 1: Clone Or Download This Repository To Your Machine

```bash
git clone https://github.com/LShuXin/node-auth-service.git
```

### Step2: Customize Your Config

- Rename `.env.example` to `.env` and `secrets.json.example` in `config` folder to `secrets.json`, update fields in these two files according to the following steps.
- Set `DB_TYPE = MONGO` or `DB_TYPE = MYSQL`, then update `MDB_DATABASE_CONNECT` or `MYSQL_DATABASE_CONNECT` accordingly. If you prefer `MySql` update `sql.init` accoudingly.
- Set `APP_NAME`, `APP_URL`, `APP_ENV`, `APP_PORT`, `APP_NAME` and `APP_URL` will be used to render email teamplate.
- Set `EMAIL_TYPE = NORMAL` or `EMAIL_TYPE = MAILGUN`, then update `EMAIL_*` or `MAILGUN_*` accordingly.
- Set `JWT_SECRET` and `COOKIE_SESSION_SECRET`

### Step3: Build Docker Image & RUN

```bash
sudo docker-compose -f "docker-compose-build.yml" up -d --build
// sudo docker-compose -f "docker-compose-run.yml" up -d
```

### Step 4

Open Postman run the Api endpoints.

Note: Use active emails for testing as you will receive emails to your inbox.

## Some Tips

### How To Generate a Random JWT Secret Key?

To generate a random JWT secret key, you can use a tool like Node.js to create a random string. Here's a simple example:

(1) Open your terminal or command prompt, then run the following Node.js script to generate a random string:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

This command uses the crypto module in Node.js to generate a random sequence of 32 bytes and then converts it to a hexadecimal string.

(2) Copy the generated string.

Open your .env file and set the JWT secret key:

```bash
JWT_SECRET=paste-the-generated-string-here
```

Replace paste-the-generated-string-here with the string you copied.

Save the changes to your .env file.

Now, you have a securely generated JWT secret key. Remember to keep this key confidential and don't share it publicly. If needed, you can regenerate the key and update it in your .env file.

### How Can I Interact With MongoDB

```shell
apples-Mac-mini-1243:node-auth-service apple$ docker exec -it mongodb_server bash
root@mongodb_server:/# mongosh "mongodb://root:root@localhost:27017"
Current Mongosh Log ID: 673843f8a27caff4b5c1c18b
Connecting to:          mongodb://<credentials>@localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.3
Using MongoDB:          8.0.3
Using Mongosh:          2.3.3

For mongosh info see: https://www.mongodb.com/docs/mongodb-shell/


To help improve our products, anonymous usage data is collected and sent to MongoDB periodically (https://www.mongodb.com/legal/privacy-policy).
You can opt-out by running the disableTelemetry() command.

------
   The server generated these startup warnings when booting
   2024-11-16T15:01:06.073+08:00: For customers running the current memory allocator, we suggest changing the contents of the following sysfsFile
   2024-11-16T15:01:06.073+08:00: We suggest setting the contents of sysfsFile to 0.
   2024-11-16T15:01:06.073+08:00: Your system has glibc support for rseq built in, which is not yet supported by tcmalloc-google and has critical performance implications. Please set the environment variable GLIBC_TUNABLES=glibc.pthread.rseq=0
   2024-11-16T15:01:06.073+08:00: vm.max_map_count is too low
   2024-11-16T15:01:06.073+08:00: We suggest setting swappiness to 0 or 1, as swapping can cause performance problems.
------

test> 

```

## Thired Party Packages

- [cookie-session](https://github.com/expressjs/cookie-session)
- [nodemailer](https://www.nodemailer.com/)
- [Mailgun](https://www.mailgun.com/)

## Links

- [node-auth-service](https://github.com/bytesfield/node-auth-service)

## License

Source codes is license under the MIT license