const bookingModel = require("../models/booking.model");
const customerModel = require("../models/customer.model");
const roomModel = require("../models/room.models");


async function adminDashboard(req, res) {

    try {
        const today = new Date();
        
        // ------------: Total Rooms : --------------------------------
        const totalRooms = await roomModel.countDocuments();
        
        // ------------- : Currently Book Room : --------------------------
        const bookedRooms = await bookingModel.countDocuments({
            bookingStatus: { $in: ["confirmed", "checkedIn"] },
            checkInDate: { $lte: today },
            checkOutDate: { $gt: today }
        });
        
        // ----------- : Available Room : ---------------------------------
        const maintenanceRooms = await roomModel.countDocuments({status: "maintenance" });

        const availableRooms = totalRooms - bookedRooms - maintenanceRooms;
       
        // ------------- : Total Booking : --------------------------

        const totalBookings = await bookingModel.countDocuments();
        res.status(200).json({
            totalRooms,
            availableRooms,
            bookedRooms,
            totalBookings,
           
        });
    } catch (error) {
        res.status(500).json({message: error.message});

    }
}

module.exports = {adminDashboard}