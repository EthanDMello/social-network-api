// Require schema and model from mongoose
const { Schema, model } = require("mongoose");

const timeFormat = (date) => {
  return Date();
};

// Construct a new instance of the schema class
const thoughtSchema = new Schema(
  {
    // Configure individual properties using Schema Types
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      // set: timeFormat,
    },
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
    // 2022-12-04T20:59:45.559Z"
    // 2022-12-04T21:00:02.516Z
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

const Thoughts = model("thoughts", thoughtSchema);

module.exports = Thoughts;
