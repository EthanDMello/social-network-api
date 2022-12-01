// Require schema and model from mongoose
const mongoose = require("mongoose");

// Construct a new instance of the schema class
const User = new mongoose.Schema({
  // Configure individual properties using Schema Types
  title: { type: String, required: true },
  author: { type: String, required: false },
  // The type of data is set to 'String' and required is set to false, meaning it will accept null values
  publisher: String,
  stockCount: Number,
  price: Number,
  inStock: Boolean,
  // Use built in date method to get current date
  lastAccessed: { type: Date, default: Date.now },
});

module.exports = User;
