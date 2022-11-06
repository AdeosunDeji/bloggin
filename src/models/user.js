const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, unique: true, lowercase: true, trim: true, maxlength: 50 },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    phone: { type: String },
  }, { timestamps: true }
);

module.exports = model("User", userSchema);