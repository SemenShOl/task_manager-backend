const { Router } = require("express");
const studyService = require("../bll/studyService");
const studyRepository = require("../repositories/studyRepository");

const getStudyRoutes = () => {
  const studyRouter = Router({});

  studyRouter.get("/schedule", async (req, res) => {
    console.log(req.params);
    const { activeDate, groupName } = req.query;
    const schedule = await studyService.getScheduleByDay(activeDate, groupName);
    res.json(schedule);
  });

  studyRouter.get("/groups", async (req, res) => {
    const groups = await studyRepository.getAllStudyGroupsInfo();
    res.json(groups);
  });

  return studyRouter;
};

module.exports = getStudyRoutes;
