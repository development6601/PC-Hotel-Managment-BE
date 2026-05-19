const authModel = require("../models/auth.models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function userRegister(req, res) {
    try {
        const { email, password, fullName: { firstName, lastName }, role } = req.body

        const isExistEmail = await authModel.findOne({ email })

        if (isExistEmail) {
            return res.status(401).json({
                message: "Already Exist Email"
            })
        }


        const user = await authModel.create({
            fullName: {
                firstName,
                lastName
            },
            email,
            role,
            password: await bcrypt.hash(password, 10)
        })

        res.status(200).json({
            message: "Register Successfully",
            user
        })

    } catch (error) {
        console.log(error);
    }
}

async function userLogin(req, res) {
    const { email, password } = req.body
    const isUser = await authModel.findOne({ email })
    if (!isUser) {
        return res.status(401).json({
            message: "Invalid email"
        })
    }
    const isPassword = await bcrypt.compare(password, isUser.password)
    if (!isPassword) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    let token = jwt.sign({ id: isUser._id }, process.env.jWT_secret)
    res.cookie('token', token)
    res.status(202).json({
        message: "Login Successfully",
        token
    })

}

async function userLogOut(req, res) {
    res.clearCookie('token')
    return res.status(200).json({
        message: "Log-out Successfully"
    })
}

async function forgetPassword(req, res) {
    const { email, newPassword } = req.body
    const isUser = await authModel.findOne({ email })

    if (!isUser) {
        return res.status(401).json({
            message: "Invalid email"
        })
    }





    isUser.password = await bcrypt.hash(newPassword, 10)
    isUser.save()

    res.status(200).json({
        message: "Reset password Successfully"
    })
}

async function uploadImage(req, res) {
    const image = req.file

    const id = req.user._id


    const user = await authModel.findById(id)

    user.profileImg = image.path
    user.save()

    res.status(200).json({
        message: "Profile Image Update"
    })

}


module.exports = { userRegister, userLogin, userLogOut, forgetPassword, uploadImage }