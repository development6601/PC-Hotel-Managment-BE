const customerModel = require("../models/customer.model");

async function statusInfo(req,res){
    try {
        const userStatus = await customerModel.find({status:'Active'})

        res.status(200).json({
            message:"Active Customer Detail",
            userStatus : userStatus.length
        })
    } catch (error) {
        console.log(error.message);
        
        
    }
}

module.exports = {statusInfo}