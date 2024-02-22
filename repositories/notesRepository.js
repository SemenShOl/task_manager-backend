const db = require("../db");
const notesRepository = {
  async getAllNotes(userID) {
    try {
      const result = await db.query("SELECT * FROM note WHERE user_id = $1", [
        userID,
      ]);
      return result.rows;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },
  async getNoteByID(noteID, userID) {
    try {
      const result = await db.query(
        "SELECT * FROM note WHERE id = $1 AND user_id = $2",
        [noteID, userID]
      );
      return result.rows[0];
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
    }
  },
  async createNote(note, userID) {
    try {
      console.log("(create) note: ", note);
      await db.query(
        "INSERT INTO note (title, text, user_id) VALUES ($1, $2, $3)",
        [note.title, note.text, userID]
      );
      const result = await db.query("select * from note");
      return { notesWithNew: result.rows, status: 201 };
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
      return 500;
    }
  },

  async changeNote(noteID, newNote, userID) {
    try {
      console.log("noteID: ", noteID);
      console.log("userID: ", userID);

      console.log("(update) note: ", newNote);
      await db.query(
        "UPDATE note SET title = $1, text = $2  WHERE id = $3 AND user_id = $4",
        [newNote.title, newNote.text, noteID, userID]
      );

      return 200;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
      return 500;
    }
  },

  async removeNote(noteID, userID) {
    try {
      await db.query("DELETE FROM note WHERE id = $1 AND user_id = $2", [
        noteID,
        userID,
      ]);

      return 200;
    } catch (error) {
      console.log("Ошибка!");
      console.log(error);
      return 500;
    }
  },
};

module.exports = notesRepository;

// SELECT deadline, SUM(CASE WHEN priority = 'A' THEN 1 ELSE 0 END) AS A, SUM(CASE WHEN priority = 'B' THEN 1 ELSE 0 END) AS B, SUM(CASE WHEN priority = 'C' THEN 1 ELSE 0 END) AS C FROM task GROUP BY deadline;
// INSERT INTO task (title,description,deadline, date_of_creation,user_id,status,priority) VALUES ('fsdfsd','sdfafadfdaf','2024-02-08',NOW()::DATE, 1, false, 1);
