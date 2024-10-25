const express = require("express")
require("dotenv").config()
const connect = require("./db/config.js")
const bodyParse = require("body-parser")
const session = require("express-session")
const userRouter = require("./routers/userRoute.js")
const profileRouter = require("./routers/profileRoute.js")

const app = express()
app.use(express.json())
app.use(bodyParse.json())

app.set('trust proxy', 1)
app.use(session({
    secret: 'WWWTTTT$$23$$$ewrwewer',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


connect()

const { PORT, IP } = process.env

app.use("/profile", profileRouter)
app.use("/user", userRouter)

app.route("/").get((req, res) => {
    res.send("home page........")
})

app.listen(PORT, IP, () => console.log(`server is start at port:${PORT}`))