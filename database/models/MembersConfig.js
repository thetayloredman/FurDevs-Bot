const mongoose = require("mongoose")
const moment = require("moment-timezone")

const MembersConfig = new mongoose.Schema({
    guildID:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    userID:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    roles: {
        type: mongoose.SchemaTypes.Array,
      },

  
      /*
        CHANNELS
        NOTE: Update commands/channel when you change these attributes!
        */

  
      XP: {
        type: mongoose.SchemaTypes.Number,
      },
  
      coins: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
      },

      level: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
      }
})

module.exports = mongoose.model("MembersConfig", MembersConfig)