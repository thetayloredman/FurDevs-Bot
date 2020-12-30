const mongoose = require("mongoose")
const GuildConfig = new mongoose.Schema({

  /*
    Guild Settings
  */
    guildID:{
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true 
    },
    prefix:{
        type: mongoose.SchemaTypes.String,
        required: true, 
        default:">"
    },

    disabledCommands: {
        type: mongoose.SchemaTypes.Array,
        required: true, 
    },

    bankerRole: {
      type: mongoose.SchemaTypes.String,
      default: null,
    },

    verificationRole: {
      type: mongoose.SchemaTypes.String,
      default: null,
    },

    verificationLogging: {
      type: mongoose.SchemaTypes.String,
      default: null,
    },
    
    bumpingChannel: {
      type: mongoose.SchemaTypes.String,
      default: null,
    },
    staffMembers: {
      type: Array,
      default: null,
    },
    welcomeMessage:{
      type: String,
      default: null
    },


  
    /*
      FEATURES
    */
  
   reputationSystem: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },     
  
})

module.exports = mongoose.model("GuildConfig", GuildConfig)