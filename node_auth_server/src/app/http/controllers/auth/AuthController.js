const path = require('path');
const ejs = require('ejs');
const cryptoRandomString = require('crypto-random-string');
const JsonResponse = require('../../../modules/JsonResponse');
const Helpers = require('../../../modules/Helpers');
const requestValidation = require('../../requests/RequestValidation');
const { httpStatus } = require('../../../../config/status');
const authRepository = require('../../repositories/AuthRepository');

let jsonResponse = new JsonResponse();
let helpers = new Helpers();

const signTokenExpiry = {
  expiresIn: 60 * 60 * 24 * 14,
};

const register = async (req, res, _next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const autoActivate = req.body.autoActivate || false;

  const { error } = requestValidation.registerValidation(req.body);

  if (error) {
    return res
      .status(httpStatus.VALIDATION_ERROR)
      .send(
        jsonResponse.failedValidation(
          'Failed Validation',
          error.details[0].message
        )
      );
  }

  const validPassword = helpers.validatePassword(password);

  if (!validPassword) {
    return res
      .status(httpStatus.VALIDATION_ERROR)
      .send(
        jsonResponse.failedValidation(
          'Password must be at least 6 characters, a lowercase and uppercase letter, a numeric and special character.'
        )
      );
  }

  try {
    const emailExist = await authRepository.getUserByEmail(email);

    if (emailExist) {
      return res
        .status(httpStatus.CONFLICT)
        .send(jsonResponse.error('Email already exist'));
    }

    const hashedPassword = await authRepository.hashPassword(password);

    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    };

    const user = await authRepository.createUser(payload);
    const user_id = user.id;

    const signTokenData = {
      _id: user_id,
    };

    const signTokenSecret = res.locals.secrets.JWT_SECRET;

    const token = await authRepository.createToken(
      signTokenData,
      signTokenSecret,
      signTokenExpiry
    );
    req.session.token = token;

    const secretCode = cryptoRandomString({
      length: 6,
    });

    const codePayload = {
      code: secretCode,
      email: user.email,
    };

    await authRepository.createCode(codePayload);

    if (autoActivate) {
      const user = await authRepository.getUserById(user_id);
      if (!user) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send(jsonResponse.error('User not found during activation'));
      }
  
      const response = await authRepository.getCodeByEmailAndCode(user.email, secretCode);
      if (!response) {
        return res
          .status(httpStatus.FORBIDDEN)
          .send(
            jsonResponse.forbidden('Activation Link is expired or used already')
          );
      }
      const activateUser = await authRepository.updateUserByEmail(user.email, { status: 'active' });
      const deleteUserCode = await authRepository.deleteCodeByEmail(user.email);
      if (activateUser && deleteUserCode) {
        return res
          .status(httpStatus.OK)
          .send(
            jsonResponse.success('Account Activated you can proceed to login')
          );
      }
      return res
        .status(httpStatus.CONFLICT)
        .send(jsonResponse.error('Something went wrong'));
    } else {
      const emailFrom = `${res.locals.secrets.APP_NAME} <${res.locals.secrets.EMAIL_USERNAME}>`;
      const emailTo = user.email;
      const emailSubject = 'Your Activation Link for YOUR APP';
      // get the absolute path to the view template with the file extension specified.
      const emailVerificationPath = path.resolve(
        './src/views/email/auth/emailVerification.ejs'
      );
      const baseUrl = req.protocol + '://' + req.get('host');
      const html = await ejs.renderFile(emailVerificationPath, {
        baseUrl: baseUrl,
        userId: user_id,
        secretCode: secretCode,
      });
  
      //Send Verification Email
      await authRepository.sendEmail(emailFrom, emailTo, emailSubject, html);
  
      return res
        .status(httpStatus.OK)
        .send(
          jsonResponse.success(
            'Registration Successful, Check Email for Activation Link',
            user
          )
        );
    }
  } catch (err) {
    console.log('Error on /api/auth/register: ', err);
    res
      .status(httpStatus.CONFLICT)
      .send(jsonResponse.error('Error occured', err));
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { error } = requestValidation.loginValidation(req.body);

  if (error) {
    return res
      .status(httpStatus.VALIDATION_ERROR)
      .send(
        jsonResponse.failedValidation(
          'Failed Validation',
          error.details[0].message
        )
      );
  }

  const user = await authRepository.getUserByEmail(email);

  if (!user) {
    return res
      .status(httpStatus.CONFLICT)
      .send(jsonResponse.error('Email or password is wrong'));
  }

  const userStatus = user.status;

  const isValidPassword = await authRepository.validPassword(
    password,
    user.password
  );
  if (!isValidPassword) {
    return res
      .status(httpStatus.CONFLICT)
      .send(jsonResponse.error('Invalid Email or Password'));
  }

  if (userStatus != 'active') {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send(
        jsonResponse.unauthorized(
          'User Account not active, please activate account'
        )
      );
  }

  const signTokenData = {
    _id: user.id,
  };

  //Create and assign token
  const signTokenSecret = res.locals.secrets.JWT_SECRET;
  const token = await authRepository.createToken(
    signTokenData,
    signTokenSecret,
    signTokenExpiry
  );
  tokenData = [
    {
      token: token,
    },
  ];
  res
    .header('auth-token', token)
    .send(jsonResponse.success('Logged in Successfully', tokenData));
};

const getActivationEmail = async (req, res) => {
  const baseUrl = req.protocol + '://' + req.get('host');

  try {
    const userId = req.body.user.id;
    const user = await authRepository.getUserById(userId);
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send(jsonResponse.error('User not found'));
    }
    await authRepository.deleteCodeByEmail(user.email)

    const secretCode = cryptoRandomString({
      length: 6,
    });

    const codePayload = {
      code: secretCode,
      email: user.email,
    };
    //Create Code
    await authRepository.createCode(codePayload);

    const emailFrom = `${res.locals.secrets.APP_NAME} <${res.locals.secrets.EMAIL_USERNAME}>`;
    const emailTo = user.email;
    const emailSubject = 'Your Activation Link for YOUR APP';
    //get the absolute path to the view template with the file extension specified.
    let emailVerificationPath = path.resolve(
      './src/views/email/auth/emailVerification.ejs'
    );
    const html = await ejs.renderFile(emailVerificationPath, {
      baseUrl: baseUrl,
      userId: user.id,
      secretCode: secretCode,
    });

    await authRepository.sendEmail(emailFrom, emailTo, emailSubject, html);

    return res
      .status(httpStatus.OK)
      .send(
        jsonResponse.success(
          'Successful, Check Email for Activation Link',
          user
        )
      );
  } catch (err) {
    console.log('Error on /api/auth/get-activation-email:: ', err);

    res
      .status(httpStatus.CONFLICT)
      .send(jsonResponse.error('Error occurred', err));
  }
};

const verifyAccount = async (req, res) => {
  try {
    const user = await authRepository.getUserById(req.params.userId);

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send(jsonResponse.error('User not found'));
    }

    const response = await authRepository.getCodeByEmailAndCode(user.email, req.params.secretCode);

    if (!response) {
      return res
        .status(httpStatus.FORBIDDEN)
        .send(
          jsonResponse.forbidden('Activation Link is expired or used already')
        );
    }
    const activateUser = await authRepository.updateUserByEmail(user.email, { status: 'active' });
    const deleteUserCode = await authRepository.deleteCodeByEmail(user.email);

    if (activateUser && deleteUserCode) {
      return res
        .status(httpStatus.OK)
        .send(
          jsonResponse.success('Account Activated you can proceed to login')
        );
    }
    return res
      .status(httpStatus.CONFLICT)
      .send(jsonResponse.error('Something went wrong'));
  } catch (err) {
    console.log('Error on /api/auth/verification/verify-account: ', err);
    return res
      .status(httpStatus.SERVER_ERROR)
      .send(jsonResponse.error('Something went wrong'));
  }
};

const passWordResetGetCode = async (req, res) => {
  const { email } = req.body;
  const { error } = requestValidation.emailValidation(req.body);

  if (error) {
    return res
      .status(httpStatus.VALIDATION_ERROR)
      .send(
        jsonResponse.failedValidation(
          'Failed Validation',
          error.details[0].message
        )
      );
  }

  try {
    const user = await authRepository.getUserByEmail(email);
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send(
          jsonResponse.notFound('The provided email address is not registered!')
        );
    }
    const secretCode = cryptoRandomString({
      length: 6,
    });

    const codePayload = {
      code: secretCode,
      email: email,
    };

    await authRepository.createCode(codePayload);
    
    const emailFrom = `${res.locals.secrets.APP_NAME} <${res.locals.secrets.EMAIL_USERNAME}>`;
    const emailTo = email;
    const emailSubject = 'Your Password Reset Code';
    //get the absolute path to the view template with the file extension specified.
    let passwordResetEmailPath = path.resolve(
      './src/views/email/auth/passwordResetVerification.ejs'
    );
    const html = await ejs.renderFile(passwordResetEmailPath, {
      username: user.firstName,
      secretCode: secretCode,
    });

    //Send Password Reset Code to email
    await authRepository.sendEmail(emailFrom, emailTo, emailSubject, html);

    res
      .status(httpStatus.OK)
      .send(
        jsonResponse.success(
          'Password reset code Sent to your registered email'
        )
      );
  } catch (err) {
    console.log('Error on /api/auth/password-reset/get-code: ', err);
    return res
      .status(httpStatus.SERVER_ERROR)
      .send(jsonResponse.error('Something went wrong. Please try again!'));
  }
};

const passWordResetVerify = async (req, res) => {
  const { email, password, code } = req.body;
  // Validate request
  const { error } = requestValidation.passwordResetValidation(req.body);

  if (error) {
    return res
      .status(httpStatus.VALIDATION_ERROR)
      .send(
        jsonResponse.failedValidation(
          'Failed Validation',
          error.details[0].message
        )
      );
  }
  //Validate Password
  const validPassword = helpers.validatePassword(password);

  if (!validPassword) {
    return res
      .status(httpStatus.VALIDATION_ERROR)
      .send(
        jsonResponse.failedValidation(
          'Your password must be at least 6 characters long and contain a lowercase letter, an uppercase letter, a numeric digit and a special character.'
        )
      );
  }
  try {
    const user = await authRepository.getUserByEmail(email);

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send(
          jsonResponse.notFound('The provided email address is not registered!')
        );
    }

    const response = await authRepository.getCodeByEmailAndCode(email, code);

    if (!response) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send(
          jsonResponse.notFound(
            'The entered code is not correct. Please make sure to enter the code in the requested time interval.'
          )
        );
    }
    //Hash Password
    const newHashedPassword = await authRepository.hashPassword(password);
    await authRepository.updateUserPasswordByEmail(email, newHashedPassword);
    await authRepository.deleteCodeByEmailAndCode(email, code);
  
    return res
      .status(httpStatus.OK)
      .send(jsonResponse.success('Password updated Successfully'));
  } catch (err) {
    console.log('Error on /api/auth/password-reset/verify: ', err);

    return res
      .status(httpStatus.SERVER_ERROR)
      .send(jsonResponse.error('Something went wrong. Please try again!'));
  }
};

const logout = async (req, res) => {
  req.session = null;
  res.status(httpStatus.OK).send(jsonResponse.success('Logout Successfully'));
};

const deleteAccount = async (req, res) => {
  const { password } = req.body;
  const user_id = req.user._id;

  //Request Validation
  const { error } = requestValidation.passwordValidation(req.body);

  console.log(8888)
  console.log(error)

  if (error) {
    return res
      .status(httpStatus.VALIDATION_ERROR)
      .send(jsonResponse.failedValidation('Failed Validation', error));
  }

  try {
    const user = await authRepository.getUserById(user_id);

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send(
          jsonResponse.notFound('User not found', error.details[0].message)
        );
    }
    const passwordCheckSuccess = await authRepository.validPassword(
      password,
      user.password
    );

    if (!passwordCheckSuccess) {
      return res
        .status(httpStatus.CONFLICT)
        .send(jsonResponse.error('The provided password is not correct'));
    }
    
    await authRepository.deleteUserByEmail(user.email)
    
    return res
      .status(httpStatus.OK)
      .send(jsonResponse.success('Account deleted Successfully'));
  } catch (err) {
    console.log('Error on /api/auth/delete-account: ', err);

    return res
      .status(httpStatus.SERVER_ERROR)
      .send(jsonResponse.error('Something went wrong. Please try again!'));
  }
};

module.exports = {
  register,
  login,
  getActivationEmail,
  verifyAccount,
  passWordResetGetCode,
  passWordResetVerify,
  logout,
  deleteAccount,
};
