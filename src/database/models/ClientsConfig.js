const mongoose = require("mongoose")
const ClientsConfig = new mongoose.Schema({

    id: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    blacklisted: {
        type: mongoose.SchemaTypes.Array,
        required: true
    },

    maintenanceMode: {
        type: mongoose.SchemaTypes.Boolean,
        default: false
    },
    
})

module.exports = mongoose.model("ClientsConfig", ClientsConfig)