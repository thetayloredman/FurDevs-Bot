const mongoose = require("mongoose")

const AntiRaidConfig = new mongoose.Schema({
    guildID: {
        type: String,
        required: true,
    },

    score: {
        type: Number,
        min: 0,
        default: 0,
    },

    welcomeGate: {
        type: Boolean,
        default: false
    },

    inviteWipe: {
        type: Boolean,
        default: false
    },

    lockdown: {
        type: Boolean,
        default: false
    },

    indefiniteMute: {
        type: Boolean,
        default: false
    },

    phoneVerificationThreshold: {
        type: Number,
        default: 0,
        min: 0,
    },

    welcomeGateThreshold: {
        type: Number,
        default: 0,
        min: 0,
    },

    inviteWipeThreshold: {
        type: Number,
        default: 0,
        min: 0,
    },

    lockdownThreshold: {
        type: Number,
        default: 0,
        min: 0,
    },

    indefiniteMuteThreshold: {
        type: Number,
        default: 0,
        min: 0,
    },

    decay: {
        type: Number,
        default: 1,
        min: 0,
    },

    newMemberScore: {
        type: Number,
        default: 0,
        min: 0,
    },
    warnScore: {
        type: Number,
        default: 0,
        min: 0,
    },
    muteScore: {
        type: Number,
        default: 0,
        min: 0,
    },
    banScore: {
        type: Number,
        default: 0,
        min: 0,
    },
    antispamScore: {
        type: Number,
        default: 0,
        min: 0,
    }


})

module.exports = mongoose.model("AntiRaidConfig", AntiRaidConfig)