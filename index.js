const express = require("express");
const getCalendarRoutes = require("./routes/calendarRouter");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3001;

const expressMiddleWare = express.json();
app.use(expressMiddleWare);
app.use(cors());

const calendarRouter = getCalendarRoutes();
app.use("/calendar", calendarRouter);

app.delete("/__test__", async (req, res) => {
  db.none("DELETE FROM task", []);
  res.sendStatus(204);
});
app.listen(port, () => {
  console.log(`Port ${port} is listening...`);
});

module.exports = app;

// INSERT INTO days (date, a_priority) VALUES ('2024-01-27',2) ON CONFLICT(date) DO UPDATE SET a_priority = days.a_priority + 1;
