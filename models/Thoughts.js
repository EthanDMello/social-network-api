// Require schema and model from mongoose
const { Schema, model } = require("mongoose");

// Construct a new instance of the schema class
const thoughtSchema = new Schema(
  {
    // Configure individual properties using Schema Types
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // username: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thoughts = model("thoughts", thoughtSchema);

module.exports = Thoughts;
