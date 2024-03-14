const studyRepository = require("../repositories/studyRepository");
const axios = require("axios");
const getTimeOfLessonStart = require("../utilites");
const studyService = {
  async updateStudyGroupInfoFromOrioks() {
    const groupsInfo = await axios.get(
      "http://orioks.miet.ru/api/v1/schedule/groups",
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer aBJ3VZ47cYhZCvVkbIDsgZxJSPOQpSCZ",
          "User-Agent": "task_managerrer/0.1 GNU/Linux 6.5.0-21-Ubuntu",
        },
      }
    );
    studyRepository.deleteAllStudyGroups();
    groupsInfo.data.forEach((groupInfo) => {
      const name = groupInfo.name.split(" ")[0];
      const groupID = groupInfo.id;
      studyRepository.createStudyGroup(name, groupID);
    });
  },

  async updateCurrentScheduleFromOrioks() {
    studyRepository.deleteAllSemesterSchedule();
    const groupsInfo = await studyRepository.getAllStudyGroupsInfo();
    groupsInfo.forEach(async (groupInfo) => {
      const scheduleInfo = await axios.get(
        `http://orioks.miet.ru/api/v1/schedule/groups/${groupInfo.id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer aBJ3VZ47cYhZCvVkbIDsgZxJSPOQpSCZ",
            "User-Agent": "task_managerrer/0.1 GNU/Linux 6.5.0-21-Ubuntu",
          },
        }
      );
      scheduleInfo.data.forEach((dayInfo) => {
        studyRepository.createSemesterScheduleByGroup(groupInfo.name, dayInfo);
      });
    });
  },

  async updateCurrentLessonsTimeFromOrioks() {
    studyRepository.deleteLessonsTime();
    const lessonsTime = await axios.get(
      `http://orioks.miet.ru/api/v1/schedule/timetable`,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer aBJ3VZ47cYhZCvVkbIDsgZxJSPOQpSCZ",
          "User-Agent": "task_managerrer/0.1 GNU/Linux 6.5.0-21-Ubuntu",
        },
      }
    );

    for (let lessonNumber of Object.keys(lessonsTime.data)) {
      studyRepository.createLessonsTime(
        lessonNumber,
        lessonsTime.data[lessonNumber][0],
        lessonsTime.data[lessonNumber][1]
      );
    }
  },

  async getScheduleByDay(activeDate, groupName) {
    const startOfSemester = await axios.get(
      `http://orioks.miet.ru/api/v1/schedule`,
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer aBJ3VZ47cYhZCvVkbIDsgZxJSPOQpSCZ",
          "User-Agent": "task_managerrer/0.1 GNU/Linux 6.5.0-21-Ubuntu",
        },
      }
    );
    console.log("startOfSemester: ", startOfSemester.data);
    const { typeOfWeek, numberOfDayInWeek } = getTypeOfWeekByDate(
      startOfSemester.data.semester_start,
      activeDate
    );
    const scheduleGroupInfoOfAllDays =
      await studyRepository.getSemesterScheduleByGroup(groupName);

    console.log(typeOfWeek, numberOfDayInWeek);
    const schedule = scheduleGroupInfoOfAllDays.filter((dayInfo) => {
      if (
        dayInfo.schedule_info.week === typeOfWeek &&
        dayInfo.schedule_info.day === numberOfDayInWeek
      ) {
        return true;
      }
    });
    return schedule
      .map((dayInfo) => ({
        ...dayInfo.schedule_info,
        startOfLesson: getTimeOfLessonStart(dayInfo.schedule_info.class),
      }))
      .sort((a, b) => a.class - b.class);
  },
};
module.exports = studyService;

function getTypeOfWeekByDate(startOfSemesterString, activeDate) {
  startOfSemester = new Date(startOfSemesterString);

  const thisDate = new Date(activeDate);
  const timeDelta = (thisDate - startOfSemester) / (1000 * 60 * 60 * 24);
  const currentWeek = Math.floor(timeDelta / 7) + 1;
  n = (currentWeek - 1) % 4;
  return {
    typeOfWeek: n,
    numberOfDayInWeek: (thisDate.getDay() + 6) % 7,
  };
}
