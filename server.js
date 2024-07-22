const express = require("express")
require("dotenv").config()
const bodyParse = require("body-parser")
const app = express()
app.use(bodyParse.json())

const connect = require("./db/config.js")
const userRouter = require("./routers/userRoute.js")
const profileRouter = require("./routers/profileRoute.js")

app.use("/profile", profileRouter)
app.use("user", userRouter)

const port = process.env.PORT
const ip = process.env.IP

app.use(express.json())

connect()

app.route("/").get((req, res) => {
    res.send("home page........")
})

app.listen(port || 3000, ip, () => {
    console.log(`server is start at port:${port}`)
})