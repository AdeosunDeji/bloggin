const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, unique: true, lowercase: true, trim: true, maxlength: 50, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
  }, { timestamps: true }
);

module.exports = model("User", userSchema);