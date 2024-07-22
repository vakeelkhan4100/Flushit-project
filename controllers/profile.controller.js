const profile = require("../models/profile.model.js")
const user = require("../models/userModel.js")
const multer = require("multer")
const createProfile = async (req, res) => {
    try {
        const { email, mobile } = req.body
        let userExists = await user.findOne({ email })
        if (userExists) {
            let check = await profile.findOne({ mobile })
            if (check) {
                res.send("User already exists")
            } else {
                let imageUrl = req.file ? req.file.path : "profile_image/vakeel.jpg-1715851375333.jpg"
                let data = await profile.create({
                    username: req.body.username,
                    mobile: req.body.mobile,
                    imageUrl: imageUrl
                })
                res.send(data)

            }
        } else {
            res.send("user not found")
        }
    }
    catch (error) {

    }


}


const imageUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "profile_image")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + "-" + Date.now() + ".jpg")
        }
    })
})




const all = async (req, res) => {
}

module.exports = {
    createProfile,
    imageUpload
}
