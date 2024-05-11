const user = require("../models/userModel.js");
const bcrypt = require("bcrypt");
require("dotenv").config()
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;
const nodemailer = require("nodemailer");
const USER = process.env.USERNAME;
const PASS = process.env.PASS;
const signup = async (req, res) => {
    try {
        const { email } = req.body;
        const userExist = await user.findOne({ email });
        if (userExist) {
            res.status(403).json({ status: false, message: "user is alredy exist" });
        } else {
            const createUser = await user.create(req.body);
            createUser.token = await jwt.sign(
                { time: Date(), userId: createUser._id },
                secret_key
            );
            res
                .status(200)
                .json({
                    status: true,
                    message: "user is create successfully",
                    data: createUser,
                });
        }
    } catch (err) {
        res.send(err.message);
    }
};

const login = async (req, res) => {
    try {
        const { email } = req.body;
        const userExist = await user.findOne({ email });
        if (userExist) {
            const checkpass = await bcrypt.compare(
                req.body.password,
                userExist.password
            );
            if (checkpass) {
                res.status(200).json({
                    status: true,
                    message: "user login success",
                });
            } else {
                res.json({
                    status: false,
                    message: "password is wrong ",
                });
            }
        } else {
            res.status(400).json({
                status: false,
                message: "user login failed",
            });
        }
    } catch (error) {
        res.send(eror.message);
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const userExist = await user.findOne({ email });
        if (userExist) {
            let otp = generateOTP();
            userExist.otp = otp;
            let User = await userExist.save();
            const tranpoter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                service: "gmail",
                port: 587,
                secure: true,
                requireTLS: true,
                auth: {
                    user: USER,
                    pass: PASS,
                },
            });
            const { email } = req.body
            let mailoption = {
                from: "vakeelkhan4100@gmail.com",
                to: email,
                subject: User.otp,
                text: "send otp ",
            };
            tranpoter.sendMail(mailoption, (error, info) => {
                if (error) {
                    console.log("Error:", error);
                } else {
                    console.log("otp send", info.response);
                }
            });
            return res.send({ success: true, User });
        } else {
            return res.send("user not found");
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).end("Internal Server Error");
    }
};

const twoStepVarificatin = async (req, res) => {
    try {
        const { email, otp } = req.body
        let emailExite = await user.findOne({ email })
        console.log(emailExite.otp, "fjfjfj")
        if (emailExite) {
            if (emailExite.otp === otp) {
                res.send({
                    status: true,
                    message: "success"
                })
            } else {
                res.send("otp is not match")
            }
        } else {
            res.send("user is not difinded ")
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).end("Internal Server Error");
    }
}
module.exports = {
    signup,
    login,
    forgotPassword,
    twoStepVarificatin,

};

// Function to generate OTP
function generateOTP() {
    let digits = "0123456789";
    let otp = "";
    const expirationTimeInSeconds = 600 // 10 minutes
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}
// console.log(generateOTP());

