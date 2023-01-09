const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("../config");

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});
const parser = multer({
  storage,
  limits: {
    fileSize: 5120 * 1024 * 1024,
  },
});

module.exports = parser;
