const { isEmpty } = require("lodash");
const logger = require("pino");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  logger: logger(),
  PORT: process.env.PORT,
  APP_NAME: process.env.APP_NAME,
  MONGO_URL: process.env.MONGO_URL,
  JWT_KEY: process.env.JWT_KEY,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  CALLBACK_URL: process.env.CALLBACK_URL,
  SECRET: process.env.SECRET,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
};

const absentConfig = Object.entries(config)
  .map(([key, value]) => [key, !!value])
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (!isEmpty(absentConfig)) {
  throw new Error(`Missing Config: ${absentConfig.join(", ")}`);
}

module.exports = config;