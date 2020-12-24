const mongoose = require("mongoose")

const ModerationConfig = new mongoose.Schema({
    case: {
        type: String,
        required: true,
      },
  
      guildID: {
        type: String,
        required: true,
      },
  
      userID: {
        type: String,
        required: true,
      },
  
      issuer: {
        type: String,
        required: true,
      },
  
      appealed: {
        type: Boolean,
        default: false,
      },
      type: {
        type: "string",
        enum: [
          "note",
          "warning",
          "discipline",
          "antispam",
          "reflection",
          "restrictions",
          "kick",
          "ban",
          "discord-ban",
          "investigation",
        ],
        required: true,
        description: "The type of discipline this is",
      },
      rules: {
        type: Array,
      },
  
      reason: {
        type: String,
        maxLength: 1024,
      },
  
      discipline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cases",
      },
})

module.exports = mongoose.model("ModerationConfig", ModerationConfig)