const Router = require("express");
const userService = require("../bll/userService");
const authRepostitory = require("../repositories/authRepository");
const checkAuth = require("../middlewares/checkAuth");
const getAuthRoutes = () => {
  const authRouter = Router({});
  authRouter.post("/registration", async (req, res) => {
    const { password, login } = req.body;
    const userData = await userService.registration(password, login);
    if (userData.status === 401) {
      return res
        .status(userData.status)
        .json({ message: "Такой логин уже существует" });
    }
    res.status(userData.status).json({ message: userData.token });
  });

  authRouter.post("/login", async (req, res) => {
    const { password, login } = req.body;
    const userData = await userService.login(password, login);
    if (userData.status == 401) {
      return res
        .status(userData.status)
        .json({ message: "Логин или пароль неверный" });
    }
    res
      .status(userData.status)
      .json({ message: userData.token, groupName: userData.chosenGroup });
  });

  authRouter.put("/new_data", checkAuth, async (req, res) => {
    const { password, chosenGroup } = req.body;
    const userID = req.userID;
    // console.log(newPassword, newGroupName);
    await userService.updateGroupOrPassword(userID, chosenGroup, password);
    res.sendStatus(200);
  });

  return authRouter;
};

module.exports = getAuthRoutes;
