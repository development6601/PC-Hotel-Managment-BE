const express = require('express')
const { default: mongoose } = require('mongoose')

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth",
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "room",
        },
        checkInDate: {
            type: Date,
        },
        checkOutDate: {
            type: Date,
        },
        guestCount: {
            type: String,
        },
        TotalDay: {
            type: String,
        },
        TotalAMount: {
            type: String,
        },
        bookingStatus: {
            type: String,
            enum: ["confirmed", "cancelled", "checkedIn", "checkedOut"],
            default: "confirmed",
        },
    },
    { timestamps: true },
);


const bookingModel = mongoose.model('BookDetail', bookingSchema)

module.exports = bookingModel