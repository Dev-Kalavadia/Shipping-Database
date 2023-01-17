const mongoose = require("mongoose")

const placeSchema = new mongoose.Schema({
    no: {
        type: Number
    },
    name:{
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
    degr1: {
        type: Number
    },
    min1: {
        type: Number
    },
    long:{
        type: String
    },
    degr2: {
        type: Number
    },
    min2: {
        type: Number
    },
    geoRef: {
        type: String
    },
})

module.exports = mongoose.model("Place", placeSchema)