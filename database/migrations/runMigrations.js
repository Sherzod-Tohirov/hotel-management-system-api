const fs = require("fs");
const path = require("path");
const pool = require("../../config/db");
const runMigrations = async () => {
  console.log("Running migrations...");

  const files = fs.readdirSync(__dirname);

  for (const file of files) {
    if (file.endsWith(".sql")) {
      const sql = fs.readFileSync(path.join(__dirname, file), "utf8");
      try {
        await pool.query(sql);
        console.log(`Migration ${file} executed successfully`);
      } catch (error) {
        console.error(`Error executing migration ${file}:`, error.message);
      }
    }
  }

  pool.end();
};

runMigrations();
