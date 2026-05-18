const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    fullName:{
        firstName:{type:String},
        lastName:{type:String}
    },
    email:{type:String},
    password:{type:String},
    role:{type:String,enum:['user','Admin'],default:'user'}
},{timestamps:true})

const authModel = mongoose.model('auth',authSchema)

module.exports = authModel