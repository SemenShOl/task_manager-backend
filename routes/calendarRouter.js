const Router = require("express");
const calendarService = require("../bll/calendarService");
const getCalendarRoutes = () => {
  const calendarRouter = Router({});

  calendarRouter.get("/", async (req, res) => {
    const result = await calendarService.getDays(
      req.query.month,
      req.query.year
    );
    res.send(result);
  });
  calendarRouter.get("/:deadline", async (req, res) => {
    const result = await calendarService.getTasks(req.params.deadline);
    res.send(result);
  });

  calendarRouter.post("/", async (req, res) => {
    const webStatus = await calendarService.createTask(req.body);
    res.sendStatus(webStatus);
  });
  return calendarRouter;
};
module.exports = getCalendarRoutes;
