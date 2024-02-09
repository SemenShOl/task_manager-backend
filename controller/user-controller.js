const userService = require("../bll/userService");

const UserController = {
  async registration(req, res) {
    try {
      const { password, login } = req.body;
      const userData = await userService.registration(password, login);
      console.log("userData from userService: ", userData);

      if (userData.status === 401) {
        return res
          .status(userData.status)
          .json({ message: "Такой login уже существует" });
      }
      console.log("userData from userService: ", userData);
      return res.status(userData.status).json({ token: userData.token });
    } catch (error) {
      console.log("error!");
      console.log(error);
    }
  },
  async login(req, res) {
    try {
      const { password, login } = req.body;
      const userData = await userService.login(password, login);
      if (userData.status == 401) {
        return res
          .status(userData.status)
          .json({ message: "Логин или пароль неверный" });
      }
      res.status(userData.status).json({ token: userData.token });
    } catch (error) {
      console.log("error!");
      console.log(error);
    }
  },
  async logout(req, res, next) {
    try {
    } catch (error) {}
  },
  async activate(req, res, next) {
    try {
    } catch (error) {}
  },
  async refresh(req, res, next) {
    try {
    } catch (error) {}
  },
  async getUsers(req, res, next) {
    try {
      res.json({ message: "Semyon is here!" });
    } catch (error) {}
  },
};

module.exports = UserController;
