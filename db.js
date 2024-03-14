const pgp = require("pg-promise")();

// const db = pgp(
//   "postgres://test_db_et5z_user:2dIR0qGJs9GRdNz38ajo0yFbi6RG4Nru@dpg-cmp9i9nqd2ns738psfg0-a.oregon-postgres.render.com/test_db_et5z?ssl=true"
// );

// const db = pgp("postgres://localhost:5432/postgres");

const Pool = require("pg").Pool;

// const db = new Pool({
//   user: "postgres",
//   password: "12345",
//   host: "localhost",
//   // post: 5432,
//   port: 5432,
//   database: "postgres",
// });
const db = new Pool({
  user: "semyon",
  password: "12345",
  host: "localhost",
  port: 5432,
  database: "taskdb",
});
module.exports = db;
