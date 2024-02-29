const express = require("express");
const getTasksRoutes = require("./routes/tasksRouter");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const getAuthRoutes = require("./routes/authRouter");
const getNotesRouter = require("./routes/notesRouter");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
// app.unsubscribe(cookieParser());
app.use(cors());

const tasksRouter = getTasksRoutes();
const authRouter = getAuthRoutes();
const notesRouter = getNotesRouter();
app.use("/calendar", tasksRouter);
app.use("/auth", authRouter);
app.use("/notes", notesRouter);

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Port ${port} is listening...`);
    });
  } catch (error) {
    console.log("Error!");
    console.log(error);
  }
};

start();
module.exports = app;

// INSERT INTO days (date, a_priority) VALUES ('2024-01-27',2) ON CONFLICT(date) DO UPDATE SET a_priority = days.a_priority + 1;
