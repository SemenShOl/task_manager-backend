const Router = require("express");
const calendarService = require("../bll/calendarService");
const getCalendarRoutes = () => {
  const calendarRouter = Router({});

  calendarRouter.get("/", async (req, res) => {
    const result = await calendarService.getDays(req.query.from, req.query.to);
    res.json(result);
  });
  calendarRouter.get("/:deadline", async (req, res) => {
    const result = await calendarService.getTasks(req.params.deadline);
    res.json(result);
  });

  calendarRouter.post("/", async (req, res) => {
    const webStatus = await calendarService.createTask(req.body);
    res.sendStatus(webStatus);
  });

  calendarRouter.put("/task/:id", async (req, res) => {
    const webStatus = await calendarService.changeTask(req.params.id, req.body);
    res.sendStatus(webStatus);
  });

  calendarRouter.put("/:id", async (req, res) => {
    const webStatus = await calendarService.toggleTask(req.params.id);
    res.sendStatus(webStatus);
  });

  calendarRouter.delete("/", async (req, res) => {
    const tasksWithoutRemoved = await calendarService.removeTask(
      req.query.id,
      req.query.deadline
    );
    res.status(200).json(tasksWithoutRemoved);
  });

  return calendarRouter;
};
module.exports = getCalendarRoutes;
