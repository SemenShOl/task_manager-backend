const { Router } = require("express");
const studyService = require("../bll/studyService");
const studyRepository = require("../repositories/studyRepository");
const checkAuth = require("../middlewares/checkAuth");

const getStudyRoutes = () => {
  const studyRouter = Router({});

  studyRouter.get("/schedule", checkAuth, async (req, res) => {
    const { activeDate, groupName } = req.query;
    const schedule = await studyService.getScheduleByDay(activeDate, groupName);
    res.json(schedule);
  });
  // studyRouter.get("/schedule/alll", checkAuth, async (req, res) => {
  //   const { groupName } = req.query;
  //   const { from, to } = req.body;
  //   const schedule = await studyRepository.getSemesterScheduleByGroup(
  //     groupName
  //   );
  //   const responseSchedule = schedule
  //     .map((day) => day.schedule_info)
  //     .sort((a, b) => `${a.week}${a.day}`.localeCompare(`${b.week}${b.day}`));
  //   res.json(responseSchedule);
  // });
  studyRouter.get("/schedule/all", checkAuth, async (req, res) => {
    const { groupName, from } = req.query;
    const schedule = await studyService.getScheduleByPeriod(groupName, from);

    res.json(schedule);
  });

  studyRouter.get("/groups", checkAuth, async (req, res) => {
    const groups = await studyRepository.getAllStudyGroupsInfo();
    res.json(groups);
  });

  return studyRouter;
};

module.exports = getStudyRoutes;
