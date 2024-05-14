const profile = require("../models/profile.model.js")
const user = require("../models/userModel.js")
const createProfile = async (req, res) => {
    try {
        const { email } = req.body
        let userExist = await user.findOne({ email })
        if (userExist) {
            let user = await profile.create(req.body)
            res.send({
                status: true,
                message: "profile create succesfully",
                user
            })
        } else {
            res.send("user not found")
        }
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {
    createProfile
} 