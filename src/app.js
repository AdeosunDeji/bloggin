const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const config = require("./config");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const db = require("./config/database");

const auth0Middleware = require("./config/auth0");


const reqLogger = require("./utils/reqLogger");

const app = express();
const port = config.PORT || 1000;

// Add middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(auth0Middleware);
app.use(reqLogger); // request logger

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 15 minutes
  max: 80, // Limit each IP to 80 requests per `window` (here, per 30 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Add rate limit middleware to all requests
app.use(limiter);
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to Bloogin App...");
});

// Global 404 error handler
app.use((req, res) => res.status(404).send({
  status: "error",
  error: "Not found",
  message: "Route not correct, kindly check URL...",
}));

(async () => {
  process.on("warning", (e) => config.logger.warn(e.stack));
  console.log("Waiting for DATABASE Connection...");
  await db.connect();
  app.listen(config.PORT || 4000, async () => {
    console.log(
      `${config.APP_NAME} API listening on ${port || 4000}`
    );
  });
})();

process.on("unhandledRejection", (error) => {
  console.log("FATAL UNEXPECTED UNHANDLED REJECTION!", error.message);
  console.error("\n\n", error, "\n\n");
  //  throw error;
});

module.exports = app;  