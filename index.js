const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/error");
const reservationsRouter = require("./routes/reservations.route");

dotenv.config();

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/api/v1/reservations", reservationsRouter);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
