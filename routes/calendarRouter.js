const Router = require("express");
const calendarService = require("../bll/calendarService");
const calendarRepository = require("../repositories/calendarRepository");
const checkAuth = require("../middlewares/checkAuth");

const getCalendarRoutes = () => {
  const calendarRouter = Router({});

  calendarRouter.get("/", checkAuth, async (req, res) => {
    const result = await calendarRepository.getDays(
      req.query.from,
      req.query.to,
      req.userID
    );
    res.json(result);
  });
  calendarRouter.get("/:deadline", checkAuth, async (req, res) => {
    const result = await calendarRepository.getTasksbyDeadline(
      req.params.deadline,
      req.userID
    );
    res.json(result);
  });

  calendarRouter.post("/", checkAuth, async (req, res) => {
    const { tasksWithAdded, status } = await calendarRepository.createTask(
      req.body,
      req.userID
    );
    res.status(status).json(tasksWithAdded);
  });

  calendarRouter.put("/task/:id", checkAuth, async (req, res) => {
    const webStatus = await calendarRepository.changeTask(
      req.params.id,
      req.body,
      req.userID
    );
    res.sendStatus(webStatus);
  });

  calendarRouter.put("/:id", checkAuth, async (req, res) => {
    const webStatus = await calendarRepository.toggleTask(
      req.params.id,
      req.userID
    );
    res.sendStatus(webStatus);
  });

  calendarRouter.delete("/:id", checkAuth, async (req, res) => {
    const status = await calendarRepository.removeTask(
      req.params.id,
      req.userID
    );
    res.sendStatus(status);
  });

  return calendarRouter;
};
module.exports = getCalendarRoutes;
