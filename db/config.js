const mongoose = require("mongoose")
const { MONGO_LOCAL_URL } = process.env
const connect = async (req, res) => {
    await mongoose.connect(MONGO_LOCAL_URL)
        .then(() => console.log("connection success")).catch((err) => console.log("error", err.message))
}
module.exports = connect