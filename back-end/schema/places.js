const mongoose = require("mongoose")

const placeSchema = new mongoose.Schema({
    no: {
        type: Number
    },
    Name:{
        type: String
    },
    modernName: {
        type: String
    },
    code: {
        type: Number
    },
    lat:{
        type: String
    },
    Degr1: {
        type: Number
    },
    Min1: {
        type: Number
    },
    long:{
        type: String
    },
    Degr2: {
        type: Number
    },
    Min2: {
        type: Number
    },
    geoRef: {
        type: String
    },
})

module.exports = mongoose.model("Place", placeSchema)