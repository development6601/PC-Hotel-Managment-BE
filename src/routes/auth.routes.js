const express = require('express')
const { userRegister, userLogin, userLogOut, forgetPassword, uploadImage } = require('../controllers/auth.controller')
// const { validationRegister, loginRegister } = require('../validation/auth.validation')
const multer = require('multer')
const path = require('path')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${path.basename(file.originalname, ext)}-${Date.now()}${ext}`;
        cb(null, uniqueName);
    }
})

const upload = multer({ storage: storage })


router.post('/register', userRegister)

router.post('/login', userLogin)

router.post('/logOut', userLogOut)

router.post('/forgotPassword', forgetPassword)

router.post('/upload',authMiddleware, upload.single('image'), uploadImage)

module.exports = router 