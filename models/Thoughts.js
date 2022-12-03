// Require schema and model from mongoose
const { Schema, model } = require("mongoose");

// Construct a new instance of the schema class
const thoughtSchema = new Schema(
  {
    // Configure individual properties using Schema Types
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
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
