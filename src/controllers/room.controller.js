const roomModel = require("../models/room.models")

async function createRoom(req, res) {
    try {
        const { role } = req.user
        if (role !== 'Admin') {
            return res.status(400).json({
                message: "Only Admin Can Changes",
            })
        }
        const { roomNumber, roomType, price, description, status, totalMember } = req.body
        const image = req.file

        const isExistRoomNumber = await roomModel.findOne({ roomNumber })
        if (isExistRoomNumber) {
            return res.status(400).json({
                message: "Room Number is Already Exist"
            })
        }
        const roomImgPath = image.path
        const room = await roomModel.create({
            roomNumber,
            price,
            description,
            roomType,
            roomImage: roomImgPath,
            status,
            totalMember
        })
        res.status(201).json({
            message: "Room Created Successfully",
            room
        })
    } catch (error) {
        console.log(error.message);

    }
}


async function getALLRoom(req, res) {
    try {

        const room = await roomModel.find()

        res.status(200).json({
            room
        })
    } catch (error) {
        console.log(error.message);


    }

}

async function deleteRoombyId(req, res) {
    try {
        const { role } = req.user
        if (role !== 'Admin') {
            return res.status(400).json({
                message: "Only Admin Can Changes",
            })
        }
        const { id } = req.params
        const room = await roomModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Deleted Sucessfully"
        })
    } catch (error) {
        console.log(error.message);


    }
}

async function updateRoom(req, res) {
    try {
        const { role } = req.user
        if (role !== 'Admin') {
            return res.status(400).json({
                message: "Only Admin Can Changes",
            })
        }
        const { id } = req.params

        const { roomNumber, roomType, price, description, status, totalMember } = req.body
        const isExistRoomNumber = await roomModel.findOne({ roomNumber })
        const updateRoom = {}
        if (isExistRoomNumber) {
            return res.status(400).json({
                message: "Already Exist RoomNumber"
            })
        }
        if (roomNumber) updateRoom.roomNumber = roomNumber
        if (roomType) updateRoom.roomType = roomType
        if (price) updateRoom.price = price
        if (description) updateRoom.description = description
        if (status) updateRoom.status = status
        if (totalMember) updateRoom.totalMember = totalMember

        if (req.file) {
            const image = req.file
            updateRoom.roomImage = image.path
        }
        const room = await roomModel.findByIdAndUpdate(id, updateRoom, { returnDocument: 'after' })

        res.status(200).json({
            message: "Update Successfuly",
            room
        })
    } catch (error) {
        console.log(error.message);


    }
}

async function roomIsAvailable(req, res) {
    try {
        const { role } = req.user

        if (role !== 'Admin') {
            return res.status(400).json({
                message: "Only Admin Can Access this"
            })
        }
        const { checkInDate, checkOutDate, guestcount } = req.body

        const checkIn = new Date(checkInDate);


        checkIn.setDate(checkIn.getDate() + 1);

        const checkOut = new Date(checkOutDate);
        checkOut.setDate(checkOut.getDate() + 1);

        if (checkIn >= checkOut) {
            return res.status(400).json({
                message: "Invalid Date",
            });
        }
        else {
            let guest = Number(guestcount) % 4
            let roomDetail = await roomModel.find({ status: 'available' })
            let room = roomDetail.filter(data => data.totalMember >= Number(guest))

            res.status(200).json({
                message: "fetch Successfully",
                room
            })
        }


    } catch (error) {
        console.log(error.message);


    }
}

module.exports = {
    createRoom,
    getALLRoom,
    deleteRoombyId,
    updateRoom,
    roomIsAvailable
}