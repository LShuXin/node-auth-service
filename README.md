<!--
 * @LastEditors: liushuxin
 * @LastEditTime: 2024-11-17 02:52:22
 * @FilePath: /node-auth-service/README.md
 * @Description: 
 * 
 * Copyright (c) 2024 by liushuxina@gmail.com All Rights Reserved. 
-->
# Node-Auth-Service

A Simple Token-Based User Authentication Service using JWT in Node JS and MongoDB. The origin project: [node-auth-service](https://github.com/bytesfield/node-auth-service)

## Description

With this you can quickly craft a token-based user authentication system using JWT and continue your project implementation. This comes with `User Registration`, `Email Verification`, `Login`, `Password Reset`, `Account Deletion`, `Logout`.

## Documentation

The API documentation is hosted on [Postman Doc](https://web.postman.co/workspace/node_auth_service~20925a35-af08-4784-ae18-b50cb29af11d/overview)

## How to use

### Step 1: Clone Or Download This Repository To Your Machine

```bash
git clone https://github.com/bytesfield/node-auth-service.git
```

### Step2: Customize Your Config

Update Environment variables, rename `.env.example` to `.env` and `secrets.json.example` in `config` folder to `secrets.json`, then update `MDB_DATABASE_CONNECT` value to your MongoDB database connection and update `APP_PORT` to your desired port default is `3000`, also `APP_ENV` to `production` or `test` depending on your environment default is `test`.

For email configuration on `.env` or `secrets.json` files, update the `EMAIL` **or** `MAILGUN` credentials respectively depending on your mailing service. When using mailgun, export the `mailgunService` from the `nodemailer.js` in the `config` folder, while `emailService` if you are using a normal mailing service and pass the required parameters for sending mail.

Lastly update `JWT_SECRET` and `COOKIE_SESSION_SECRET` to your desired values.

### Step3: Build Docker Image & RUN

```bash
sudo docker-compose -f "docker-compose-build.yml" up -d --build
```

*How To Run Exists Docker Image*

```bash
sudo docker-compose -f "docker-compose-run.yml" up -d
```

### Step 4

Open Postman run the Api endpoints. Documentation can be accessed below

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

# Thired Party Packages

- [cookie-session](https://github.com/expressjs/cookie-session)
- [nodemailer](https://www.nodemailer.com/)
- [Mailgun](https://www.mailgun.com/)


# License

Source codes is license under the MIT license


