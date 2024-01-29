const db = require("../db");
const calendarRepository = {
  async getDays(from, to) {
    try {
      const result = await db.any(
        "SELECT deadline::VARCHAR, SUM(CASE WHEN priority = 1 THEN 1 ELSE 0 END) AS A, SUM(CASE WHEN priority = 2 THEN 1 ELSE 0 END) AS B, SUM(CASE WHEN priority = 3 THEN 1 ELSE 0 END) AS C FROM task  WHERE deadline >= $1 AND deadline <= $2 GROUP BY deadline",
        [from, to]
      );
      return result;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async getTasksbyDeadline(deadline) {
    try {
      const result = await db.any(
        "SELECT id, user_id, title, description, deadline::VARCHAR, date_of_creation::VARCHAR, status, priority FROM task WHERE deadline = $1",
        [deadline]
      );
      console.log("result from bd: ", result);
      return result;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async createTask(task) {
    try {
      await db.none(
        "INSERT INTO task (title, description, deadline, date_of_creation, priority, user_id, status) VALUES ($1, $2, $3, NOW()::DATE, $4, $5, TRUE)",
        [
          task.title,
          task.description,
          task.deadline,
          task.priority,
          task.userID,
        ]
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
      await db.none(
        "UPDATE task SET title = $1, description = $2, deadline = $3, priority = $4  WHERE id = $5",
        [task.title, task.description, task.deadline, task.priority, id]
      );
      return 200;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
      return 500;
    }
  },

  async removeTask(id) {
    try {
      await db.none("DELETE FROM task WHERE id = $1;", [id]);
      return 200;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
      return 500;
    }
  },

  async toggleTask(id) {
    try {
      await db.none("UPDATE task SET status = NOT status WHERE id = $1;", [id]);
      return 200;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
      return 500;
    }
  },
};

module.exports = calendarRepository;

// SELECT deadline, SUM(CASE WHEN priority = 'A' THEN 1 ELSE 0 END) AS A, SUM(CASE WHEN priority = 'B' THEN 1 ELSE 0 END) AS B, SUM(CASE WHEN priority = 'C' THEN 1 ELSE 0 END) AS C FROM task GROUP BY deadline;
// INSERT INTO task (title,description,deadline, date_of_creation,user_id,status,priority) VALUES ('fsdfsd','sdfafadfdaf','2024-02-08',NOW()::DATE, 1, false, 1);
