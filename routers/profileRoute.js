const express = require("express")
const profileController = require("../controllers/profile.controller.js")
const profileRouter = express.Router()
profileRouter.route("/create").post(profileController.imageUpload.single('profile_image'), profileController.createProfile)

module.exports = profileRouter 
