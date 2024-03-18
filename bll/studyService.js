const studyRepository = require("../repositories/studyRepository");
const axios = require("axios");
const utilites = require("../utilites");
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
  async getSemesterInfo() {
    try {
      const result = await axios.get(`http://orioks.miet.ru/api/v1/schedule`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer aBJ3VZ47cYhZCvVkbIDsgZxJSPOQpSCZ",
          "User-Agent": "task_manager/0.1 GNU/Linux 6.5.0-21-Ubuntu",
        },
      });
      return result.data;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },
  async getScheduleByDay(activeDate, groupName) {
    // const startOfSemester = await axios.get(
    //   `http://orioks.miet.ru/api/v1/schedule`,
    //   {
    //     headers: {
    //       Accept: "application/json",
    //       Authorization: "Bearer aBJ3VZ47cYhZCvVkbIDsgZxJSPOQpSCZ",
    //       "User-Agent": "task_manager/0.1 GNU/Linux 6.5.0-21-Ubuntu",
    //     },
    //   }
    // );

    const semesterInfo = await this.getSemesterInfo();
    console.log("startOfSemester: ", semesterInfo);
    const { typeOfWeek, numberOfDayInWeek } = utilites.getTypeOfWeekByDate(
      semesterInfo.semester_start,
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
        startOfLesson: utilites.getTimeOfLessonStart(
          dayInfo.schedule_info.class
        ),
      }))
      .sort((a, b) => a.class - b.class);
  },

  async getScheduleByPeriod(groupName, from) {
    const scheduleGroupInfoOfAllDays =
      await studyRepository.getSemesterScheduleByGroup(groupName);
    const schedule = scheduleGroupInfoOfAllDays
      .map((day) => day.schedule_info)
      .sort((a, b) => `${a.week}${a.day}`.localeCompare(`${b.week}${b.day}`));

    const semesterInfo = await this.getSemesterInfo();

    let { typeOfWeek } = utilites.getTypeOfWeekByDate(
      semesterInfo.semester_start,
      from
    );
    const scheduleGlobal = [];
    for (let i = 1; i <= 6; i++) {
      typeOfWeek = (i + 1) % 4;
      console.log("typeOfWeek: ", typeOfWeek);
      scheduleGlobal.push(schedule.filter((day) => day.week === typeOfWeek));
    }
    const sch = [
      new Set(),
      new Set(),
      new Set(),
      new Set(),
      new Set(),
      new Set(),
    ];
    scheduleGlobal.forEach((week, index) => {
      week.forEach((day) => {
        sch[index].add(day.day);
      });
    });

    console.log("sch: ", sch);
    const respSch = new Array(7 * 6).fill(false);
    respSch.forEach((v, i) => {
      sch.forEach((week, index) => {
        week.forEach((day) => {
          if (day + index * 7 === i) {
            respSch[i] = true;
          }
        });
      });
    });

    return respSch;
  },
};
module.exports = studyService;
