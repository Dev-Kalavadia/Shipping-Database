const mongoose = require("mongoose")

const shipSchema = new mongoose.Schema({
    no: {
        type: Number
    },
    ID: {
        type: Number
    },
    name:{
        type: String
    },
    otherNames: [{
        type: String
    }],
    type: {
        type: String
    },
    yearIn: {
        type: Number
    },
    yearOut: {
        type: Number
    },
    last: {
        type: Number
    },
    measurements: {
        type: String
    },
    mes: {
        type: String
    },
})

module.exports = mongoose.model("Ship", shipSchema)