const moment = require("moment")
const bookingModel = require("../models/booking.model")
const roomModel = require("../models/room.models")
const customerModel = require("../models/customer.model")

async function createBooking(req,res){
    const {id} = req.params
    const customer = req.user
    const {checkInDate,checkOutDate,guestCount} = req.body 
    const room = await roomModel.findById(id)
    
    
    let custo = await customerModel.findOne({email:customer.email})
    
    

    if(!custo){
        return res.status(401).json({
            message:"Detail is Required"
        })
    }
    
    
    
   
    
   

    if(guestCount>room.totalMember){
        return res.status(400).json({
            message:`you only Selected less than ${room.totalMember} member`
        })
    }    
    
    let checkIn = new Date(checkInDate)
    let checkOut = new Date(checkOutDate)

    let daydiff = Math.abs(checkIn - checkOut)
    const Days = daydiff / (1000 * 60 * 60 * 24);

    if(checkIn>checkOut){
        return res.status(400).json({
            message:"Invalid Date"
        })
    }

    let Amount = room.price * Days

    const BookingDetail = await bookingModel.create({
        customerId:customer._id,
        roomId:id,
        checkInDate,
        checkOutDate,
        guestCount,
        TotalDay:Days,
        TotalAMount:Amount
    })

    room.status = 'active',
    custo.status = 'active'

    custo.save()
    room.save()


    



    res.status(201).json({
        message:"Booking Suceessfully",
        BookingDetail
    })


}


async function cancelBooking(req,res){
    let {id} = req.params
    let customer = req.user

    let room = await roomModel.findById(id)
    let custo = await customerModel.findOne({email:customer.email})


    room.status = 'inActive'
    custo.status = 'inActive'
    
    room.save()
    custo.save()

    res.status(200).json({
        message:"Booking Cancel Successfully"
    })
}

async function deleteBooking(req,res){

    const {id} = req.params
    const bookingDetail = await bookingModel.findById(id)

    const customer = await customerModel.findOne({userId:bookingDetail.customerId})

    const room = await roomModel.findOne({_id:bookingDetail.roomId})

    customer.status = 'inActive'
    room.status = 'inActive'

    customer.save()
    room.save()

    const deletedBooking = await bookingModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Deleted Suceessfully"
    })
    
    
    
    
    
    
    

    
    
    

}


module.exports = {
    createBooking,
    cancelBooking,
    deleteBooking
}