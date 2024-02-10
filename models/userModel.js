const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: ["email is require", true],
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
        required: ["password is require", true],
    }
    ,
    confirmPassword: {
        type: String,
        required: ["password is require", true],
    },
    token: {
        type: String
    }

})
userSchema.pre("save", async (next) => {
    if (this.password === this.confirmPassword) {
        this.password = await bcrypt.hash(this.password, 10)
        this.confirmPassword = undefined
    } else {
        throw new error("password is not match")
    }
    next()
})

userSchema.post("save", async (doc, next) => {
    doc.password = undefined
    next()
})

const user = mongoose.model("user", userSchema)
module.exports = user





