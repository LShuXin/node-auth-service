const { User, Code } = require('../../../database/model/index');
const { mailgunService, emailService } = require('../../../config/nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let secrets;
if ('production' === process.env.APP_ENV) {
  secrets = process.env;
} else {
  secrets = require('../../../config/secrets.json');
}

let useMailGun, useMySql;

const { EMAIL_TYPE, DB_TYPE } = secrets;

if ('MAILGUN' === EMAIL_TYPE) {
  useMailGun = true;
} else {
  useMailGun = false;
  if ('NORMAL' !== EMAIL_TYPE) {
    throw 'unKnown emailType: ' + EMAIL_TYPE;
  }
}

if ('MYSQL' === DB_TYPE) {
  useMySql = true;
} else {
  useMySql = false;
  if ('MONGO' !== DB_TYPE) {
    throw 'unKnown dbType: ' + DB_TYPE;
  }
}

const extractUserFields = (user, isMySql) => {
  const data = isMySql ? user.dataValues : user;
  return {
    role: data.role,
    status: data.status,
    id: isMySql ? data.id : data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};

const extractCodeFields = (code, isMySql) => {
  const data = isMySql ? code.dataValues : code;
  return {
    dateCreated: data.dateCreated,
    id: isMySql ? data.id : data._id,
    code: data.code,
    email: data.email
  };
};

const createUser = async (payload) => {
  const newUser = await new User(payload);
  await newUser.save();
  return extractUserFields(newUser, useMySql);
};

const getUserByEmail = async (email) => {
  const user = useMySql
    ? await User.findOne({ where: { email } })
    : await User.findOne({ email });

  if (!user) {
    return null;
  }

  return extractUserFields(user, useMySql);
};

const getUserById = async (id) => {
  const user = useMySql
    ? await User.findByPk(id)
    : await User.findById(id);

  if (!user) {
    return null;
  }

  return extractUserFields(user, useMySql);
};

const updateUserByEmail = async (email, updates) => {
  if (useMySql) {
    const [affectedRows] = await User.update(updates, {
      where: { email }
    });
    return affectedRows > 0;
  } else {
    const result = await User.updateOne({ email }, updates);
    return result.nModified > 0;
  }
};

const updateUserPasswordByEmail = async (email, newHashedPassword) => {
  if (useMySql) {
    const [updatedCount] = await User.update(
      { password: newHashedPassword },
      { where: { email } }
    );
    return updatedCount > 0;
  } else {
    const result = await User.updateOne(
      { email },
      { password: newHashedPassword }
    );
    return result.modifiedCount > 0;
  }
};

const deleteUserByEmail = async (email) => {
  if (useMySql) {
    const deletedCount = await User.destroy({
      where: { email }
    });
    return deletedCount > 0;
  } else {
    const result = await User.deleteOne({ email });
    return result.deletedCount > 0;
  }
};

const createCode = async (payload) => {
  const newCode = await new Code(payload);
  await newCode.save();
  return extractCodeFields(newCode, useMySql);
};

const deleteCodeByEmailAndCode = async (email, code) => {
  if (useMySql) {
    const deletedCount = await Code.destroy({
      where: { email, code }
    });
    return deletedCount > 0;
  } else {
    const result = await Code.deleteOne({ email, code });
    return result.deletedCount > 0;
  }
};

const deleteCodeByEmail = async (email) => {
  if (useMySql) {
    const deletedRows = await Code.destroy({
      where: { email }
    });
    return deletedRows > 0;
  } else {
    const result = await Code.deleteMany({ email });
    return result.deletedCount > 0;
  }
};

const getCodeByEmailAndCode = async (email, code) => {
  const found = useMySql
    ? await Code.findOne({ where: { email, code } })
    : await Code.findOne({ email, code });

  if (!found) {
    return null;
  }

  return extractCodeFields(found, useMySql);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const createToken = async (tokenData, tokenSecret, tokenExpiry) => {
  const token = await jwt.sign(tokenData, tokenSecret, tokenExpiry);
  return token;
};

const validPassword = async (password, inPassword) => {
  const isValidPassword = await bcrypt.compare(password, inPassword);
  return isValidPassword;
};

let sendEmail;
if (useMailGun) {
  sendEmail = async (from, to, subject, template) => {
    const emailData = {
      from: from,
      to: to,
      subject: subject,
      template: template,
    };
    return await mailgunService.sendMail(emailData);
  };
} else {
  sendEmail = async (from, to, subject, html) => {
    const emailData = {
      from,
      to,
      subject,
      html,
    };
    return await emailService.sendMail(emailData);
  };
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserByEmail,
  updateUserPasswordByEmail,
  deleteUserByEmail,
  
  createCode,
  deleteCodeByEmailAndCode,
  deleteCodeByEmail,
  getCodeByEmailAndCode,

  hashPassword,
  createToken,
  validPassword,
  
  sendEmail,
};
