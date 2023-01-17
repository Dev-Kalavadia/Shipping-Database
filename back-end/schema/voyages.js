const mongoose = require("mongoose")

const voyageSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    shipName:{
        type: String
    },
    ID: {
        type: Number
    },
    departureDate: {
       type: Date
    },
    depExact: {
        type: String
    },
    departurePlace: {
        type: String
    },
    depCode: {
        type: Number
    },
    depReference:{
        type: String
    },
    depRefLoc: {
        type: String
    },
    arrivalDate: {
        type: Date
    },
    arrExact: {
        type: String
    },
    arrivalPlace:{
        type: String
    },
    arrCode: {
        type: Number
    },
    arrReference: {
        type: String
    },
    arrRefLoc: {
        type: String
    },
    A: {
        type: String
    },
    C: {
        type: String
    },
    I: {
        type: String
    },
    T: {
        type: String
    },
    L: {
        type: String
    },
    IDNO: {
        type: String
    },
})

module.exports = mongoose.model("Voyage", voyageSchema)