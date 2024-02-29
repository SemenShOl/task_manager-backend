const db = require("../db");
const calendarRepository = {
  async getDays(from, to, userID) {
    try {
      // const result = await db.any(
      //   "SELECT deadline::VARCHAR, SUM(CASE WHEN priority = 1 THEN 1 ELSE 0 END) AS A, SUM(CASE WHEN priority = 2 THEN 1 ELSE 0 END) AS B, SUM(CASE WHEN priority = 3 THEN 1 ELSE 0 END) AS C FROM task  WHERE deadline >= $1 AND deadline <= $2 GROUP BY deadline",
      //   [from, to]
      // );
      const result = await db.query(
        "SELECT deadline::VARCHAR, SUM(CASE WHEN priority = 'low' AND is_completed = 'f' THEN 1 ELSE 0 END) AS low, SUM(CASE WHEN priority = 'medium' AND is_completed = 'f' THEN 1 ELSE 0 END) AS medium, SUM(CASE WHEN priority = 'high' AND is_completed = 'f' THEN 1 ELSE 0 END) AS high FROM task  WHERE deadline >= $1 AND deadline <= $2 AND user_id = $3 GROUP BY deadline",
        [from, to, userID]
      );
      return result.rows;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async getAllTasks(userID) {
    try {
      console.log("userID: ", userID);
      const result = await db.query(
        "SELECT id, user_id, title, description, deadline::VARCHAR, date_of_creation::VARCHAR, is_completed, priority FROM task where user_id = $1",
        [userID]
      );
      return result.rows;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async getTasksbyDeadline(deadline, userID) {
    try {
      // const result = await db.any(
      //   "SELECT id, user_id, title, description, deadline::VARCHAR, date_of_creation::VARCHAR, is_completed, priority FROM task WHERE deadline = $1",
      //   [deadline]
      // );
      const result = await db.query(
        "SELECT id, user_id, title, description, deadline::VARCHAR, date_of_creation::VARCHAR, is_completed, priority FROM task WHERE deadline = $1 AND user_id = $2 ORDER BY is_completed",
        [deadline, userID]
      );
      return result.rows;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },

  async createTask(task, userID) {
    try {
      // await db.none(
      //   "INSERT INTO task (title, description, deadline, date_of_creation, priority, user_id, is_completed) VALUES ($1, $2, $3, NOW()::DATE, $4, $5, FALSE)",
      //   [
      //     task.title,
      //     task.description,
      //     task.deadline,
      //     task.priority,
      //     task.userID,
      //   ]
      // );
      console.log("(create) task: ", task);
      await db.query(
        "INSERT INTO task (title, description, deadline, date_of_creation, priority, user_id, is_completed) VALUES ($1, $2, $3, NOW()::DATE, $4, $5, FALSE)",
        [task.title, task.description, task.deadline, task.priority, userID]
      );
      //TODO where deadline and user_id = ....
      const result = await db.query("select * from task where deadline = $1", [
        task.deadline,
      ]);
      return { tasksWithAdded: result.rows, status: 201 };
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
      return 500;
    }
  },

  async changeTask(taskID, newTask, userID) {
    try {
      // await db.none(
      //   "UPDATE task SET title = $1, description = $2, deadline = $3, priority = $4  WHERE id = $5",
      //   [task.title, task.description, task.deadline, task.priority, id]
      // );
      console.log("(update) task: ", newTask);
      console.log("id: ", taskID);

      await db.query(
        "UPDATE task SET title = $1, description = $2, deadline = $3, priority = $4  WHERE id = $5 AND user_id = $6",
        [
          newTask.title,
          newTask.description,
          newTask.deadline,
          newTask.priority,
          taskID,
          userID,
        ]
      );
      return 200;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
      return 500;
    }
  },

  async removeTask(taskID, userID) {
    try {
      // await db.none("DELETE FROM task WHERE id = $1", [userID]);
      await db.query("DELETE FROM task WHERE id = $1 AND user_id = $2", [
        taskID,
        userID,
      ]);

      return 200;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
      return 500;
    }
  },

  async toggleTask(taskID, userID) {
    try {
      // await db.none(
      //   "UPDATE task SET is_completed = NOT is_completed WHERE id = $1;",
      //   [id]
      // );
      await db.query(
        "UPDATE task SET is_completed = NOT is_completed WHERE id = $1 AND user_id = $2",
        [taskID, userID]
      );

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
