const mongoose = require("mongoose")

const DisciplineConfig = new mongoose.Schema({
  cases: {
    type: ObjectId,
    ref: "Moderation",
    required: true,
  },

  action: {
    type: String,
    enum: [
      "Violation points",
      "Channel ban",
      "Role added",
      "Role removed",
      "Cannot use voice channels",
      "Cannot use staff command",
      "Cannot report members",
      "Cannot use support command",
      "Cannot use conflict command",
      "Task",
      "Mute",
      "Ban",
      "Note",
      "Other discipline",
    ],
    required: true,
  },
  description: {
    type: String,
    maxLength: 1024,
  },

  status: {
    type: String,
    default: "active",
    enum: ["active", "appealed", "completed"],
  },
})

module.exports = mongoose.model("DisciplineConfig", DisciplineConfig)