const roomModel = require("../models/room.models")

async function createRoom(req,res){
    const {roomNumber,roomType,price,description,status,totalMember} = req.body
    const image = req.file

    const isExistRoomNumber = await roomModel.findOne({roomNumber})

    if(isExistRoomNumber){
        return res.status(400).json({
            message:"Room Number is Already Exist"
        })
    }

    const roomImgPath = image.path

    const room = await roomModel.create({
        roomNumber,
        price,
        description,
        roomType,
        roomImage:roomImgPath,
        status,
        totalMember
    })

    res.status(201).json({
        message:"Room Created Successfully",
        room
    })
}


async function getALLRoom(req,res){
    const room = await roomModel.find()

    res.status(200).json({
        message:{
            room
        }
    })
    
}

async function deleteRoombyId(req,res){
    const {id} = req.params

    const room = await roomModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Deleted Sucessfully"
    })

}

async function updateRoom(req,res){
    const {id} = req.params
    const {roomNumber,roomType,price,description,status,totalMember} = req.body
    const isExistRoomNumber = await roomModel.findOne({roomNumber})
    const updateRoom = {}
    

    if(isExistRoomNumber){
        return res.status(400).json({
            message:"Already Exist RoomNumber"
        })
    }
    
    
    if(roomNumber) updateRoom.roomNumber = roomNumber
    if(roomType) updateRoom.roomType = roomType
    if(price) updateRoom.price = price
    if(description) updateRoom.description = description
    if(status) updateRoom.status = status
    if(totalMember) updateRoom.totalMember = totalMember
    
    if(req.file) {
        const image = req.file
        updateRoom.roomImage = image.path
    }
    const room = await roomModel.findByIdAndUpdate(id,updateRoom,{returnDocument:'after'})

    res.status(200).json({
        message:"Update Successfuly",
        room
    })
}

module.exports = {
    createRoom,
    getALLRoom,
    deleteRoombyId,
    updateRoom,
}