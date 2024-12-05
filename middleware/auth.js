const jwt = require("jsonwebtoken")
const { SECRET_KEY } = process.env

const auth = async (req, res, next) => {
    try {
        const { token } = req.session
        const checkToken = jwt.verify(token, SECRET_KEY)
        if (checkToken) { next(); return; }
        else return res.status(401).send({ status: false, message: "auth token is not valid" })
    }
    catch (error) {
        res.status(500).send({ status: false, message: "invalid token" })
    }
}
module.exports = auth