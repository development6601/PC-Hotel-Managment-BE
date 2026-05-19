const express = require('express')
const { default: mongoose } = require('mongoose')

const bookingSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customer'
    },
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'room'
    },
    checkInDate:{
        type:Date
    },
    checkOutDate:{
        type:Date
    },
    guestCount:{
        type:String
    },
    TotalDay:{
        type:String
    },
    TotalAMount:{
        type:String
    },
    BookStatus:{
        type:String,
        enum:['completed','Cancelled'],
        default:'completed'
    }
},{timestamps:true})

const bookingModel = mongoose.model('BookDetail',bookingSchema)

module.exports = bookingModel