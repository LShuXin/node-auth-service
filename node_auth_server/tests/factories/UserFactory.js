// for test usage
const authRepository = require("../../src/app/http/repositories/AuthRepository");

class UserFactory {
  async create(status = "active") {
    //Hash Password
    const hashedPassword = await authRepository.hashPassword("Password@123");

    const payload = {
      firstName: "Abraham",
      lastName: "Udele",
      email: "codeflashtech@gmail.com",
      password: hashedPassword,
      status: status,
    };

    //Saves user to database
    const user = await authRepository.createUser(payload);
    return user;
  }
}

module.exports = UserFactory;
