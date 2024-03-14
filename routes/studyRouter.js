const { Router } = require("express");
const studyService = require("../bll/studyService");

const getStudyRoutes = () => {
  const studyRouter = Router({});

  studyRouter.get("/", async (req, res) => {
    console.log(req.body);
    const { activeDate, groupName } = req.body;
    const schedule = await studyService.getScheduleByDay(activeDate, groupName);
    res.json(schedule);
  });

  return studyRouter;
};

module.exports = getStudyRoutes;
