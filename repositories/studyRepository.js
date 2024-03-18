const db = require("../db");
const studyRepository = {
  startOfSemester: "",
  async createStudyGroup(groupName, groupID) {
    try {
      await db.query("INSERT INTO study_group (name, id) VALUES ($1, $2)", [
        groupName,
        groupID,
      ]);
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async deleteAllStudyGroups() {
    try {
      await db.query("delete from study_group");
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async getStudyGroupIDByName(name) {
    try {
      const result = await db.query(
        "select id from study_group where name = $1",
        [name]
      );
      return result.rows[0];
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async getAllStudyGroupsInfo() {
    try {
      const result = await db.query("select * from study_group");
      return result.rows;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async createSemesterScheduleByGroup(groupName, scheduleInfo) {
    try {
      await db.query(
        "INSERT INTO semester_schedule (group_name, schedule_info) VALUES ($1, $2)",
        [groupName, scheduleInfo]
      );
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async getSemesterScheduleByGroup(groupName) {
    try {
      const result = await db.query(
        "select * from semester_schedule where group_name = $1",
        [groupName]
      );
      return result.rows;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async deleteAllSemesterSchedule() {
    try {
      await db.query("delete from semester_schedule");
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async createLessonsTime(lessonNumber, startLesson, endLesson) {
    try {
      await db.query(
        "INSERT INTO lessons_time (number, start_lesson, end_lesson) VALUES ($1, $2, $3)",
        [lessonNumber, startLesson, endLesson]
      );
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async deleteLessonsTime() {
    try {
      await db.query("delete from lessons_time");
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },
};

module.exports = studyRepository;
