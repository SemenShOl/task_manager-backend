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
      const result = await authRepostitory.getUserByLogin(login);

      const createdUser = result.rows[0];
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
    const isValidPass = bcrypt.compare(password, userInfo.password);
    if (!isValidPass) {
      return { status: 401 };
    }
    const token = tokenService.generateToken(userInfo.id);
    return { status: 200, token };
  },
};
module.exports = userService;
