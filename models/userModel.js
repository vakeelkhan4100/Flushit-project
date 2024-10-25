const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
let currentTime = Date.now();
const expirationTime = 10

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "email is require"],
        unique: true,
        validate: {
            validator: function (email) {
                return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(email)
            },
            message: "invalid email",
        }
    },
    password: {
        type: String,
        required: true
    }
    ,
    confirmPassword: {
        type: String,
    },
    otp: {
        type: String,

    },
    expiration_time: {
        type: Date,
        default: new Date(currentTime + (expirationTime * 1000))
    },
    token: {
        type: String
    }

})

userSchema.pre('save', async function (next) {

    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
        return next(err);
    }
    next();
});

const user = mongoose.model("user", userSchema)
module.exports = user





