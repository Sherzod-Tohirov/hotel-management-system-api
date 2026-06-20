const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hotel_management_system",
  password: "123456",
  port: 5432,
});

pool.connect();

pool.on("connect", () => {
  console.log("Connected to database");
});

pool.on("error", (err) => {
  console.error("Database error:", err);
});

module.exports = pool;
