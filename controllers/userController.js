const user = require("../models/userModel.js")
const jwt = require("jsonwebtoken")
const secret_key = process.env.SECRET_KEY
const signup = async (req, res) => {
    try {
        const { email } = req.body
        const userExist = await user.findOne({ email })
        if (userExist) {
            res.status(403).json({ status: false, message: "user is alredy exist" })
        } else {
            const createUser = await user.create(req.body)
            createUser.token = await jwt.sign({ time: Date(), userId: createUser._id }, secret_key)
            res.status(200).json({ status: true, message: "user is create successfully", data: createUser })

        }
    } catch (err) {
        res.send(err.message)
    }

}


module.exports = {
    signup
}