const pgp = require("pg-promise")();

const db = pgp(
  "postgres://test_db_et5z_user:2dIR0qGJs9GRdNz38ajo0yFbi6RG4Nru@dpg-cmp9i9nqd2ns738psfg0-a.oregon-postgres.render.com/test_db_et5z?ssl=true"
);
module.exports = db;
