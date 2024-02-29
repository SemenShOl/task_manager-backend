const userService = require("../bll/userService");
const db = require("../db");

const authRepostitory = {
  async getUserByLogin(login) {
    try {
      const resWithLogin = await db.query(
        "SELECT * FROM web_user WHERE login = $1",
        [login]
      );
      console.log(`Пользователи с ${login} : `, resWithLogin.rows);
      return resWithLogin.rows;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async createUser(login, hashPass) {
    try {
      await db.query("INSERT INTO web_user (login, password) VALUES ($1, $2)", [
        login,
        hashPass,
      ]);
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async changeUser(userID, newLogin, newPassword) {
    try {
      console.log("userID: ", userID);
      console.log("newLogin: ", newLogin);
      console.log("newPassword: ", newPassword);

      await db.query(
        "update web_user set login=$1, password=$2 where id = $3",
        [newLogin, newPassword, userID]
      );
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },
};
module.exports = authRepostitory;
