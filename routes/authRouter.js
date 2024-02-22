const Router = require("express");
const userService = require("../bll/userService");

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

  authRouter.post("/login", async () => {
    const { password, login } = req.body;
    const userData = await userService.login(password, login);
    if (userData.status == 401) {
      return res
        .status(userData.status)
        .json({ message: "Логин или пароль неверный" });
    }
    res.status(userData.status).json({ message: userData.token });
  });

  return authRouter;
};

module.exports = getAuthRoutes;
