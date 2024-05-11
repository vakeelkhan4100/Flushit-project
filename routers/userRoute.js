const express = require("express")
const userController = require("../controllers/userController.js")

const userRouter = express.Router()
userRouter.route("/signup").post(userController.signup)
userRouter.route("/login").post(userController.login)
userRouter.route("/forgotPassword").post(userController.forgotPassword)
userRouter.route("/twoStepVarification").post(userController.twoStepVarificatin)

module.exports = userRouter 