// pgp = require("pg-promise")();
const express = require("express");
// import pgProm from "pg-promise";
// import express from "express";
const getCalendarRoutes = require("./routes/calendarRouter");
// const pgp = pgProm();
const app = express();
const port = process.env.PORT || 3000;

// const db = pgp(
//   "postgres://test_db_et5z_user:2dIR0qGJs9GRdNz38ajo0yFbi6RG4Nru@dpg-cmp9i9nqd2ns738psfg0-a.oregon-postgres.render.com/test_db_et5z?ssl=true"
// );
const expressMiddleWare = express.json();
app.use(expressMiddleWare);

const calendarRouter = getCalendarRoutes();
app.use("/calendar", calendarRouter);
// app.get("/calendar/:id", async (req, res) => {
//   try {
//     const result = await db.any(
//       "SELECT * FROM task WHERE EXTRACT(MONTH FROM deadline) = $1",
//       [req.params.id]
//     );
//     console.log(result);
//     res.send(result);
//   } catch (error) {
//     console.log("Ошибка!");
//     console.log(error);
//   }
// });

app.listen(port, () => {
  console.log(`Port ${port} is listening...`);
});
