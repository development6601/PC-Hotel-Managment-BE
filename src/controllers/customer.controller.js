const customerModel = require("../models/customer.model");

async function customerDetail(req,res){
    const {phoneNumber , gender , address , idProofNumber , status} = req.body
    
    // let firstName = req.user.fullName.firstName
    // let lastName = req.user.fullName.lastName 
    
    const customer = await customerModel.create({
        fullName:{
            firstName:req.user.fullName.firstName,
            lastName:req.user.fullName.lastName
        },
        phoneNumber,
        gender,
        address,
        email:req.user.email,
        idProofNumber,       
        
    })

    return res.status(200).json({
        message:"Successfully fill form",
        customer
    })
    
    
}

module.exports = {customerDetail}