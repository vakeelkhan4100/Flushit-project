const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true

    },
    mobile: {
        type: Number,
        require: true
    },
    imageUrl: {
        type: String,
    }
})
const profile = mongoose.model("profile", userSchema)
module.exports = profile
