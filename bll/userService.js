const bcrypt = require("bcrypt");
const tokenService = require("./tokenService");
const authRepostitory = require("../repositories/authRepository");
const userService = {
  async registration(password, login) {
    try {
      const usersWithLogin = await authRepostitory.getUserByLogin(login);
      if (usersWithLogin.length) {
        return { status: 401 };
      }
      const hashPass = await bcrypt.hash(password, 3);

      await authRepostitory.createUser(login, hashPass);
      const newUsersWithLogin = await authRepostitory.getUserByLogin(login);

      const createdUser = newUsersWithLogin[0];
      console.log("Новосозданный user: ", createdUser);
      const token = tokenService.generateToken(createdUser.id);
      console.log("token: ", token);
      return { status: 201, token };
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async login(password, login) {
    const usersWithLogin = await authRepostitory.getUserByLogin(login);

    if (!usersWithLogin.length) {
      return { status: 401 };
    }
    const userInfo = usersWithLogin[0];
    const isValidPass = await bcrypt.compare(password, userInfo.password);
    console.log("isValidPass: ", isValidPass);
    if (!isValidPass) {
      return { status: 401 };
    }
    const token = tokenService.generateToken(userInfo.id);
    return { status: 200, token };
  },

  async updateLoginOrPassword(userID, newPassword, newLogin) {
    const hashPass = await bcrypt.hash(newPassword, 3);
    await authRepostitory.changeUser(userID, newLogin, hashPass);
  },
};

module.exports = userService;
