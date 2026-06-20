const fs = require("fs");
const path = require("path");
const pool = require("../../config/db");

const runSeeds = async () => {
  console.log("Running seeds...");

  const seedFiles = fs.readdirSync(__dirname);
  for (const file of seedFiles) {
    if (file.endsWith(".sql")) {
      const sql = fs.readFileSync(path.join(__dirname, file), "utf8");
      await pool.query(sql);
      console.log(`Seeded ${file}`);
    }
  }

  pool.end();
};

runSeeds();
