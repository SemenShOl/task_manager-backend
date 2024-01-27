const db = require("../db");
const calendarRepository = {
  async getDays(month, year) {
    try {
      const result = await db.any(
        "SELECT * FROM days WHERE EXTRACT(MONTH FROM date)  = $1 AND EXTRACT(YEAR FROM date) = $2",
        [month, year]
      );
      //   console.log(result);
      return result;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async getTasks(deadline) {
    try {
      const result = await db.any("SELECT * FROM task WHERE deadline = $1", [
        deadline,
      ]);
      return result;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },
  async createTask(task) {
    try {
      await db.none(
        "INSERT INTO task (title, description, deadline, date_of_creation, user_id, status) VALUES ($1, $2, $3, NOW()::DATE, $4, TRUE)",
        [task.title, task.description, task.deadline, task.userID]
      );
      return 201;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
      return 500;
    }
  },
  async changeTask(id, task) {
    try {
      const result = await db.one(
        "UPDATE task SET title = $1, description = $2, deadline = $3,  WHERE id = $4",
        [task.title, task.description, task.deadline, id]
      );
      return result;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async removeTask(id) {
    try {
      const result = await db.one("DELETE FROM task WHERE id = $1;", [id]);
      return result;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async toggleTask(id) {
    try {
      const result = await db.one(
        "UPDATE task SET status = NOT status WHERE id = $1;",
        [id]
      );
      return result;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },
};

module.exports = calendarRepository;
