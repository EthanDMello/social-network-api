// Require schema and model from mongoose
const { Schema, model } = require("mongoose");

// Construct a new instance of the schema class
const userSchema = new Schema(
  {
    // Configure individual properties using Schema Types
    username: { type: String, unique: true, required: true, trim: true },
    // email: { type: String, unique: true, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model("user", userSchema);

module.exports = User;
