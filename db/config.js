const mongoose = require("mongoose")
const connect = async (req, res) => {
    await mongoose.connect("mongodb://127.0.0.1:27017/Flushit")
        .then(() => console.log("connection success")).catch((err) => console.log("error", err.message))

}
module.exports = connect