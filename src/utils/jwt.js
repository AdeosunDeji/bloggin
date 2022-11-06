const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secretKey = process.env.JWT_KEY;

async function generateToken(payload, secret = secretKey) {
  const token = await jwt.sign(payload, secret, { expiresIn: "1h"});
  return token;
}

module.exports = generateToken;