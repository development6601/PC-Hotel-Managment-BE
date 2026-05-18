const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'auth'
    },
    fullName:{
        firstName:{type:String},
        lastName:{type:String}
    },
    phoneNumber:{
        type:String,
    },
    gender:{
        type:String,
        enum:['male','female','other'],
        default:'male'
    },
    email:{type:String},
    address:{
        type:String
    },
    idProofNumber:{
        type:String
    },
    status:{
        type:String,
        enum:['Active','inActive'],
        default:'inActive'
    }


})

const customerModel = mongoose.model('customer',customerSchema)

module.exports = customerModel