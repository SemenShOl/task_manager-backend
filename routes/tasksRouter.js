const Router = require("express");
const tasksRepository = require("../repositories/tasksRepository");
const checkAuth = require("../middlewares/checkAuth");

const getTasksRoutes = () => {
  const tasksRouter = Router({});

  tasksRouter.get("/", checkAuth, async (req, res) => {
    const busyDays = await tasksRepository.getDays(
      req.query.from,
      req.query.to,
      req.userID
    );
    res.json(busyDays);
  });
  tasksRouter.get("/all", checkAuth, async (req, res) => {
    const allTasks = await tasksRepository.getAllTasks(req.userID);
    res.json(allTasks);
  });
  tasksRouter.get("/:deadline", checkAuth, async (req, res) => {
    const tasksByDeadline = await tasksRepository.getTasksbyDeadline(
      req.params.deadline,
      req.userID
    );
    res.json(tasksByDeadline);
  });

  tasksRouter.post("/", checkAuth, async (req, res) => {
    const { tasksWithAdded, status } = await tasksRepository.createTask(
      req.body,
      req.userID
    );
    res.status(status).json(tasksWithAdded);
  });

  tasksRouter.put("/task/:id", checkAuth, async (req, res) => {
    const webStatus = await tasksRepository.changeTask(
      req.params.id,
      req.body,
      req.userID
    );
    res.sendStatus(webStatus);
  });

  tasksRouter.put("/:id", checkAuth, async (req, res) => {
    const webStatus = await tasksRepository.toggleTask(
      req.params.id,
      req.userID
    );
    res.sendStatus(webStatus);
  });

  tasksRouter.delete("/:id", checkAuth, async (req, res) => {
    const status = await tasksRepository.removeTask(req.params.id, req.userID);
    res.sendStatus(status);
  });

  return tasksRouter;
};
module.exports = getTasksRoutes;
