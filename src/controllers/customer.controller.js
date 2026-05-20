const customerModel = require("../models/customer.model");

async function customerDetail(req, res) {
    const { phoneNumber, gender, address, idProofNumber, status } = req.body

    const existEmail = await customerModel.findOne({email:req.user.email})

    if(existEmail){
        return res.status(400).json({
            message:"ALready exist"
        })
    }

    const customer = await customerModel.create({
        userId: req.user._id,
        fullName: {
            firstName: req.user.fullName.firstName,
            lastName: req.user.fullName.lastName
        },
        phoneNumber,
        gender,
        address,
        email: req.user.email,
        idProofNumber,

    })
    return res.status(200).json({
        message: "Successfully fill form",
        customer
    })
}


module.exports = { customerDetail }